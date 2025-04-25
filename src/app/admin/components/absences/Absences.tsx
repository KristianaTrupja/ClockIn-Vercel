import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Selector from "@/app/components/Selector";

export default function Absences() {
  const [openSelectorId, setOpenSelectorId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenSelectorId((prev) => (prev === id ? null : id));
  }, []);

  const selectorStyle =
    "bg-[#E3F0FF] text-[#244B77] border-[1px] border-[#244B77]";

  const employees = [
    "Kristiana Trupja",
    "Andi Lazaj",
    "Emiljano Duraku",
    "Elson Gasa",
    "Ivi Beqiri",
    "Jetmir Ahmati",
  ];

  const absenceTypes = ["Leje semundjeje", "Leje prinderore", "Pushime"];

  return (
    <div className="max-w-2/3 2xl:max-w-1/2">
      <h2 className="text-2xl text-[#244B77] font-bold mb-3 mt-5">
        Krijo lejet per punonjesit
      </h2>

      {/* Employee Selector */}
      <div className="w-1/2 mb-5">
        <Selector
          id="selector-employee"
          label="Selekto emrin e punonjesit"
          variant="absences"
          isOpen={openSelectorId === "selector-employee"}
          onToggle={() => handleToggle("selector-employee")}
          options={employees}
          onChange={(value) => console.log("Selected:", value)}
          defaultValue="Punonjesit"
          className={selectorStyle}
        />
      </div>

      {/* Date Pickers */}
      <div className="flex flex-col gap-4 bg-[#244B77] p-6 rounded-md text-white">
        {["Data e fillimit", "Data e perfundimit"].map((label, i) => (
          <div
            key={label}
            className="flex items-baseline w-full gap-5 justify-between"
          >
            <label
              htmlFor={`${label.toLowerCase().replace(" ", "-")}`}
              className="text-md font-bold"
            >
              {label}:
            </label>
            <input
              type="date"
              id={`${label.toLowerCase().replace(" ", "-")}`}
              name={`${label.toLowerCase().replace(" ", "-")}`}
              className="bg-white text-[#244B77] px-3 py-2 text-sm w-2/3"
            />
          </div>
        ))}
      </div>

      {/* Absence Type Selector */}
      <div className="w-1/2 mt-5">
        <Selector
          id="selector-absence"
          variant="absences"
          isOpen={openSelectorId === "selector-absence"}
          onToggle={() => handleToggle("selector-absence")}
          options={absenceTypes}
          onChange={(value) => console.log("Selected:", value)}
          defaultValue="Tipi i lejes"
          className={selectorStyle}
        />
      </div>

      <Button className="mt-10">Krijo leje</Button>
    </div>
  );
}
