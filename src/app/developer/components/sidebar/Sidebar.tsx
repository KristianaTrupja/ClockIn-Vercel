'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchProjects} from "@/app/lib/api/projects";
import SidebarHeader from "./SidebarHeader";
import SidebarList from "./SidebarList";
import ProjectModal from "./ProjectModal";

type ProjectData = {
  company: string;
  projects: string[];
};
export default function Sidebar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [sidebarProjects, setSidebarProjects] = useState<ProjectData[]>([]);

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

  const goToPreviousMonth = () => {
    setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() + 1)));
  };

  const toggleProjectSelection = (company: string, project: string) => {
    const key = `${company}-${project}`;
    setSelectedProjects((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleSubmit = () => {
    const updatedSidebarProjects: ProjectData[] = [];

    projectsData.forEach(({ company, projects }) => {
      const filtered = projects.filter((p) =>
        selectedProjects.includes(`${company}-${p}`)
      );
      if (filtered.length > 0) {
        updatedSidebarProjects.push({ company, projects: filtered });
      }
    });

    setSidebarProjects((prev) => {
      const merged: { [company: string]: Set<string> } = {};

      prev.forEach(({ company, projects }) => {
        if (!merged[company]) merged[company] = new Set();
        projects.forEach((p) => merged[company].add(p));
      });

      updatedSidebarProjects.forEach(({ company, projects }) => {
        if (!merged[company]) merged[company] = new Set();
        projects.forEach((p) => merged[company].add(p));
      });

      return Object.entries(merged).map(([company, projectsSet]) => ({
        company,
        projects: Array.from(projectsSet),
      }));
    });
 
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
