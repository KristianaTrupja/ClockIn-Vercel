"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddUserModal } from "./AddUserModal";
import { UserTable } from "./UserTable";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};
export default function Users() {
  const [open, setOpen] = useState(false);
  // const [employees, setEmployees] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{ id: number; username: string; email: string; password: string; role: string }>({ id: 0, username: "", email: "", password: "", role: "" });
  const [user, setUser] = useState<{ users: User[] } | null>(null);

  console.log("User:", user);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user');
      const data = await res.json();
      setUser(data);
    };
  
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (emp: any) => {
    if (emp.id === undefined) return;
    setEditingId(emp.id);
    setFormData({ id: emp.id, username: emp.username, email: emp.email, password: "", role: emp.role });
  };

  const deleteItem = (emp: any) => {
    if (emp.id === undefined) return;
    if (window.confirm(`Jeni i sigurt që doni të fshini ${emp.username}?`)) {
      // setEmployees((prev) => prev.filter((e) => e.id !== emp.id));
    }
  };

  const saveChanges = () => {
    if (editingId !== null) {
      // setEmployees((prev) =>
      //   prev.map((emp) => (emp.id === editingId ? { ...emp, ...formData } : emp))
      // );
      setEditingId(null);
      setFormData({ id: 0, username: "", email: "", password: "", role: "" });
    }
  };

  const addNewEmployee = async () => {
    if (!formData.username || !formData.email || !formData.password || !formData.role) {
      alert("Ju lutem plotësoni të gjitha fushat.");
      return;
    }

    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const newUser = await response.json();
      // setEmployees((prev) => [...prev, newUser.user]); // append new user
      setOpen(false);
      toast.success("Përdoruesi u shtua me sukses.");
    } else {
      const err = await response.json();
      toast.error(err.message || "Registrimi dështoi. Ju lutem provoni përsëri.");
    }
  };

  return (
    <section className="overflow-x-auto rounded-md">
      <UserTable
        employees={user?.users || []}
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

      <Toaster />
    </section>
  );
}
