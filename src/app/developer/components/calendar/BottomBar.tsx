"use client";
import { useEffect, useState } from "react";
import { useCalendar } from "@/app/context/CalendarContext";
import { getDaysInMonth, isWeekend } from "@/app/utils/dateUtils";
import { useWorkHours } from "@/app/context/WorkHoursContext";

export default function BottomBar() {
  const { month, year } = useCalendar();
  const [days, setDays] = useState<string[]>([]);
  const { getTotalHoursForDay } = useWorkHours();

  useEffect(() => {
    const daysArray = getDaysInMonth(year, month);
    setDays(daysArray);
  }, [month, year]);

  return (
    <div className="flex items-center gap-1">
      {days.map((day) => {
        const weekendClass = isWeekend(year, month, parseInt(day))
          ? "border-red-400"
          : "";
        const formattedDate = `${year}-${String(month + 1).padStart(
          2,
          "0"
        )}-${String(day).padStart(2, "0")}`;
        const totalHours = getTotalHoursForDay(formattedDate, "user1"); // Replace "user1" with dynamic ID if needed
        const bgColor = totalHours > 0 ? "bg-blue-100" : "bg-white";

        return (
          <div
            key={day}
            title={formattedDate}
            className={`border-t-5 border-gray-300 w-9 h-6 flex justify-center items-center text-xs pt-1 ${weekendClass} ${bgColor}`}
          >
            {totalHours.toFixed(2)}
          </div>
        );
      })}
    </div>
  );
}
