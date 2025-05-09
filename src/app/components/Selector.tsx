"use client";
import { useEffect, useState } from "react";
import { FilePenLine } from "lucide-react";

interface SelectorProps {
  id: string;
  label?: string;
  options: string[];
  onChange: (value: string) => void;
  defaultValue?: string;
  isOpen: boolean;
  className?: string;
  onToggle: () => void;
  variant?: string
}

export default function Selector({
  label,
  options: initialOptions,
  onChange,
  defaultValue = "",
  isOpen,
  className,
  onToggle,
  variant
}: SelectorProps) {
  const [selected, setSelected] = useState(defaultValue);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(initialOptions);
  }, [initialOptions]);
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange(value);
    onToggle(); // close dropdown
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditingValue(options[index]);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  const handleEditBlur = () => {
    if (editingIndex !== null) {
      const updatedOptions = [...options];
  
      if (editingValue.trim() === "") {
        // Remove the option if input is empty
        updatedOptions.splice(editingIndex, 1);
  
        // Also deselect if the removed option was selected
        if (options[editingIndex] === selected) {
          setSelected("");
          onChange("");
        }
      } else {
        // Otherwise, update the value
        updatedOptions[editingIndex] = editingValue;
  
        if (options[editingIndex] === selected) {
          setSelected(editingValue);
          onChange(editingValue);
        }
      }
  
      setOptions(updatedOptions);
      setEditingIndex(null);
    }
  };
  

  return (
    <div className="relative mb-3">
      {label && (
        <label htmlFor={label} className="text-sm text-gray-700 mb-1 block">
          {label}
        </label>
      )}

      <button
        onClick={onToggle}
        className={` p-2 px-5 rounded-sm w-full flex justify-between items-center ${
          className || "bg-[#244B77] text-[#FFFF]"}`}
      >
        {selected || "Select an option"}
        <span
          className={`ml-2 transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          ▼
        </span>
      </button>

      {(isOpen && variant !== "absences") && (
  <ul className="absolute bg-[#E7E7E7] border border-gray-300 rounded-md mt-1 w-full z-10 max-h-60 overflow-y-auto">
    {options.map((option, index) => (
      <li
        key={index}
        onClick={() => handleSelect(option)}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative p-2 border-b border-gray-300 hover:bg-[#E0F6E5] cursor-pointer last:border-b-0"
      >
        {editingIndex === index ? (
          <input
            type="text"
            value={editingValue}
            onChange={handleEditChange}
            onBlur={handleEditBlur}
            autoFocus
            className="w-full p-1 border rounded-sm bg-white"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="flex justify-between items-center">
            <span>{option}</span>
            {hoveredIndex === index && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(index);
                }}
                className="text-sm text-gray-600 ml-2 hover:text-black"
              >
                <FilePenLine size={16} />
              </button>
              
            )}
          </div>
        )}
      </li>
    ))}
  </ul>
)}
 {(isOpen && variant === "absences") && (
  <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10 max-h-60 overflow-y-auto">
    {options.map((option, index) => (
      <li
        key={index}
        onClick={() => handleSelect(option)}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="bg-[#E3F0FF] text-[#244B77] relative p-2 hover:bg-[#244B77] hover:text-white cursor-pointer last:border-b-0 my-2 mx-3 rounded-md"
      >
          <div className="flex justify-between items-center">
            <span>{option}</span>
          </div>
      </li>
    ))}
  </ul>
)}
    </div>
  );
}