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
};

export default function WorkDay({ date, projectKey }: DayBoxProps) {
  const { month, year } = useCalendar();
  const day = parseInt(date.split("-")[2]);
  const isWeekendDay = isWeekend(year, month, day);

  const [holidaysData, setHolidaysData] = useState<HolidayData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [textareaValue, setTextAreaValue] = useState<string>("");
  const [inputError, setInputError] = useState<string | null>(null);

  const { workHours, setWorkHoursForProject } = useWorkHours();

  const currentDayData = workHours[date] || {};
  const currentValue = currentDayData[projectKey] ?? { hours: "", note: "" };

  useEffect(() => {
    fetchHolidays().then(setHolidaysData);
  }, []);

  const holiday = holidaysData.find((h) =>
    isHoliday(year, month, day, h.date)
  );

  const isHolidayDay = Boolean(holiday);
  const holidayTitle = holiday?.title;

  const openModal = () => {
    setInputValue(currentValue?.hours?.toString() || "");
    setTextAreaValue(currentValue?.note || "");
    setInputError(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setInputError(null);
  };

  const handleSave = () => {
    const hours = inputValue.trim() === "" ? 0 : parseFloat(inputValue);

    if (isNaN(hours) || hours % 0.25 !== 0) {
      setInputError("Enter only hours with a fraction of 0.25");
      return;
    }

    const note = hours === 0 ? "" : textareaValue;
    setWorkHoursForProject(date, projectKey, hours, note);
    setIsModalOpen(false);
    setInputError(null);
  };

  return (
    <>
      <div
        onClick={openModal}
        title={holidayTitle || ""}
        className={`relative w-10 h-10 flex items-center justify-center text-sm cursor-pointer odd:border-l odd:border-r
          ${isWeekendDay ? "bg-gray-100" : "bg-white hover:bg-gray-100"}
          ${isHolidayDay ? "bg-green-100" : ""}
        `}
      >
        {Number(currentValue?.hours) > 0 ? Number(currentValue?.hours).toFixed(2) : ""}

        {currentValue?.note && (
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
            className="cursor-pointer"
            disabled={!!inputError}
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
