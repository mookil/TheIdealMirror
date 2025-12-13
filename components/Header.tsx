/*
Header.tsx
=================
This is the Header component of the main TheIdealMirror page.
Only really contains the login/logout button for now.

*/
"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/auth/AuthProvider';

function Header() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const onLoginLogout = async () => {
    if (user) {
      await signOut();
      router.push('/')
    } else {
      router.push('/login')
    }
    
  }

  return (
    <div className="fixed top-0 right-0 z-50 h-10 flex">
        {/* Buttons Container */}
        <div className="flex items-center justify-between flex-column gap-5 px-5">
            {/* Login Button */}
            <button className="flex-1 bg-gray-500 text-center rounded-lg px-5 text-sm border border-gray-400 hover:bg-gray-400 active:bg-gray-700" onClick={onLoginLogout}>
              {user ? 'Logout' : 'Login'}
              </button>
        </div>
        
    </div>
  )
}

export default Header