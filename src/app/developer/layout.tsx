import { getServerSession } from "next-auth";
import { CalendarProvider } from "../context/CalendarContext";
import { ProjectProvider } from "../context/ProjectContext";
import { WorkHoursProvider } from "../context/WorkHoursContext";
import Sidebar from "./components/sidebar/Sidebar";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <WorkHoursProvider>
      <ProjectProvider>
        <CalendarProvider>
          <section
            className={`transition-opacity duration-300 2xl:mx-50 mt-11 min-h-screen`}
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
                {session?.user?.username || "User"}
                {session?.user?.role === "admin" ? " (Admin)" : " (Developer)"}
              </h4>
            </div>
            <Sidebar />
            <main className="ml-64 2xl:w-fit min-h-[80vh] mt-2">
              {children}
            </main>
          </section>
        </CalendarProvider>
      </ProjectProvider>
    </WorkHoursProvider>
  );
}
