"use client";

import { createContext, useContext, useState } from "react";

interface CalendarContextProps {
  month: number;
  year: number;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth()); 
  const [year, setYear] = useState(today.getFullYear());

  const goToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  return (
    <CalendarContext.Provider
      value={{ month, year, goToPreviousMonth, goToNextMonth }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) throw new Error("useCalendar must be used within CalendarProvider");
  return context;
};
