import { CalendarProvider } from "../context/CalendarContext";
import { ProjectProvider } from "../context/ProjectContext";
import { WorkHoursProvider } from "../context/WorkHoursContext";
import Sidebar from "./components/sidebar/Sidebar";


export default function DashboardLayout({ children }:{children: React.ReactNode}) {
  return (
    <WorkHoursProvider>
    <CalendarProvider>
    <ProjectProvider>
    <section
      className="2xl:mx-20 mt-11 min-h-screen"
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
      <Sidebar/>
      <main className="ml-64">{children}</main>
      
    </section>
    </ProjectProvider>
    </CalendarProvider>
    </WorkHoursProvider>
  );
}
