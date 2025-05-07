"use client";
import { useCalendar } from "@/app/context/CalendarContext";
import { useWorkHours } from "@/app/context/WorkHoursContext";
import { ProjectData } from "@/app/lib/api/projects";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Delete } from "lucide-react";

export default function TotalBar() {
  const { month, year } = useCalendar();
  const { getTotalHoursForProjectInMonth } = useWorkHours();
  const [parsedProjects, setParsedProjects] = useState<ProjectData[] | null>(null);

  const getStorageKey = useCallback(() => {
    const keyDate = `${year}-${month}`;
    return `sidebar-projects-${keyDate}`;
  }, [year, month]);

  useEffect(() => {
    const key = getStorageKey();
    const saved = localStorage.getItem(key);
    const parsed = saved ? (JSON.parse(saved) as ProjectData[]) : null;
    setParsedProjects(parsed);
  }, [getStorageKey]);

  const sum = useMemo(() => {
    if (!parsedProjects) return 0;
    return parsedProjects.reduce((acc, group) => {
      return (
        acc +
        group.projects.reduce((subAcc, proj) => {
          return subAcc + getTotalHoursForProjectInMonth(proj.projectKey, month + 1, year);
        }, 0)
      );
    }, 0);
  }, [parsedProjects, getTotalHoursForProjectInMonth, month, year]);

  // Function to remove project from parsedProjects and update localStorage
  const removeProject = (projectKey: string) => {
    const updatedProjects = parsedProjects?.map((group) => {
      return {
        ...group,
        projects: group.projects.filter((proj) => proj.projectKey !== projectKey),
      };
    }).filter((group) => group.projects.length > 0); // Remove groups with no projects

    setParsedProjects(updatedProjects || []);
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(updatedProjects));

    // Refresh the page to reflect changes
    // window.location.reload();
  };

  return (
    <div className="flex flex-col justify-between h-[76vh] border-[1px] border-gray-300 bg-blue-50">
      <div className="flex flex-col overflow-auto items-center">
        <div className="border-gray-300 w-full border-b h-10 flex justify-center items-center text-black font-semibold p-2">
          Total
        </div>
        {parsedProjects?.map((projects, index) => (
          <div key={index} className="w-full">
            <div className="project-field__name flex items-center w-full p-[19px] font-semibold bg-gray-200 border-b-[1px]" />
            {projects.projects.map((proj, projectIndex) => {
              const total = getTotalHoursForProjectInMonth(proj.projectKey, month + 1, year);
              return (
                <div
                  className="total-field flex h-10 gap-1 items-center justify-between border-t-[1px] border-gray-300 relative p-[20px]"
                  key={`${index}-${projectIndex}`}
                >
                  <div>{total}</div>
                  <Delete
                    className="w-5 h-5 text-red-500 cursor-pointer"
                    onClick={() => removeProject(proj.projectKey)} // Call removeProject on click
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="border-[1px] border-b-0 border-l-0 border-r-0 border-gray-300 w-full h-10 flex justify-center items-center text-black font-semibold">
        {sum}
      </div>
    </div>
  );
}
