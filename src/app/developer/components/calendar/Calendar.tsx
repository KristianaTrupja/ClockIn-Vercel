"use client";
import React from "react";
import TopBar from "./TopBar";
import WorkDay from "./WorkDay";
import { useCalendar } from "@/app/context/CalendarContext";
import { getDaysInMonth } from "@/app/utils/dateUtils";
import { useProjects } from "@/app/context/ProjectContext";

export default function Calendar() {
  const { year, month, goToNextMonth, goToPreviousMonth } = useCalendar();
  const daysArray = getDaysInMonth(year, month);
  const { allProjectKeys } = useProjects();
  const projectKeys = ["11","22","33","44","55"]
  return (
    <div>
      <TopBar />
      <div className="flex flex-col bg-gray-100">
      {allProjectKeys.map((rows,index) => (
        <div className="flex" key={index}>
        {daysArray.map((day) => (
          <WorkDay key={day.toString()} date={day}/>
        ))}
        </div>))}
      </div>
    </div>
  );
}
