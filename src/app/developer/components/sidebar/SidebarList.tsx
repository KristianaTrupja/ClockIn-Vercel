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
    <div className="min-h-[600px] overflow-auto">
      <div className="py-2 pl-3 flex justify-center font-semibold text-[#244B77]">Projektet</div>
      {sidebarProjects.map(({ company, projects }) => (
        <SidebarItem key={company} company={company} projects={projects} />
      ))}
    </div>
  );
}