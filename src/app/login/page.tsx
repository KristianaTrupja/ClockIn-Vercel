"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {signIn} from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";


export default function Login() {
  const [data,setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
const router = useRouter();
const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const signInData = await signIn("credentials", {
    redirect: false,
    email: data.email,
    password: data.password,
  });

  if(signInData?.error) {
    toast.error("Error: Oops! Dicka shkoi gabim. Ju lutem provoni perseri!");
  }else{
    router.refresh();
    router.push("/admin")
  }
};
    const handleChange = (e: any)=>{
        const {name,value} = e.target
        setData((prev)=>({...prev,[name]:value}))
    }
  return (
    <section
      className="m-5 sm:m-auto sm:max-w-2/3 lg:max-w-1/3 pt-32"
      style={{ fontFamily: "var(--font-keania-one)" }}
    >
      <h2 className="text-5xl sm:text-7xl text-[#244B77] text-center">
        ClockIn
      </h2>

      <div className="bg-[#F6F6F6] mt-5 p-8 lg:p-20 rounded-md shadow-sm border-b-5 border-[#244B77]">
        <h3 className="text-3xl sm:text-4xl text-[#244B77]">Sign In</h3>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-base sm:text-lg text-[#244B77] font-medium"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data?.email}
              onChange={handleChange}
              className="p-2 bg-[#E7E7E7] text-[#244B77] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#244B77]"
              style={{ fontFamily: "var(--font-anek-bangla)" }}
              required
            />
          </div>

          <div className="flex flex-col mb-8 lg:mb-12">
            <label
              htmlFor="password"
              className="text-base sm:text-lg text-[#244B77] font-medium"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data?.password}
              onChange={handleChange}
              className="p-2 bg-[#E7E7E7] text-[#244B77] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#244B77]"
              style={{ fontFamily: "var(--font-anek-bangla)" }}
              required
            />
          </div>

          <div className="flex justify-center">
            <Button size="lg">Sign In</Button>
          </div>
        </form>
      </div>
      <Toaster />
    </section>
  );
}
