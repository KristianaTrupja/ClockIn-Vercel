
import { Button } from "@/components/ui/button";
import SidebarList from "./SidebarList";
import { ProjectData } from "@/types/project";

export default function SidebarContent  ({ sidebarProjects, openModal }: { sidebarProjects: ProjectData[], openModal: () => void }) {
    return(
  <aside className="mt-40 absolute top-0 w-64 min-h-[80vh] bg-[#E3F0FF] shadow-md border-2 border-[#244B77] flex flex-col justify-between align-center">
    <SidebarList sidebarProjects={sidebarProjects} />
    <Button className="w-fit m-auto" onClick={openModal}>Shto të ri</Button>
  </aside>
)
};
