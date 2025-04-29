"use client";
import { useEffect, useState } from "react";
import { useCalendar } from "@/app/context/CalendarContext";
import { useProjects } from "@/app/context/ProjectContext";
import { getDaysInMonth,isWeekend } from "@/app/utils/dateUtils";
export default function TotalBar() {
  const { month, year } = useCalendar();
  const { sidebarProjects } = useProjects();
  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    const daysArray = getDaysInMonth(year, month);
    setDays(daysArray);
  }, [month, year]);

  return (
    <div className="flex flex-col bg-gray-100 overflow-auto mt-2 items-center h-[76vh]">
       <div  className={`border-[1px] border-gray-300 w-10 h-11 flex justify-center items-center text-black font-semibold`}
          >Total</div>
      {sidebarProjects.map((projects,index) => {
        return (
          <div
            key={index}
            className={`border-[1px] border-gray-300 w-10 h-11 flex justify-center items-center text-black font-semibold `}
          >
            4
          </div>
        );
      })}
    </div>
  );
}