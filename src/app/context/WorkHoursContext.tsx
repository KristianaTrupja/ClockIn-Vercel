'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type WorkHours = {
  [date: string]: {
    [userId: string]: {
      [projectKey: string]: {
        hours: number;
        note?: string;
      };
    };
  };
};


type WorkHoursContextType = {
  workHours: WorkHours;
  setWorkHoursForProject: (
    date: string,
    userId: string,
    projectKey: string,
    hours: number,
    note?: string
  ) => void;
  getTotalHoursForDay: (date: string, userId: string) => number;
  getTotalHoursForProjectInMonth: (
    userId: string,
    projectKey: string,
    month: number,
    year: number
  ) => number;
};

const WorkHoursContext = createContext<WorkHoursContextType | undefined>(undefined);

export function WorkHoursProvider({ children }: { children: ReactNode }) {
  const [workHours, setWorkHours] = useState<WorkHours>({});

  useEffect(() => {
    const stored = localStorage.getItem('workHours');
    if (stored) {
      setWorkHours(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('workHours', JSON.stringify(workHours));
  }, [workHours]);

  const setWorkHoursForProject = (
    date: string,
    userId: string,
    projectKey: string,
    hours: number,
    note?: string
  ) => {
    setWorkHours((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [userId]: {
          ...prev[date]?.[userId],
          [projectKey]: { hours, note },
        },
      },
    }));
  };

  const getTotalHoursForDay = (date: string, userId: string): number => {
    const userData = workHours[date]?.[userId];
    if (!userData) return 0;
    return Object.values(userData).reduce((total, entry) => total + (entry.hours || 0), 0);
  };

  const getTotalHoursForProjectInMonth = (
    userId: string,
    projectKey: string,
    month: number,
    year: number
  ): number => {
    let total = 0;

    const filteredEntries = Object.entries(workHours).filter(([date]) => {
      const d = new Date(date);
      return d.getMonth() === month - 1 && d.getFullYear() === year;
    });

    for (const [_, dayEntry] of filteredEntries) {
      if (dayEntry[userId]?.[projectKey]?.hours) {
        total += dayEntry[userId][projectKey].hours;
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