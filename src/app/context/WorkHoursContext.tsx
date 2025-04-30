'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type WorkHours = {
  [date: string]: {
    [projectKey: string]: {
      hours: number;
      note?: string;
    };
  };
};

type WorkHoursContextType = {
  workHours: WorkHours;
  setWorkHoursForProject: (
    date: string,
    projectKey: string,
    hours: number,
    note?: string
  ) => void;
  getTotalHoursForDay: (date: string) => number;
  getTotalHoursForProjectInMonth: (projectKey: string, month: number, year: number) => number;
};

const WorkHoursContext = createContext<WorkHoursContextType | undefined>(undefined);

export function WorkHoursProvider({ children }: { children: ReactNode }) {
  const [workHours, setWorkHours] = useState<WorkHours>({});

  useEffect(() => {
    // On mount, load from localStorage
    const stored = localStorage.getItem('workHours');
    if (stored) {
      setWorkHours(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // On every change, save to localStorage
    localStorage.setItem('workHours', JSON.stringify(workHours));
  }, [workHours]);

  const setWorkHoursForProject = (date: string, projectKey: string, hours: number, note?: string) => {
    setWorkHours(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [projectKey]: { hours, note }
      }
    }));
  };

  const getTotalHoursForDay = (date: string): number => {
    const dayData = workHours[date];
    if (!dayData) return 0;
    return Object.values(dayData).reduce((total, projectEntry) => total + (projectEntry.hours || 0), 0);
  };
  
  
  const getTotalHoursForProjectInMonth = (
    projectKey: string,
    month: number,
    year: number
  ): number => {
    let total = 0;
  
    const filteredEntries = Object.entries(workHours).filter(([date]) => {
      const d = new Date(date);
      return d.getMonth() === month - 1 && d.getFullYear() === year;
    });
  
    const monthWorkHours = Object.fromEntries(filteredEntries);
    for (const day of Object.values(monthWorkHours)) {
      if (day[projectKey]?.hours) {
        total += day[projectKey].hours;
      }
    }
  
    return total;
  };
  

  return (
    <WorkHoursContext.Provider
    value={{
      workHours,
      setWorkHoursForProject,
      getTotalHoursForDay,
      getTotalHoursForProjectInMonth,
    }}
  >
    {children}
  </WorkHoursContext.Provider>
  );
}

export function useWorkHours() {
  const context = useContext(WorkHoursContext);
  if (!context) {
    throw new Error("useWorkHours must be used within a WorkHoursProvider");
  }
  return context;
}