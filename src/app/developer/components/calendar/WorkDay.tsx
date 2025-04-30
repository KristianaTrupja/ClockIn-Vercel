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

  useEffect(() => {
    fetchHolidays().then(setHolidaysData);
  }, []);

  const holiday = holidaysData.find((h) =>
    isHoliday(year, month, day, h.date)
  );

  const isHolidayDay = Boolean(holiday);
  const holidayTitle = holiday?.title;

  const { workHours, setWorkHoursForProject } = useWorkHours();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [textareaValue, setTextAreaValue] = useState<string>("");

  const currentDayData = workHours[date] || {};
  const currentValue = currentDayData[projectKey] ?? { hours: "", note: "" };

  const openModal = () => {
    setInputValue(currentValue?.hours?.toString() || "");
    setTextAreaValue(currentValue?.note || "");
    setIsModalOpen(true);
  };

  const handleClose = () => setIsModalOpen(false);

  const handleSave = () => {
    const hours = inputValue.trim() === "" ? 0 : parseInt(inputValue);
    const note = hours === 0 ? "" : textareaValue;
    if (!isNaN(hours)) {
      setWorkHoursForProject(date, projectKey, hours, note);
    }
    setIsModalOpen(false);
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
        {currentValue?.hours || ""}

        {currentValue?.note && (
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[10px] border-l-[10px] border-b-green-500 border-l-transparent" />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Sheno oret e punes"
        footer={
          <Button onClick={handleSave} className="cursor-pointer">
            Ruaj
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <input
            type="number"
            min={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Sheno oret"
            className="border border-gray-300 rounded p-2"
          />
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
