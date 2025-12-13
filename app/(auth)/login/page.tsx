/*
Login Page

This page is where the user will login to an existing account with this site.
Authenticates with Supabase data.
*/

'use client'

import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/auth/AuthProvider'

// email regex for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const router = useRouter();

  // Supabase Authentication
  const { signInWithEmail, signUpWithEmail, signInWithProvider, loading } = useAuth();

  // useState form variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);

  // Validation for whether fields are valid
  const isEmailValid = EMAIL_REGEX.test(email);
  const isPasswordValid = password.length >= 6;
  const canSubmit = isEmailValid && isPasswordValid && !busy && !loading;

  // useEffect for checking email field
  useEffect(() => {
    if (!email) {
        setEmailError('Email is required.')
    } else if (!isEmailValid) {
        setEmailError('Invalid email.')
    } else {
        setEmailError(null)
    }
  }, [email]);
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    // If user can't submit yet, cancel the function
    if (!canSubmit) return;

    try {
      setBusy(true);
      await signInWithEmail(email, password);

    } catch (err: any) {
      setError(err?.message ?? 'Login failed.');

    } finally {
      setBusy(false);
      router.push("/")

    }
    
  }

  const handleRegister = async (e: React.FormEvent) => {
    router.push("/register")
  }

  const handleGoogleOAuth = async () => {
    setError(null);
    setInfo(null);
    try {
      setBusy(true);
      await signInWithProvider('google');
    } catch (err: any) {
      setError(err?.message ?? 'Google sign-in failed.');

    } finally {
      setBusy(false);
    }

  }



  return (
    <div className="flex max-w-md mx-auto px-4 py-8 bg-gray-900 rounded-2xl border-2 items-center justify-center h-screen flex-col">
      {/* Sign In section */}
      <div className="flex p-20">
        <h1 className="text-3xl text-center font-bold">Login</h1>
      </div>
      <button onClick={() => router.push("/")}> Go to Home </button>
      

      {/* Error + Info banners */}
      {info && (
        <div className="text-blue-200">
          {info} 
        </div>
      )}
      {error && (
        <div className="text-red-200">
          {error} 
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col justify-items-center w-full">
        {/* Email input */}
        <label className="text-xl">Email</label>
        <input className="input border-2 rounded p-1" 
                placeholder="Type your email" 
                value={email} 
                onChange={e=>setEmail(e.target.value)}
                aria-invalid={!isEmailValid && email.length > 0}/>
        {emailError && <p className="text-red-400">{emailError}</p>}
        {/* Password input */}
        <label className="text-xl ">Password</label>
        <div className="flex border-2 rounded p-1">
          <input className="input flex-2" 
                placeholder="Type your password" 
                value={password} 
                onChange={e=>setPassword(e.target.value)}
                aria-invalid={!isPasswordValid && password.length > 0}
                type={showPass ? 'text' : 'password'}/>
          {/* Show/Hide password button */}
          <button className="mx-2 hover:text-gray-400 active:text-gray-700"
                  type="button"
                  onClick={() => {setShowPass((s) => !s)}}>
            {showPass ? 'Hide' : 'Show'}
          </button>
        </div>
        
        {/* Submit Button */}
        <button className="btn btn-primary w-full text-center p-2 rounded-2xl mt-5 bg-blue-600 
        hover:bg-blue-400 
        active:bg-blue-700
        disabled:opacity-60
        disabled:cursor-not-allowed" 
        type="submit"
        disabled={!canSubmit}>{busy ? "Logging in..." : "Login"}</button>
      </form>

      {/* Register button */}
      <button className="btn w-full mt-2 text-center text-blue-400 hover:underline hover:text-blue-500 active:text-blue-700" 
              onClick={handleRegister}>Register</button>

      {/* OAuth Section (only google implemented) */}
      <div>
        <p className="text-center m-4">Or continue with:</p>
        {/* Google OAuth sign in button */}
        <button className="btn w-full text-center border-2 rounded-2xl p-1 hover:bg-gray-700 active:bg-gray-500" 
              onClick={handleGoogleOAuth}>Google</button>
      </div>
    </div>
  )
}

export default Login