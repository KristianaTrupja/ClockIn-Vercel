"use client"
import { signOut } from "next-auth/react";
import BottomBar from "../components/calendar/BottomBar";
import Calendar from "../components/calendar/Calendar";
import TotalBar from "../components/calendar/TotalBar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Developer() {
   const onSignout = () => {
      signOut({ callbackUrl: `${window.location.origin}/login` });
    };
  return (
    <>
    <section style={{ fontFamily: "var(--font-anek-bangla)" }} className="relative flex flex-col justify-between">
    <Button  size="sm" onClick={onSignout} className="absolute top-[-85px] right-0"><LogOut/></Button>
      <div className="flex">
        <Calendar />
        <TotalBar />
      </div>
      <BottomBar />
    </section>
    </>
  );
}