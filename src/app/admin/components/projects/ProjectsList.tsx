// components/ProjectList.tsx
import React from "react";
import Selector from "@/app/components/Selector";

interface ProjectListProps {
  selectors: { [key: string]: string[] };
  openSelectorId: string | null;
  handleToggle: (id: string) => void;
}

export default function ProjectList({
  selectors,
  openSelectorId,
  handleToggle,
}: ProjectListProps) {
  return (
    <div className="p-5 w-full mx-9 bg-white my-12 h-[60vh]">
      <h2 className="text-2xl text-[#244B77] font-bold text-left mb-3 mt-5">
        Lista e projekteve
      </h2>
      {Object.keys(selectors).map((company) => (
        <div key={company} className="mb-3">
          <h3 className="text-[#244B77] font-semibold mb-1">{company}</h3>
          <Selector
            id={company}
            isOpen={openSelectorId === company}
            onToggle={() => handleToggle(company)}
            options={selectors[company]}
            onChange={(value) => console.log("Selected:", value)}
            defaultValue={selectors[company][0]}
          />
        </div>
      ))}
    </div>
  );
}
