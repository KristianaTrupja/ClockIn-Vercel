"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddUserModal } from "./AddUserModal";
import { UserTable } from "./UserTable";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

const defaultEmployees = [
  { id: 1, username: "Andi Lazaj", email: "andi.lazaj@dela-tech.com", password: "123", role: "Dev" },
  { id: 2, username: "Emiljano Duraku", email: "emiljano.duraku@dela-tech.com", password: "123", role: "Dev" },
  { id: 3, username: "Elson Gasa", email: "elson.gasa@dela-tech.com", password: "123", role: "Dev" },
  { id: 4, username: "Ivi Beqiri", email: "ivi.beqiri@dela-tech.com", password: "123", role: "Dev" },
  { id: 5, username: "Jetmir Ahmati", email: "jetmir.ahmati@dela-tech.com", password: "123", role: "Dev" },
  { id: 6, username: "Kristiana Trupja", email: "kristiana.trupja@dela-tech.com", password: "123", role: "Dev" },
];

export default function Users() {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState(defaultEmployees);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{ id: number; username: string; email: string; password: string; role: string }>({ id: 0, username: "", email: "", password: "", role: "" });
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (emp: typeof employees[number]) => {
    if (emp.id === undefined) return;
    setEditingId(emp.id);
    setFormData({ id: emp.id, username: emp.username, email: emp.email, password: emp.password, role: emp.role });
  };

  const deleteItem = (emp: typeof employees[number]) => {
    if (emp.id === undefined) return;
    if (window.confirm(`Jeni i sigurt që doni të fshini ${emp.username}?`)) {
      setEmployees((prev) => prev.filter((e) => e.id !== emp.id));
    }
  };

  const saveChanges = () => {
    if (editingId !== null) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingId ? { ...emp, ...formData } : emp))
      );
      setEditingId(null);
      setFormData({ id: 0, username: "", email: "", password: "", role: "" });
    }
  };

  const addNewEmployee = async() => {
    if (!formData.username || !formData.email || !formData.password || !formData.role) {
      alert("Ju lutem plotësoni të gjitha fushat.");
      return;
    }
    const response = await fetch ("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      }),
   } )

   if(response.ok) {
    router.push('/login')
   }else{
    toast.error("Registrimi dështoi. Ju lutem provoni përsëri.");
   }
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
          setFormData({ id: 0, username: "", email: "", password: "", role: "" });
        }}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={addNewEmployee}
      />
      <Toaster/>
    </section>
  );
}
