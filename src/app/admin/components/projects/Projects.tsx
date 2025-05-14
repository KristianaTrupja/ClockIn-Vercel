"use client";
import React, { useState, useCallback, useEffect } from "react";
import ProjectList from "./ProjectsList";
import ProjectsForm from "./ProjectsForm";
import { FormData,ProjectEntry } from "@/types/project";

export default function Projects() {
  const [openSelectorId, setOpenSelectorId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: "", project: "" });
  const [selectors, setSelectors] = useState<{ [key: string]: string[] }>({});
  const [data, setData] = useState<ProjectEntry[]>([]);

  useEffect(() => {
    fetch("/api/projectList")
      .then((res) => res.json())
      .then((data) => {
        // Defensive check to ensure data is an array
        if (!Array.isArray(data)) {
          console.error("Expected an array but got:", data);
          return;
        }
        setData(data)
        const formattedSelectors: { [key: string]: string[] } = {};
  
        data.forEach(({ company, project }: ProjectEntry) => {
          if (formattedSelectors[company]) {
            if (!formattedSelectors[company].includes(project)) {
              formattedSelectors[company].push(project);
            }
          } else {
            formattedSelectors[company] = [project];
          }
        });
  
        setSelectors(formattedSelectors);
      })
      .catch((err) => console.error("Failed to fetch projects", err));
  }, []);
  
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const nameInput = formData.name.trim();
      const projectInput = formData.project.trim();
  
      if (!nameInput || !projectInput) {
        alert("Ju lutem plotesoni te dy fushat!");
        return;
      }
  
      const existingCompanyKey = Object.keys(selectors).find(
        (key) => key.toLowerCase() === nameInput.toLowerCase()
      );
  
      if (existingCompanyKey) {
        if (!selectors[existingCompanyKey].includes(projectInput)) {
          setSelectors((prev) => ({
            ...prev,
            [existingCompanyKey]: [...prev[existingCompanyKey], projectInput],
          }));
        }
      } else {
        setSelectors((prev) => ({
          ...prev,
          [nameInput]: [projectInput],
        }));
      }
  
      try {
        const response = await fetch("/api/projectList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ company: nameInput, project: projectInput }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to save project to backend");
        }
        window.location.reload()
      } catch (error) {
        console.error("Error saving project:", error);
        alert("Ka ndodhur një gabim gjatë ruajtjes së projektit.");
      }
  
      setFormData({ name: "", project: "" });
    },
    [formData, selectors]
  );

  const handleDelete = useCallback(
    async (company: string, project: string) => {
      const selectedData = data.filter(el => el.company === company && el.project === project);
  
      try {
        const res = await fetch("/api/projectList", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: selectedData[0]?.id }),
        });
  
        if (!res.ok) {
          throw new Error("Failed to delete project");
        }
  
        setSelectors((prev) => {
          const updatedProjects = prev[company].filter((p) => p !== project);
          const newSelectors = { ...prev };
          if (updatedProjects.length > 0) {
            newSelectors[company] = updatedProjects;
          } else {
            delete newSelectors[company];
          }
          return newSelectors;
        });
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Ka ndodhur një gabim gjatë fshirjes së projektit.");
      }
    },
    [data] // 👈 Important!
  );
  

  const handleToggle = useCallback((id: string) => {
    setOpenSelectorId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section className="flex gap-10 font-[var(--font-anek-bangla)]">
      <div className="bg-[#E3F0FF] w-1/2 2xl:w-1/3 h-[70vh] flex justify-center shadow-xl">
        <ProjectList
          selectors={selectors}
          openSelectorId={openSelectorId}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      </div>
      <div className="mt-20">
        <h2 className="text-[#244B77] text-2xl 2xl:text-4xl font-bold mb-5">
          Deshironi te shtoni nje projekt te ri ne liste?
        </h2>
        <ProjectsForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
