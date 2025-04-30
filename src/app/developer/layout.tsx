"use client"

import { useEffect, useState } from "react";
import { CalendarProvider } from "../context/CalendarContext";
import { ProjectProvider } from "../context/ProjectContext";
import { WorkHoursProvider } from "../context/WorkHoursContext";
import Sidebar from "./components/sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <WorkHoursProvider>
      <ProjectProvider>
        <CalendarProvider>
          {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
  
          <section
            className={`transition-opacity duration-300 ${
              isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
            } 2xl:mx-50 mt-11 min-h-screen`}
            style={{ fontFamily: "var(--font-anek-bangla)" }}
          >
            <div className="flex justify-between mb-6 items-baseline">
              <h2
                className="text-4xl sm:text-6xl text-[#244B77] text-center"
                style={{ fontFamily: "var(--font-keania-one)" }}
              >
                ClockIn
              </h2>
              <h4 className="text-[#116B16] font-semibold text-xl">
                Kristiana Trupja (Admin)
              </h4>
            </div>
            <Sidebar />
            <main className="ml-64 2xl:w-fit min-h-[80vh] mt-2">{children}</main>
          </section>
        </CalendarProvider>
      </ProjectProvider>
    </WorkHoursProvider>
  );
  
}
