import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "@/app/context/CalendarContext";

export default function SidebarHeader() {
  const { year, month, goToNextMonth, goToPreviousMonth } = useCalendar();

  const formattedDate = new Date(year, month).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-64 mt-4"> {/* Same width as dropdown */}
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