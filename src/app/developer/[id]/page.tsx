"use client"
import { signOut } from "next-auth/react";
import BottomBar from "../components/calendar/BottomBar";
import Calendar from "../components/calendar/Calendar";
import TotalBar from "../components/calendar/TotalBar";

export default function Developer() {
   const onSignout = () => {
      signOut({ callbackUrl: `${window.location.origin}/login` });
    };
  return (
    <>
    <section style={{ fontFamily: "var(--font-anek-bangla)" }} className="relative flex flex-col justify-between">
      <div className="flex min-h-[500px]">
        <Calendar />
        <TotalBar />
      </div>
      <BottomBar />
    </section>
    </>
  );
}