"use client";
import { useCalendar } from "@/app/context/CalendarContext";
import { useProjects } from "@/app/context/ProjectContext";
import { useCallback } from "react";

export default function TotalBar() {
  const { month, year } = useCalendar();
  const { sidebarProjects } = useProjects();

const getStorageKey = useCallback(() => {
    const keyDate = `${year}-${month}`;
    return `sidebar-projects-${keyDate}`;
  }, [year, month]);

  const key = getStorageKey();
  const saved = localStorage.getItem(key);
  const parsed = saved ? JSON.parse(saved) : null;
  console.log(parsed)
  return (
    <div className="flex flex-col bg-gray-100 overflow-auto mt-2 items-center h-[76vh]">
       <div  className={`border-[1px] border-gray-300 w-10 h-11 flex justify-center items-center text-black font-semibold`}
          >Total</div>
      {parsed.map((projects,index) => {
        return (
          <>
          <div className="flex items-center h-10 w-full px-2 font-semibold bg-gray-200 border border-gray-300" />
          {projects.projects.map((proj, projectIndex) => (
            <div className="flex h-10 items-center" key={`${index}-${projectIndex}`}>
              3
            </div>
          ))}
          {/* Example of a workday component */}
          </>
        );
      })}
    </div>
  );
}