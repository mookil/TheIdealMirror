"use client"

import { useAuth } from '@/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

// email regex for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register() {
    const router = useRouter();
    
      // Supabase Authentication
      const { signInWithEmail, signUpWithEmail, signInWithProvider, loading } = useAuth();
    
      // useState form variables
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [showPass, setShowPass] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [info, setInfo] = useState<string | null>(null);
      const [busy, setBusy] = useState(false);

      const [emailError, setEmailError] = useState<string | null>(null);
      const [passwordError, setPasswordError] = useState<string | null>(null);
      const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    
      // Validation for whether fields are valid
      const isEmailValid = EMAIL_REGEX.test(email);
      const isPasswordValid = password.length >= 6;
      const canSubmit = isEmailValid && isPasswordValid && (confirmPassword == password) && !busy && !loading;

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

      // useEffect for checking password field
      useEffect(() => {
        if (!password) {
            setPasswordError('Password is required.')
        } else if (!isPasswordValid) {
            setPasswordError('Password requires a minimum of 6 characters.')
        } else {
            setPasswordError(null)
        }
      }, [password]);

      // useEffect for checking confirm password field
      useEffect(() => {
        if (!confirmPassword) {
            setConfirmPasswordError('Please confirm your password.')
        } else if (confirmPassword != password) {
            setConfirmPasswordError('Passwords do not match.')
        } else {
            setConfirmPasswordError(null)
        }
      }, [confirmPassword]);

      // Send a register request
      const handleRegister = async (e: React.FormEvent) => {
          e.preventDefault();
          setError(null);
          setInfo(null);
      
          // If user can't submit yet, cancel the function
          if (!canSubmit) return;
      
          try {
            setBusy(true);
            await signUpWithEmail(email, password);
            setInfo('Account created! Please check your email to verify.')
      
          } catch (err: any) {
            setError(err?.message ?? 'Register failed.');
      
          } finally {
            setBusy(false);
          }
        }



  return (
    <div className="flex max-w-md mx-auto px-4 py-8 bg-gray-900 rounded-2xl border-2 items-center justify-center h-screen flex-col">
      {/* Sign In section */}
      <div className="flex p-20">
        <h1 className="text-3xl text-center font-bold">Register</h1>
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
    
      {/* Register Form */}
      <form onSubmit={handleRegister} className="flex flex-col justify-items-center w-full">
        {/* Email Section */}
        <label className="text-xl">Email</label>
        <input className="input border-2 rounded p-1" 
                placeholder="Type your email" 
                value={email} 
                onChange={e=>setEmail(e.target.value)}
                aria-invalid={!isEmailValid && email.length > 0}/>
        {emailError && <p className="text-red-400">{emailError}</p>}

        {/* Password Section */}
        <label className="text-xl">Password</label>
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
        {passwordError && <p className="text-red-400">{passwordError}</p>}

        {/* Confirm Password Section */}
        <label className="text-xl">Confirm Password</label>
        <div className="flex border-2 rounded p-1">
          <input className="input flex-2" 
                placeholder="Re-type your password" 
                value={confirmPassword} 
                onChange={e=>setConfirmPassword(e.target.value)}
                aria-invalid={!isPasswordValid && password.length > 0}
                type={showPass ? 'text' : 'password'}/>
        </div>
        {confirmPasswordError && <p className="text-red-400">{confirmPasswordError}</p>}

        {/* Submit Button */}
        <button className="btn btn-primary w-full text-center p-2 rounded-2xl mt-5 bg-blue-600 
        hover:bg-blue-400 
        active:bg-blue-700
        disabled:opacity-60
        disabled:cursor-not-allowed" 
        type="submit"
        disabled={!canSubmit}>{busy ? "Registering..." : "Create new account"}</button>

      </form>


    </div>
  )
}

export default Register