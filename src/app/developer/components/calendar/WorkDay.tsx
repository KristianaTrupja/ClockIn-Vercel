"use client";
import { useState } from "react";
import { useWorkHours } from "@/app/context/WorkHoursContext";
import { Button } from "@/components/ui/button";
import { Modal } from "@/app/components/ui/Modal";

type DayBoxProps = {
  date: string;
  projectKey: string;
};

export default function WorkDay({ date, projectKey }: DayBoxProps) {
  const { workHours, setWorkHoursForProject } = useWorkHours();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [textareaValue, setTextAreaValue] = useState<string>("");
  const currentDayData = workHours[date] || {};
  const currentValue = currentDayData[projectKey] ?? "";

  const openModal = () => {
    setInputValue(currentValue.toString());
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    const hours = parseInt(inputValue);
    if (!isNaN(hours)) {
      setWorkHoursForProject(date, projectKey, hours);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="w-10 h-10 flex items-center justify-center border border-gray-300 text-sm bg-white cursor-pointer hover:bg-gray-100"
        onClick={openModal}
      >
        {currentValue || ""}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Sheno oret e punes"
        footer={<Button onClick={handleSave}>Save</Button>}
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
