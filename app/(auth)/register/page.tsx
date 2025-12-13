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

      // useEffect for checking password field
      useEffect(() => {
        if (!password) {
            setEmailError('Password is required.')
        } else if (!isPasswordValid) {
            setEmailError('Password requires a minimum of 6 characters.')
        } else {
            setEmailError(null)
        }
      }, [password]);

      // useEffect for checking confirm password field
      useEffect(() => {
        if (!confirmPassword) {
            setEmailError('Please confirm your password.')
        } else if (confirmPassword != password) {
            setEmailError('Passwords do not match.')
        } else {
            setEmailError(null)
        }
      }, [confirmPassword]);



  return (
    <div className="flex max-w-md mx-auto px-4 py-8 bg-gray-900 rounded-2xl border-2 items-center justify-center h-screen flex-col">
      {/* Sign In section */}
      <div className="flex p-20">
        <h1 className="text-3xl text-center font-bold">Register</h1>
      </div>
    
      {/* Register Form */}
      <form>
        <label>Email</label>

        <label>Password</label>

        <label>Confirm Password</label>

      </form>

    </div>
  )
}

export default Register