"use client"
import { useSearchParams} from "next/navigation";
import { useState,useEffect } from "react";
import Raport from "./components/raport/Raport";
import Projects from "./components/projects/Projects";
import Users from "./components/users/Users";
import Absences from "./components/absences/Absences";
import Vocations from "./components/vocations/Vocations";
export default function Home() {
  const searchParams = useSearchParams();
  const [tab,setTab] = useState("")
  useEffect(()=>{
    const tab = searchParams.get("tab") || "raport"; // default to raport
    setTab(tab)
  },[searchParams])
  return (
    <section className="m-10" style={{ fontFamily: "var(--font-anek-bangla)" }}>
     {tab=='raport' &&<Raport/>}
     {tab=='projects' && <Projects/>}
     {tab=='users' && <Users/>}
     {tab=='absences' && <Absences/>}
     {tab=='holidays' && <Vocations/>}
    </section>
  );
}

