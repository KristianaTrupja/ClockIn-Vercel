// components/users/UserRow.tsx
import { Button } from "@/components/ui/button";
import { Delete, FilePenLine } from "lucide-react";
import React from "react";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

type Props = {
  emp: User;
  index: number;
  isEditing: boolean;
  formData: User;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onSave: () => void;
};

export function UserRow({ emp, index, isEditing, formData, onChange, onEdit, onDelete, onSave }: Props) {
  return (
    <tr className="border-t border-[#d1d1d1] font-semibold text-lg bg-[#E3F0FF]">
      <td className="px-4 py-2 bg-[#244B77] text-white font-semibold rounded-sm text-xl">
        {index + 1}.
      </td>

      {isEditing ? (
        <>
          {["name", "email", "password", "role"].map((field) => (
            <td key={field} className="px-4 py-2 rounded-sm">
              <input
                name={field}
                value={(formData as any)[field]}
                onChange={onChange}
                className="border px-2 py-1 rounded w-full bg-white"
              />
            </td>
          ))}
          <td className="px-4 py-2 rounded-sm">
            <Button size="sm" onClick={onSave}>Save</Button>
          </td>
        </>
      ) : (
        <>
          <td className="px-4 py-2 rounded-sm">{emp.name}</td>
          <td className="px-4 py-2 rounded-sm">{emp.email}</td>
          <td className="px-4 py-2 rounded-sm">{emp.password}</td>
          <td className="px-4 py-2 rounded-sm">{emp.role}</td>
          <td className="px-4 py-2 rounded-sm text-green-800">
            <button onClick={() => onEdit(emp)}><FilePenLine /></button>
          </td>
          <td className="px-4 py-2 rounded-sm text-red-800">
            <button onClick={() => onDelete(emp)}><Delete /></button>
          </td>
        </>
      )}
    </tr>
  );
}
