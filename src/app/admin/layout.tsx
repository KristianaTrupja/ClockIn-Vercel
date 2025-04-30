// app/admin/layout.tsx or app/dashboard/layout.tsx (wherever you use DashboardLayout)
import { Suspense } from "react";
import Sidebar from "./layout/Sidebar";
import TopNavBar from "./layout/TopNavBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="2xl:mx-40 mt-11 min-h-screen"
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
      <TopNavBar />
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <Sidebar />
      </Suspense>
      <main className="ml-64">{children}</main>
    </section>
  );
}
