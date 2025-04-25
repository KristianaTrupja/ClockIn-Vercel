import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
export default function Raport() {
  const employees = [
    { id: 1, name: "Andi Lazaj", hours: 40 },
    { id: 2, name: "Emiljano Duraku", hours: 35 },
    { id: 3, name: "Elson Gasa", hours: 42 },
    { id: 4, name: "Ivi Beqiri", hours: 42 },
    { id: 5, name: "Jetmir Ahmati", hours: 42 },
    { id: 6, name: "Kristiana Trupja", hours: 42 },
  ];
  return (
    <section className="overflow-x-auto rounded-md">
      <table
        className="w-fit text-[#244B77] border-separate"
        style={{ borderSpacing: "10px" }} // Add spacing between cells
      >
        <thead className="bg-[#6C99CB] text-white">
          <tr className="text-left">
            <th className="px-4 py-2 w-16 rounded-sm">Nr</th>
            <th className="px-4 py-2 w-1/3 rounded-sm">Punonjesit</th>
            <th className="px-4 py-2 w-1/3 rounded-sm">Oret e punes</th>
            <th className="px-4 py-2 w-1/3 rounded-sm">Veprim</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr
              key={emp.id}
              className="border-t border-[#d1d1d1] font-semibold text-lg bg-[#E3F0FF]"
            >
              <td className="px-4 py-2 bg-[#244B77] text-white font-semibold rounded-sm text-xl">
                {index + 1}.
              </td>
              <td className="px-4 py-2 rounded-sm">{emp.name}</td>
              <td className="px-4 py-2 rounded-sm">{emp.hours}</td>
              <td className="px-4 py-2 rounded-sm">
                <Button
                  variant="secondary"
                  className="font-semibold w-full justify-start pl-10"
                >
                  Vizito profilin
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </section>
  );
}
