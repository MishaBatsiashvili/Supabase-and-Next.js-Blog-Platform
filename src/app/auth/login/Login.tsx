"use client";

import FieldError from "@/components/common/form/FieldError/FieldError";
import { useUser } from "@/contexts/UserContext/UserContext";
import formDataToObject from "@/utils/formDataToObject";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

type InputsType = z.infer<typeof schema>;

const LoginForm = () => {
  const router = useRouter();
  const { signIn } = useUser()
  const [isLogginIn, setIsLoggingIn] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: zodResolver(schema),
  });

  const submit = async (formData: InputsType) => {
    const { email, password } = formData;
    
    setIsLoggingIn(true)
    
    await signIn({
      email,
      password
    })

    setIsLoggingIn(false)
  };

  return (
    <form className="w-full p-8 rounded-lg bg-slate-800" onSubmit={handleSubmit(submit)}>
      <h1 className="text-4xl font-bold text-white text-center">Sign In</h1>
      <div className="mt-8">
        <div className="mt-3">
          <label className="block text-white">Email</label>
          <FieldError className="mt-2" error={errors["email"]} />
          <input
            {...register("email")}
            type="email"
            className="block text-black w-full rounded-md p-2 mt-3"
            disabled={isLogginIn}
          />
        </div>

        <div className="mt-3">
          <label className="block text-white">Password</label>
          <FieldError className="mt-2" error={errors["password"]} />
          <input
            {...register("password")}
            type="password"
            className="block text-black w-full rounded-md p-2 mt-3"
            disabled={isLogginIn}
          />
        </div>

        <button disabled={isLogginIn} className="mt-7 w-full p-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md">
          { isLogginIn ? 'Loading...' : 'Submit' }
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
