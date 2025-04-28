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
        { title: "Website", projectKey: "PID-11" },
        { title: "Study App", projectKey: "PID-22" },
        { title: "Nivea", projectKey: "PID-225" },
        { title: "Eucerin", projectKey: "PID-222" },
        { title: "Faber Castel", projectKey: "PID-2225" },
      ],
    },
    {
      company: "Dela-tech",
      projects: [
        { title: "ClockIn", projectKey: "PID-33" },
      ],
    },
    {
      company: "Omegaventus",
      projects: [
        { title: "Website", projectKey: "PID-44" },
      ],
    },
  ]);
};
