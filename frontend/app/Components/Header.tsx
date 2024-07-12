'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { isUserLoggedIn, logoutUser } from '../data/user'

const Header: React.FC = () => {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const status = isUserLoggedIn()
      setLoggedIn(status)
    }
    checkLoginStatus()
  }, [])

  const handleLogout = async () => {
    try {
      await logoutUser()
      setLoggedIn(false)
      router.push('/users/login')
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  return (
    <header className="bg-teal-600 p-4">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">Content Generation Platform</Link>
        <div>
          {loggedIn ? (
            <>
              <Link href="/" className="text-white mr-4">Home</Link>
              <button onClick={handleLogout} className="text-white">Logout</button>
            </>
          ) : (
            <>
              <Link href="/users/login" className="text-white mr-4">Login</Link>
              <Link href="/users/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header