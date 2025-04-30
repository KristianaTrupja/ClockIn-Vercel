"use client"
import { useCalendar } from "@/app/context/CalendarContext";
import { useProjects } from "@/app/context/ProjectContext";
import { useWorkHours } from "@/app/context/WorkHoursContext";
import { ProjectData } from "@/app/lib/api/projects";
import { useCallback, useEffect, useState } from "react";

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
  return (
    <div className="flex flex-col justify-between h-[76vh] border-[1px] border-gray-300 mt-2 bg-blue-50">
      <div className="flex flex-col overflow-auto items-center">
        <div className="border-[1px] border-gray-300 w-full h-11 flex justify-center items-center text-black font-semibold p-2">
          Total
        </div>
        {parsedProjects?.map((projects, index) => (
          <div key={index} className="w-full">
            <div className="flex items-center h-10 w-full px-2 font-semibold bg-gray-200" />
            {projects.projects.map((proj, projectIndex) => {
              const total = getTotalHoursForProjectInMonth(proj.projectKey, month+1, year);
              return (
                <div
                  className="flex h-10 items-center justify-center border-b-[1px] border-gray-300"
                  key={`${index}-${projectIndex}`}
                >
                  {total}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="border-[1px] border-gray-300 w-full h-11 flex justify-center items-center text-black font-semibold">
        100
      </div>
    </div>
  );
}
