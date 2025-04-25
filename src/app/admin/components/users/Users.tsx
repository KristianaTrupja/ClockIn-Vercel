import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddUserModal } from "./AddUserModal";
import { UserTable } from "./UserTable";

const defaultEmployees = [
  { id: 1, name: "Andi Lazaj", email: "andi.lazaj@dela-tech.com", password: "123", role: "Dev" },
  { id: 2, name: "Emiljano Duraku", email: "emiljano.duraku@dela-tech.com", password: "123", role: "Dev" },
  { id: 3, name: "Elson Gasa", email: "elson.gasa@dela-tech.com", password: "123", role: "Dev" },
  { id: 4, name: "Ivi Beqiri", email: "ivi.beqiri@dela-tech.com", password: "123", role: "Dev" },
  { id: 5, name: "Jetmir Ahmati", email: "jetmir.ahmati@dela-tech.com", password: "123", role: "Dev" },
  { id: 6, name: "Kristiana Trupja", email: "kristiana.trupja@dela-tech.com", password: "123", role: "Dev" },
];

export default function Users() {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState(defaultEmployees);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{ id: number; name: string; email: string; password: string; role: string }>({ id: 0, name: "", email: "", password: "", role: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (emp: typeof employees[number]) => {
    if (emp.id === undefined) return;
    setEditingId(emp.id);
    setFormData({ id: emp.id, name: emp.name, email: emp.email, password: emp.password, role: emp.role });
  };

  const deleteItem = (emp: typeof employees[number]) => {
    if (emp.id === undefined) return;
    if (window.confirm(`Jeni i sigurt që doni të fshini ${emp.name}?`)) {
      setEmployees((prev) => prev.filter((e) => e.id !== emp.id));
    }
  };

  const saveChanges = () => {
    if (editingId !== null) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingId ? { ...emp, ...formData } : emp))
      );
      setEditingId(null);
      setFormData({ id: 0, name: "", email: "", password: "", role: "" });
    }
  };

  const addNewEmployee = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      alert("Ju lutem plotësoni të gjitha fushat.");
      return;
    }
    const newId = Math.max(...employees.map((e) => e.id)) + 1;
    setEmployees([...employees, { ...formData, id: newId }]);
    setFormData({ id: 0, name: "", email: "", password: "", role: "" });
    setOpen(false);
  };

  return (
    <section className="overflow-x-auto rounded-md">
      <UserTable
        employees={employees}
        editingId={editingId}
        formData={formData}
        onChange={handleInputChange}
        onEdit={startEditing}
        onDelete={deleteItem}
        onSave={saveChanges}
      />
      <div className="flex justify-center mt-20">
        <Button onClick={() => setOpen(true)}>Shto të ri</Button>
      </div>
      <AddUserModal
        open={open}
        onClose={() => {
          setOpen(false);
          setFormData({ id: 0, name: "", email: "", password: "", role: "" });
        }}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={addNewEmployee}
      />
    </section>
  );
}
