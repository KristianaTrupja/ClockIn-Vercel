"use client"

import { CalendarProvider } from "@/app/context/CalendarContext";
import { ProjectProvider } from "@/app/context/ProjectContext";
import { WorkHoursProvider } from "@/app/context/WorkHoursContext";

const DeveloperProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WorkHoursProvider>
      <ProjectProvider>
        <CalendarProvider>{children} </CalendarProvider>
      </ProjectProvider>
    </WorkHoursProvider>
  );
};
export default DeveloperProvider;
