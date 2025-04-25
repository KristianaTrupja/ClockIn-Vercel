import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/app/components/ui/Modal";
import VocationTable from "./VocationTable";
import AddVocationModal from "./AddVocationModal";

const initialData = [
  { id: 1, date: "01.01.2025", holidays: "Festat e Vitit te Ri" },
  { id: 2, date: "02.01.2025", holidays: "Festat e Vitit te Ri" },
  { id: 3, date: "14.03.2025", holidays: "Dita e veres" },
  { id: 4, date: "22.03.2025", holidays: "Dita e Nevruzit" },
  { id: 5, date: "30.03.2025", holidays: "Dita e Bajramit te madh" },
  { id: 6, date: "20.04.2025", holidays: "E diela e Pashkeve Ortodokse" },
];

export default function Vocations() {
  const [vocations, setVocations] = useState(initialData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState({ date: "", holidays: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState({ date: "", holidays: "" });

  const handleEdit = (id: number) => {
    const emp = vocations.find((v) => v.id === id);
    if (emp) {
      setEditingId(id);
      setEditedData({ date: emp.date, holidays: emp.holidays });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof editedData
  ) => {
    setEditedData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = (id: number) => {
    const updated = vocations.map((v) =>
      v.id === id ? { ...v, ...editedData } : v
    );
    setVocations(updated);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    const emp = vocations.find((v) => v.id === id);
    const confirmed = window.confirm(
      `A jeni i sigurt që doni të fshini pushimin më datë ${emp?.date}?`
    );
    if (confirmed) {
      setVocations((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleNewChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof newHoliday
  ) => {
    setNewHoliday((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAdd = () => {
    if (!newHoliday.date || !newHoliday.holidays) {
      alert("Ju lutem plotësoni të gjitha fushat e detyrueshme.");
      return;
    }
    const newId = Math.max(...vocations.map((v) => v.id), 0) + 1;
    setVocations([...vocations, { id: newId, ...newHoliday }]);
    setNewHoliday({ date: "", holidays: "" });
    setModalOpen(false);
  };

  return (
    <section className="overflow-x-auto rounded-md">
      <VocationTable
        vocations={vocations}
        editingId={editingId}
        editedData={editedData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChange={handleChange}
        onSave={handleSave}
      />

      <div className="flex justify-center mt-20">
        <Button onClick={() => setModalOpen(true)}>Shto ditë të re pushimi</Button>
      </div>

      <AddVocationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onChange={handleNewChange}
        onSubmit={handleAdd}
        data={newHoliday}
      />
    </section>
  );
}
