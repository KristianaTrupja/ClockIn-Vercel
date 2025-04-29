'use client';

import { useState, useCallback, useEffect } from "react";
import { fetchProjects, ProjectData } from "@/app/lib/api/projects";
import { useProjects } from "@/app/context/ProjectContext";
import { useCalendar } from "@/app/context/CalendarContext";
import SidebarContent from "./SidebarContent";
import SidebarHeader from "./SidebarHeader";
import ProjectModalContainer from "./ProjectModalContainer";

export default function Sidebar() {
  const { setSidebarProjects, sidebarProjects } = useProjects();
  const { month, year } = useCalendar();
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects().then(setProjectsData);
  }, []);

  // Helper for consistent localStorage key using month and year
  const getStorageKey = useCallback(() => {
    const keyDate = `${year}-${month}`;
    return `sidebar-projects-${keyDate}`;
  }, [year, month]);

  // Load saved projects from localStorage if not already in context
  useEffect(() => {
    const key = getStorageKey();
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : [];

    const isEqual =
      JSON.stringify(parsed) === JSON.stringify(sidebarProjects);

    if (!isEqual) {
      setSidebarProjects(parsed);
    }
  }, [getStorageKey, sidebarProjects]);

  // Handle project selection toggle
  const toggleProjectSelection = (company: string, projectKey: string) => {
    const key = `${company}-${projectKey}`;
    setSelectedProjects((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  // Handle submit for selected projects
  const handleSubmit = () => {
    const updatedSidebarProjects: ProjectData[] = [];

    projectsData.forEach(({ company, projects }) => {
      const filtered = projects.filter((p) =>
        selectedProjects.includes(`${company}-${p.projectKey}`)
      );

      if (filtered.length > 0) {
        updatedSidebarProjects.push({ company, projects: filtered });
      }
    });

    const merged: { [company: string]: Map<string, string> } = {};

    sidebarProjects.forEach(({ company, projects }) => {
      if (!merged[company]) merged[company] = new Map();
      projects.forEach((p) => merged[company].set(p.projectKey, p.title));
    });

    updatedSidebarProjects.forEach(({ company, projects }) => {
      if (!merged[company]) merged[company] = new Map();
      projects.forEach((p) => merged[company].set(p.projectKey, p.title));
    });

    const mergedProjects: ProjectData[] = Object.entries(merged).map(
      ([company, map]) => ({
        company,
        projects: Array.from(map.entries()).map(([projectKey, title]) => ({
          title,
          projectKey,
        })),
      })
    );

    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(mergedProjects));

    setSidebarProjects(mergedProjects);
    setSelectedProjects([]);
    setIsModalOpen(false);
  };

  return (
    <>
      <SidebarHeader />
      <SidebarContent sidebarProjects={sidebarProjects} openModal={() => setIsModalOpen(true)} />
      <ProjectModalContainer
        isModalOpen={isModalOpen}
        closeModal={() => {
          setSelectedProjects([]);
          setIsModalOpen(false);
        }}
        projectsData={projectsData}
        selectedProjects={selectedProjects}
        toggleSelection={toggleProjectSelection}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
