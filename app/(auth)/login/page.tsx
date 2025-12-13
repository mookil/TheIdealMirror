'use client'

import React from 'react'
import { useState } from 'react';
import { useAuth } from '@/auth/AuthProvider'

function Login() {
  const { signInWithEmail, signUpWithEmail, signInWithProvider, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signInWithEmail(email, password);
  }

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUpWithEmail(email, password);
  }


  return (
    <div>
      {/* Sign In section */}
      <h1 className="text-2xl">Sign In</h1>
      <form onSubmit={onLogin}>
        {/* Email input */}
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        {/* Password input */}
        <input className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
        {/* Submit Button */}
        <button className="btn btn-primary w-full" type="submit">Login</button>
      </form>

      {/* Register button */}
      <button className="btn w-full mt-2" onClick={onRegister}>Register</button>

      {/* OAuth Section (only google implemented) */}
      <p>Or continue with:</p>
      <div>
        {/* Google OAuth sign in button */}
        <button className="btn w-full" onClick={() => signInWithProvider('google')}>Google</button>
      </div>
    </div>
  )
}

export default Login