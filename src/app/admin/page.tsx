// app/admin/page.tsx
import { Suspense } from "react";
import AdminClient from "./AdminClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminPage() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      
      <AdminClient/>
    </Suspense>
  );
}
