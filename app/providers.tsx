'use client'

import React from 'react'
import AuthProvider from '@/auth/AuthProvider'

function Providers({children}: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}

export default Providers