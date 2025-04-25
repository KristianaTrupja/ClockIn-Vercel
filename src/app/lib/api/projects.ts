// lib/api/projects.ts
export type ProjectData = {
    company: string;
    projects: string[];
  };
  
  export const fetchProjects = async (): Promise<ProjectData[]> => {
    // Simulate API delay
    return Promise.resolve([
      {
        company: "Canvas",
        projects: ["Website", "App"],
      },
      {
        company: "Dela-tech",
        projects: ["ClockIn"],
      },
      {
        company: "Omegaventus",
        projects: ["Website"],
      },
    ]);
  };
  