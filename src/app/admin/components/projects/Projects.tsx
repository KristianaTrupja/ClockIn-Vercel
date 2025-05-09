"use client";
import React, { useState, useCallback, useEffect } from "react";
import ProjectList from "./ProjectsList";
import ProjectsForm from "./ProjectsForm";

interface FormData {
  name: string;
  project: string;
}

export default function Projects() {
  const [openSelectorId, setOpenSelectorId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: "", project: "" });

  const [selectors, setSelectors] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    fetch("/api/projectList")
      .then((res) => res.json())
      .then((data) => {
        // Defensive check to ensure data is an array
        if (!Array.isArray(data)) {
          console.error("Expected an array but got:", data);
          return;
        }
  
        const formattedSelectors: { [key: string]: string[] } = {};
  
        data.forEach(({ company, project }: { company: string; project: string }) => {
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
      } catch (error) {
        console.error("Error saving project:", error);
        alert("Ka ndodhur një gabim gjatë ruajtjes së projektit.");
      }
  
      setFormData({ name: "", project: "" });
    },
    [formData, selectors]
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
