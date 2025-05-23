'use client';

import { useState, useCallback, useEffect } from "react";
import { useProjects } from "@/app/context/ProjectContext";
import { useCalendar } from "@/app/context/CalendarContext";
import SidebarContent from "./SidebarContent";
import SidebarHeader from "./SidebarHeader";
import ProjectModalContainer from "./ProjectModalContainer";
import { ProjectData, ProjectEntry } from "@/types/project";

export default function Sidebar() {
  const { setSidebarProjects, sidebarProjects } = useProjects();
  const { month, year } = useCalendar();
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  // Group flat project data by company
  const groupProjects = (entries: ProjectEntry[]): ProjectData[] => {
    const grouped: Record<string, { title: string; projectKey: string }[]> = {};

    entries.forEach(({ id, company, project }) => {
      if (!grouped[company]) grouped[company] = [];
      grouped[company].push({
        title: project,
        projectKey: `PID-${id}`,
      });
    });

    return Object.entries(grouped).map(([company, projects]) => ({
      company,
      projects,
    }));
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projectList");
        const data: ProjectEntry[] = await res.json();
        setProjectsData(groupProjects(data));
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const getStorageKey = useCallback(() => {
    return `sidebar-projects-${year}-${month}`;
  }, [year, month]);

  useEffect(() => {
    const key = getStorageKey();
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : [];

    if (JSON.stringify(parsed) !== JSON.stringify(sidebarProjects)) {
      setSidebarProjects(parsed);
    }
  }, [getStorageKey, sidebarProjects, setSidebarProjects]);

  const toggleProjectSelection = (company: string, projectKey: string) => {
    const key = `${company}-${projectKey}`;
    setSelectedProjects((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

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
    window.location.reload();
  };

  return (
    <>
      <SidebarHeader />
      <SidebarContent
        sidebarProjects={sidebarProjects}
        openModal={() => setIsModalOpen(true)}
      />
      <ProjectModalContainer
        isModalOpen={isModalOpen}
        closeModal={() => {
          setSelectedProjects([]);
          setIsModalOpen(false);
        }}
        projectsData={projectsData}
        selectedProjects={selectedProjects}
        sidebarProjects={sidebarProjects}
        toggleSelection={toggleProjectSelection}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
