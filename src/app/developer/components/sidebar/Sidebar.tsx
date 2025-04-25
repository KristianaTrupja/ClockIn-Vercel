'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchProjects, ProjectData } from "@/app/lib/api/projects";
import SidebarHeader from "./SidebarHeader";
import SidebarList from "./SidebarList";
import ProjectModal from "./ProjectModal";
import { useProjects } from "@/app/context/ProjectContext";

export default function Sidebar() {
  const { setSidebarProjects, sidebarProjects } = useProjects();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  useEffect(() => {
    const formatted = currentDate.toLocaleDateString("sq-AL", {
      month: "long",
      year: "numeric",
    });
    setFormattedDate(formatted);
  }, [currentDate]);

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

    // Merge new selected ones
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
      <aside className="mt-40 absolute top-0 w-64 h-[80vh] bg-[#E3F0FF] shadow-md border-2 border-[#244B77] flex flex-col justify-between align-center">
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
