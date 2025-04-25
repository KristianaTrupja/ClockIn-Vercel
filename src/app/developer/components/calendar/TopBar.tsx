"use client";
import { useEffect, useState } from "react";
import { useCalendar } from "@/app/context/CalendarContext";
import { getDaysInMonth,isWeekend } from "@/app/utils/dateUtils";
export default function TopBar() {
  const { month, year } = useCalendar();
  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    const daysArray = getDaysInMonth(year, month);
    setDays(daysArray);
  }, [month, year]);

  return (
    <div className="flex bg-gray-100 overflow-auto mt-2 items-center">
      {days.map((day) => {
        const weekendClass = isWeekend(year,month,parseInt(day)) ? "bg-gray-300" : "bg-none";
        return (
          <div
            key={day}
            className={`border-[1px] border-gray-300 w-10 h-10 flex justify-center items-center text-black font-semibold ${weekendClass}`}
          >
            {day}
          </div>
        );
      })}
      <p className="text-xl border-[1px] border-gray-300 p-1">Total</p>
    </div>
  );
}
