"use client";
import React from "react";
import TopBar from "./TopBar";
import WorkDay from "./WorkDay";
import { useCalendar } from "@/app/context/CalendarContext";
import { getDaysInMonth } from "@/app/utils/dateUtils";
import { useProjects } from "@/app/context/ProjectContext";
import TotalBar from "./TotalBar";

export default function Calendar() {
  const { year, month } = useCalendar();
  const daysArray = getDaysInMonth(year, month);
  const { sidebarProjects } = useProjects();

  return (
    <div>
      <TopBar />
      <div className="flex flex-col bg-gray-100">
        {sidebarProjects.map((companyBlock, companyIndex) => (
          <React.Fragment key={companyIndex}>
            {/* Company label row */}
            <div className="flex items-center h-10 px-2 font-semibold bg-gray-200 border border-gray-300" />

            {/* Project rows */}
            {companyBlock.projects.map((proj, projectIndex) => (
              <div className="flex" key={`${companyIndex}-${projectIndex}`}>
                {daysArray.map((day) => (
                  <WorkDay
                    key={`${proj.projectKey}-${day.toString()}`}
                    date={`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`}
                    projectKey={proj.projectKey}
                  />
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
