"use client";
import React from "react";
import TopBar from "./TopBar";
import WorkDay from "./WorkDay";
import { useCalendar } from "@/app/context/CalendarContext";
import { getDaysInMonth } from "@/app/utils/dateUtils";

export default function Calendar() {
  const { year, month, goToNextMonth, goToPreviousMonth } = useCalendar();
  const daysArray = getDaysInMonth(year, month);
  return (
    <div>
      <TopBar />
      <div className="flex bg-gray-100 items-center">
        {daysArray.map((day) => (
          <WorkDay key={day.toString()} date={day} />
        ))}
      </div>
    </div>
  );
}
