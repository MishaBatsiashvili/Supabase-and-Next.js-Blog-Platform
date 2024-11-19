'use client'

import FieldErrorItem from '@/components/common/form/FieldError/FieldError'
import { useUser } from '@/contexts/UserContext/UserContext'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
})

type InputsType = z.infer<typeof schema>

const LoginForm = () => {
  const { signIn } = useUser()
  const [isLogginIn, setIsLoggingIn] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputsType>({
    resolver: zodResolver(schema),
  })

  const submit = async (formData: InputsType) => {
    const { email, password } = formData

    setIsLoggingIn(true)

    await signIn({
      email,
      password,
    })

    setIsLoggingIn(false)

    reset()
  }

  return (
    <div className="my-auto w-full p-3">
      <form
        className="w-full rounded-md border border-gray-300 bg-white p-7"
        method="post"
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="text-center text-2xl font-bold text-black">Sign In</h1>
        <div className="mt-8">
          <div className="mt-3">
            <label className="block text-sm text-black">Email</label>
            <FieldErrorItem className="mt-2" error={errors['email']} />
            <input
              {...register('email')}
              type="email"
              className="mt-3 block w-full rounded-md border-gray-300 p-2 text-black"
              disabled={isLogginIn}
            />
          </div>

          <div className="mt-3">
            <label className="block text-sm text-black">Password</label>
            <FieldErrorItem className="mt-2" error={errors['password']} />
            <input
              {...register('password')}
              type="password"
              className="mt-3 block w-full rounded-md border-gray-300 p-2 text-black"
              disabled={isLogginIn}
            />
          </div>

          <div className="mt-6 flex gap-6">
            <button
              disabled={isLogginIn}
              className="flex-grow rounded-md bg-black p-2 text-sm text-white"
            >
              {isLogginIn ? 'Loading...' : 'Log In'}
            </button>
            <Link
              href={'/signup'}
              className="block flex-grow rounded-md bg-gray-500 p-2 text-center text-sm text-white"
            >
              Go to <b>Sign Up</b>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
