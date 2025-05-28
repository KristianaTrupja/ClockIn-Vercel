"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type WorkEntry = {
  hours: number;
  note?: string;
};

type WorkHours = {
  [date: string]: {
    [userId: string]: {
      [projectKey: string]: WorkEntry;
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
  ) => Promise<void>;
  getTotalHoursForDay: (date: string, userId: string) => number;
  getTotalHoursForProjectInMonth: (
    userId: string,
    projectKey: string,
    month: number,
    year: number
  ) => number;
  reloadWorkHours: (userId: string, month?: number, year?: number) => Promise<void>;
};

const WorkHoursContext = createContext<WorkHoursContextType | undefined>(undefined);

export function WorkHoursProvider({ children }: { children: ReactNode }) {
  const [workHours, setWorkHours] = useState<WorkHours>({});

  const fetchWorkHours = async (userId: string, month?: number, year?: number) => {
    try {
      const params = new URLSearchParams({ userId });
      if (month && year) {
        params.append("month", month.toString());
        params.append("year", year.toString());
      }

      const res = await fetch(`/api/workhours?${params.toString()}`);
      if (!res.ok) {
        console.error("Failed to fetch work hours");
        return;
      }

      const data = await res.json();
      const transformed: WorkHours = {};

      for (const entry of data.workhours) {
        const dateStr = entry.date.split("T")[0];
        const userIdStr = String(entry.userId);
        const projectKey = `project-${entry.projectId}`;

        if (!transformed[dateStr]) transformed[dateStr] = {};
        if (!transformed[dateStr][userIdStr]) transformed[dateStr][userIdStr] = {};

        transformed[dateStr][userIdStr][projectKey] = {
          hours: entry.hours,
          note: entry.note,
        };
      }

      setWorkHours(transformed);
    } catch (error) {
      console.error("Error fetching work hours:", error);
    }
  };

  useEffect(() => {
    fetchWorkHours("1"); // You might want to make userId dynamic later
  }, []);

  const setWorkHoursForProject = async (
    date: string,
    userId: string,
    projectKey: string,
    hours: number,
    note?: string
  ) => {
    // Update local state optimistically
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
    return Object.values(userData).reduce((sum, { hours }) => sum + hours, 0);
  };

  const getTotalHoursForProjectInMonth = (
    userId: string,
    projectKey: string,
    month: number,
    year: number
  ): number => {
    let total = 0;
    for (const [dateStr, users] of Object.entries(workHours)) {
      const date = new Date(dateStr);
      if (date.getMonth() === month - 1 && date.getFullYear() === year) {
        total += users[userId]?.[projectKey]?.hours ?? 0;
      }
    }
    return total;
  };

  const reloadWorkHours = async (userId: string, month?: number, year?: number) => {
    await fetchWorkHours(userId, month, year);
  };

  return (
    <WorkHoursContext.Provider
      value={{
        workHours,
        setWorkHoursForProject,
        getTotalHoursForDay,
        getTotalHoursForProjectInMonth,
        reloadWorkHours,
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
