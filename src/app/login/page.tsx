"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {LoginForm} from "@/components/login-form";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
    console.log("Logging in with: ", email, password);
  };

  return (
  //   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
  //     <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        
  //       <h1 className="block text-gray-700 text-center text-xl font-bold mb-4">
  //         Login
  //       </h1>
        
  //       <form onSubmit={handleSubmit}>
  //       <div className="flex items-center justify-between py-3"> 
  //           <Button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  //               Continue with Google
  //           </Button>
  //         </div>
  //         <div className="mb-4">
  //           <label
  //             className="block text-gray-700 text-sm font-bold mb-2"
  //             htmlFor="email"
  //           >
  //             Email
  //           </label>
  //           <input
  //             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  //             id="email"
  //             type="email"
  //             placeholder="Email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />
  //         </div>
  //         <div className="mb-6">
  //           <label
  //             className="block text-gray-700 text-sm font-bold mb-2"
  //             htmlFor="password"
  //           >
  //             Password
  //           </label>
  //           <input
  //             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
  //             id="password"
  //             type="password"
  //             placeholder="Password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //         </div>
          
  //         <div className="flex items-center justify-between">
  //           <Button
  //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  //             type="submit"
  //           >
  //             Sign In
  //           </Button>
  //           <Button onClick={() => router.push("/signup")}>Sign Up</Button>
  //           <Button onClick={() => router.push("/")}>Go Back</Button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
}
