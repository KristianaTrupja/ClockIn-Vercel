'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";

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
  setWorkHoursForProject: (date: string, projectKey: string, hours: number) => void;
};

const WorkHoursContext = createContext<WorkHoursContextType | undefined>(undefined);

export function WorkHoursProvider({ children }: { children: ReactNode }) {
  const [workHours, setWorkHours] = useState<WorkHours>({});

  const setWorkHoursForProject = (date: string, projectKey: string, hours: number, note?: string) => {
    setWorkHours(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [projectKey]: { hours, note }
      }
    }));
  };

  return (
    <WorkHoursContext.Provider value={{ workHours, setWorkHoursForProject }}>
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
