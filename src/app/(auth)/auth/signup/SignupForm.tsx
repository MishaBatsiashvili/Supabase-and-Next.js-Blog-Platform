"use client";

import FieldError from "@/components/common/form/FieldError/FieldError";
import { useUser } from "@/contexts/UserContext/UserContext";
import formDataToObject from "@/utils/formDataToObject";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

type InputsType = z.infer<typeof schema>;

const SignupForm = () => {
  const { signUp } = useUser()
  const [isSigningUp, setIsSigningUp] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<InputsType>({
    resolver: zodResolver(schema),
  });

  const submit = async (formData: InputsType) => {
    const { email, password } = formData;
    
    setIsSigningUp(true)
    
    await signUp({
      email,
      password
    })

    setIsSigningUp(false)

    reset()
  };

  return (
    <div className="w-full">
      <form className="w-full p-8 rounded-lg bg-slate-800" method="post" onSubmit={handleSubmit(submit)}>
        <h1 className="text-4xl font-bold text-white text-center">Sign Up</h1>
        <div className="mt-8">
          <div className="mt-3">
            <label className="block text-white">Email</label>
            <FieldError className="mt-2" error={errors["email"]} />
            <input
              {...register("email")}
              type="email"
              className="block text-black w-full rounded-md p-2 mt-3"
              disabled={isSigningUp}
            />
          </div>

          <div className="mt-3">
            <label className="block text-white">Password</label>
            <FieldError className="mt-2" error={errors["password"]} />
            <input
              {...register("password")}
              type="password"
              className="block text-black w-full rounded-md p-2 mt-3"
              disabled={isSigningUp}
            />
          </div>

          <button disabled={isSigningUp} className="mt-7 w-full p-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md">
            { isSigningUp ? 'Loading...' : 'Sign Up' }
          </button>
        </div>
      </form>
      <Link href={'/auth/login'} className="text-center mt-3 block text-sm underline">Log In</Link>
    </div>
  );
};

export default SignupForm;
