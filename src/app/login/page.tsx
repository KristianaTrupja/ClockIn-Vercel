"use client"
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Login() {
  const [data,setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

//   const login = async () => {
//     try {
//       const { data: sessionData, error } = await supabase.auth.signUp({
//         email: data.email,
//         password: data.password,
//       });
  
//       if (error) {
//         console.error("Login error:", error.message);
//         alert("Invalid credentials or user not found.");
//       } else {
//         console.log("Login successful:", sessionData);
//         // Redirect after login if needed:
//         window.location.href = "/";
//       }
//     } catch (e) {
//       console.error("Unexpected error:", e);
//     }
//   };
  
const signUp = async () => {
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
  
      if (error) {
        console.error("Sign-up error:", error.message);
        alert(error.message);
      } else {
        console.log("Sign-up successful:", signUpData);
        if (signUpData.user && !signUpData.session) {
          // User created but needs to verify email
          alert("A verification link has been sent to your email.");
        } else {
          // Email verification not required, or session already active
          window.location.href = "/";
        }
      }
    } catch (e) {
      console.error("Unexpected error:", e);
      alert("Unexpected error during sign-up.");
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

        <form className="mt-8 space-y-6">
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
            <Button size="lg" onClick={signUp}>Sign In</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
