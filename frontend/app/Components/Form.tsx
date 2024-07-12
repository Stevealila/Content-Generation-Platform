'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loginUser, registerUser } from '../data/user'

interface FormProps {
  type: 'register' | 'login'
}

const Form: React.FC<FormProps> = ({ type }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const isRegister = type === 'register'

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    
    const user = { username, password }

    try {
      if (isRegister) {
        await registerUser(user)
        router.push('/users/login')
      } else {
        await loginUser(user)
        router.push('/')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto md:w-1/2 space-y-4 md:space-y-6 mt-10 p-4">
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-800 text-gray-100 p-2 rounded-lg"
        disabled={isLoading}
      >
        {isRegister ? 'Create an account' : 'Login'}
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        {isRegister ? (
          <>
            Already have an account?{' '}
            <Link href="/users/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Login here
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <Link href="/users/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Register here
            </Link>
          </>
        )}
      </p>
    </form>
  );
};

export default Form;