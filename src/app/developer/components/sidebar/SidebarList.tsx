import { ProjectData } from "@/app/lib/api/projects";
import SidebarItem from "./SidebarItem";

interface SidebarListProps {
  sidebarProjects: ProjectData[];
}

export default function SidebarList({ sidebarProjects }: SidebarListProps) {
  if (sidebarProjects.length === 0) {
    return <p className="text-center text-gray-500 p-4">Nuk ka projekte</p>;
  }

  return (
    <div className="min-h-[600px] overflow-auto mt-10">
      {sidebarProjects.map(({ company, projects }) => (
        <SidebarItem key={company} company={company} projects={projects} />
      ))}
    </div>
  );
}
