"use client"
import { useWorkHours } from "@/app/context/WorkHoursContext";

export default function DayBox({ date }: { date: string }) {
  const { workHours, setWorkHoursForProject } = useWorkHours();

  const handleHourChange = (projectKey: string, hours: number) => {
    setWorkHoursForProject(date, projectKey, hours);
  };

  return (
    <div className="w-10 h-10 flex justify-center items-center border-[1px] border-gray-300">
      {Object.entries(workHours[date] || {}).map(([projectKey, hours]) => (
        <div key={projectKey}>
          <span>{projectKey}</span>
          <input
            type="number"
            value={hours}
            onChange={(e) => handleHourChange(projectKey, parseInt(e.target.value))}
            className="ml-2 border p-1 w-16"
          />
        </div>
      ))}
    </div>
  );
}
