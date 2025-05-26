"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "@/app/context/CalendarContext";

export default function SidebarHeader() {
  const { year, month, goToNextMonth, goToPreviousMonth } = useCalendar();
  const {loading} = useCalendar();
  const formattedDate = new Date(year, month).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-64 mt-4"> {/* Same width as dropdown */}
    {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <div className="border rounded shadow px-4 py-2 bg-white flex items-center space-x-2">
            <div className="animate-spin w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full"></div>
            <span className="text-gray-700 text-sm">Loading in progress</span>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between w-full">
        <button className="cursor-pointer">
          <ChevronLeft className="text-[#244B77]" onClick={goToPreviousMonth} />
        </button>
        <p className="text-[#244B77] font-semibold text-center min-w-[100px]">
          {formattedDate}
        </p>
        <button className="cursor-pointer">
          <ChevronRight className="text-[#244B77]" onClick={goToNextMonth} />
        </button>
      </div>
    </div>
  );
  
}