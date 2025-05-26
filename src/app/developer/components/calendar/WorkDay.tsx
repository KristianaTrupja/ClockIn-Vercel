"use client";

import { useEffect, useState } from "react";
import { useWorkHours } from "@/app/context/WorkHoursContext";
import { Button } from "@/components/ui/button";
import { Modal } from "@/app/components/ui/Modal";
import { isHoliday, isWeekend } from "@/app/utils/dateUtils";
import { useCalendar } from "@/app/context/CalendarContext";
import { fetchHolidays, HolidayData } from "@/app/lib/api/bankHolidays";

type DayBoxProps = {
  date: string;
  projectKey: string;
  userId: string;
};

export default function WorkDay({ date, projectKey, userId }: DayBoxProps) {
  const { month, year } = useCalendar();
  const day = parseInt(date.split("-")[2], 10);
  const [holidaysData, setHolidaysData] = useState<HolidayData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextAreaValue] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const isWeekendDay = isWeekend(year, month, day);

  const holiday = holidaysData.find(h => isHoliday(year, month, day, h.date));
  const isHolidayDay = Boolean(holiday);
  const holidayTitle = holiday?.title ?? "";

  const { workHours, setWorkHoursForProject } = useWorkHours();
  const currentDayData = workHours[date]?.[userId] ?? {};
  const currentValue = currentDayData[projectKey] ?? { hours: "", note: "" };

  const projectId = parseInt(projectKey.split("-")[1], 10);
  const isoDate = new Date(`${date}T00:00:00Z`).toISOString();

  useEffect(() => {
    fetchHolidays().then(setHolidaysData);
  }, []);

  const openModal = () => {
    setInputValue(currentValue.hours?.toString() ?? "");
    setTextAreaValue(currentValue.note ?? "");
    setInputError(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setInputError(null);
  };

  const handleSave = async () => {
    const trimmed = inputValue.trim();
    const hours = trimmed === "" ? 0 : parseFloat(trimmed);

    if (isNaN(hours) || hours % 0.25 !== 0) {
      setInputError("Only fractions of 0.25 are allowed");
      return;
    }

    const note = hours === 0 ? "" : textareaValue;

    setWorkHoursForProject(date, userId, projectKey, hours, note);

    try {
      const res = await fetch("/api/workhours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: isoDate,
          hours,
          note,
          userId: parseInt(userId, 10),
          projectId,
          
        }),
      });

      if (!res.ok) throw new Error("Failed to save work hours.");
    } catch (error) {
      console.error("API Error:", error);
    }

    setIsModalOpen(false);
    setInputError(null);
  };

  return (
    <>
      <div
        onClick={openModal}
        title={holidayTitle}
        className={`relative w-10 h-10 flex items-center justify-center text-sm cursor-pointer odd:border-l odd:border-r
          ${isWeekendDay ? "bg-gray-100" : "bg-white hover:bg-gray-100"}
          ${isHolidayDay ? "bg-green-100" : ""}
        `}
      >
        {currentValue.hours ? Number(currentValue.hours).toFixed(2) : ""}

        {currentValue.note && (
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[10px] border-l-[10px] border-b-green-500 border-l-transparent" />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Sheno oret e punes"
        footer={
          <Button
            onClick={handleSave}
            disabled={!!inputError}
            className="cursor-pointer"
          >
            Ruaj
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <input
            type="number"
            min={0}
            step={0.25}
            value={inputValue}
            onChange={(e) => {
              const val = e.target.value;
              setInputValue(val);
              const floatVal = parseFloat(val);
              if (val && (!floatVal || floatVal % 0.25 !== 0)) {
                setInputError("Only fractions of 0.25 are allowed");
              } else {
                setInputError(null);
              }
            }}
            placeholder="Sheno oret"
            className={`border rounded p-2 w-full ${
              inputError ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          />
          {inputError && (
            <p className="text-red-600 text-sm -mt-2">{inputError}</p>
          )}

          <textarea
            value={textareaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            placeholder="Sheno pershkrimin per oret e punes"
            className="border border-gray-300 rounded p-2"
          />
        </div>
      </Modal>
    </>
  );
}
