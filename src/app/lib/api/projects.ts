// lib/api/projects.ts

export type ProjectData = {
  company: string;
  projects: {
    title: string;
    projectKey: string;
  }[];
};

export const fetchProjects = async (): Promise<ProjectData[]> => {
  // Simulate API delay with projectKey included
  return Promise.resolve([
    {
      company: "Canvas",
      projects: [
        { title: "Website", projectKey: "11" },
        { title: "Study App", projectKey: "22" },
        { title: "Nivea", projectKey: "225" },
        { title: "Eucerin", projectKey: "222" },
        { title: "Faber Castel", projectKey: "2225" },
      ],
    },
    {
      company: "Dela-tech",
      projects: [
        { title: "ClockIn", projectKey: "33" },
      ],
    },
    {
      company: "Omegaventus",
      projects: [
        { title: "Website", projectKey: "44" },
      ],
    },
  ]);
};
