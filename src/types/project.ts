export interface FormData {
  name: string;
  project: string;
}

export interface ProjectEntry {
  id: number;
  company: string;
  project: string;
}
export interface ProjectData {
  company: string;
  projects: {
    title: string;
    projectKey: string;
  }[];
}

