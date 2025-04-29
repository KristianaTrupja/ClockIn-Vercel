// ProjectModalContainer.tsx
import ProjectModal from "./ProjectModal";

export default function ProjectModalContainer({
  isModalOpen,
  closeModal,
  projectsData,
  selectedProjects,
  toggleSelection,
  handleSubmit,
}: any){
    return(
        <ProjectModal
          isOpen={isModalOpen}
          onClose={closeModal}
          projectsData={projectsData}
          selectedProjects={selectedProjects}
          toggleProjectSelection={toggleSelection}
          handleSubmit={handleSubmit}
        />
    )
};

