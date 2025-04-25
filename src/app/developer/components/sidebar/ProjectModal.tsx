import { Modal } from "@/app/components/ui/Modal";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { ProjectData } from "@/app/lib/api/projects";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectsData: ProjectData[];
  selectedProjects: string[];
  toggleProjectSelection: (company: string, project: string) => void;
  handleSubmit: () => void;
}

export default function ProjectModal({
  isOpen,
  onClose,
  projectsData,
  selectedProjects,
  toggleProjectSelection,
  handleSubmit,
}: ProjectModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Zgjidh projektet"
      footer={<Button onClick={handleSubmit}>Shto</Button>}
    >
      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        {projectsData.map(({ company, projects }) => (
          <div key={company}>
            <h4 className="font-semibold text-[#244B77] mb-2">{company}</h4>
            <ul className="space-y-1">
              {projects.map((project) => {
                const key = `${company}-${project.projectKey}`;
                const isSelected = selectedProjects.includes(key);
                return (
                  <li
                  key={project.projectKey}
                  onClick={() => toggleProjectSelection(company, project.projectKey)}
                  className={clsx(
                    "cursor-pointer p-2 rounded",
                    isSelected ? "bg-[#244B77] text-white" : "bg-gray-100 text-[#244B77]"
                  )}
                >
                  {project.title}
                </li>
                
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Modal>
  );
}
