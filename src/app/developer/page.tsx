import BottomBar from "./components/calendar/BottomBar";
import Calendar from "./components/calendar/Calendar";
import TotalBar from "./components/calendar/TotalBar";

export default function Developer() {
  return (
    <section style={{ fontFamily: "var(--font-anek-bangla)" }} className="flex flex-col justify-between min-h-[80vh]">
      <div className="flex">
        <Calendar />
        <TotalBar />
      </div>
      <BottomBar />
    </section>
  );
}