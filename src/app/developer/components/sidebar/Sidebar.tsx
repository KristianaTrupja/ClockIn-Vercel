"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { fetchProjects, ProjectData } from "@/app/lib/api/projects";
import SidebarHeader from "./SidebarHeader";
import SidebarList from "./SidebarList";
import ProjectModal from "./ProjectModal";
import { useProjects } from "@/app/context/ProjectContext";
import { useWorkHours } from "@/app/context/WorkHoursContext";

export default function Sidebar() {
  const { setSidebarProjects, sidebarProjects } = useProjects();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const { workHours } = useWorkHours();

  // Key based on current month and year
  const getStorageKey = useCallback((date: Date) => {
    return `sidebarProjects-${date.getFullYear()}-${date.getMonth() + 1}`;
  }, []);

  useEffect(() => {
    const key = getStorageKey(currentDate);
    const saved = localStorage.getItem(key);
    
    if (saved) {
      const parsedProjects = JSON.parse(saved);
      setSidebarProjects(parsedProjects);
    } else {
      // Important: clear the sidebar if no saved projects exist for this month
      setSidebarProjects([]);
    }
  }, [currentDate, getStorageKey, setSidebarProjects]);
  

  // Save sidebarProjects to localStorage whenever they change
  useEffect(() => {
    const key = getStorageKey(currentDate);
    localStorage.setItem(key, JSON.stringify(sidebarProjects));
  }, [sidebarProjects, currentDate, getStorageKey]);

  // Format date for display
  useEffect(() => {
    const formatted = currentDate.toLocaleDateString("sq-AL", {
      month: "long",
      year: "numeric",
    });
    setFormattedDate(formatted);
  }, [currentDate]);

  // Fetch all possible projects initially
  useEffect(() => {
    fetchProjects().then(setProjectsData);
  }, []);

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

    // Merge existing projects
    sidebarProjects.forEach(({ company, projects }) => {
      if (!merged[company]) merged[company] = new Map();
      projects.forEach((p) => merged[company].set(p.projectKey, p.title));
    });

    // Merge newly selected projects
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

    setSidebarProjects(mergedProjects);
    setSelectedProjects([]);
    setIsModalOpen(false);
  };

  return (
    <>
      <SidebarHeader />
      <aside className="mt-40 absolute top-0 w-64 min-h-[80vh] bg-[#E3F0FF] shadow-md border-2 border-[#244B77] flex flex-col justify-between align-center">
        <SidebarList sidebarProjects={sidebarProjects} />
        <Button className="w-fit m-auto" onClick={() => setIsModalOpen(true)}>
          Shto të ri
        </Button>
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => {
            setSelectedProjects([]);
            setIsModalOpen(false);
          }}
          projectsData={projectsData}
          selectedProjects={selectedProjects}
          toggleProjectSelection={toggleProjectSelection}
          handleSubmit={handleSubmit}
        />
      </aside>
    </>
  );
}