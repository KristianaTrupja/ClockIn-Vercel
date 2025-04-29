import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "@/app/context/CalendarContext";

export default function SidebarHeader() {
  const { year, month, goToNextMonth, goToPreviousMonth } = useCalendar();

  const formattedDate = new Date(year, month).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-2 mt-4 px-4">
      <button onClick={goToPreviousMonth}>
        <ChevronLeft className="text-[#244B77]" />
      </button>
      <p className="text-[#244B77] font-semibold">{formattedDate}</p>
      <button onClick={goToNextMonth}>
        <ChevronRight className="text-[#244B77]" />
      </button>
    </div>
  );
}