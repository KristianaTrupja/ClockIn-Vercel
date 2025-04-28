"use client";
import { useEffect, useState } from "react";
import { useCalendar } from "@/app/context/CalendarContext";
import { getDaysInMonth, isWeekend } from "@/app/utils/dateUtils";
import { useWorkHours } from "@/app/context/WorkHoursContext";

export default function BottomBar() {
  const { month, year } = useCalendar();
  const [days, setDays] = useState<string[]>([]);
  const { workHours, getTotalHoursForDay } = useWorkHours();

  useEffect(() => {
    const daysArray = getDaysInMonth(year, month);
    setDays(daysArray);
  }, [month, year]);
  return (
    <div className="flex overflow-auto mt-2 items-center gap-1">
      {days.map((day) => {
        const weekendClass = isWeekend(year, month, parseInt(day))
          ? "border-red-400"
          : "";
        const formattedDate = `${year}-${String(month + 1).padStart(
          2,
          "0"
        )}-${String(day).padStart(2, "0")}`;
        const totalHours = getTotalHoursForDay(formattedDate);

        return (
          <div
            key={day}
            className={`border-t-5 border-gray-300 w-9 h-5 flex justify-center gap-1 items-center text-gray-800 font-semibold pt-1 ${weekendClass}`}
          >
            {totalHours}
          </div>
        );
      })}
    </div>
  );
}
