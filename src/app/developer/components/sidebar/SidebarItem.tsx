import { CircleArrowDown } from "lucide-react";

interface SidebarItemProps {
  company: string;
  projects: {
    title: string;
    projectKey: string;
  }[];
}

export default function SidebarItem({ company, projects }: SidebarItemProps) {
  return (
    <div>
      <h3 className="bg-[#244B77] w-full p-2 text-white flex items-center justify-between">
        {company} <CircleArrowDown />
      </h3>
      <ul>
        {projects.map((project) => (
          <li
            key={project.projectKey}
            className="bg-[#6C99CB] p-2 text-white pl-5 border-b-[1px] border-[#244B77]"
          >
            {project.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
