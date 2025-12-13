/*
AuthProvider.tsx
=================
This is for authorization to Supabase and for login purposes.
*/
"use client"

import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "../lib/supabase/supabase"

type AuthContextType = {
    user: any | null;
    loading: boolean;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signInWithProvider: (provider: 'google') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });
        supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null);
            setLoading(false);
        });
        return () => sub.subscription.unsubscribe();
    }, []);

    const signInWithEmail = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

    }

    const signUpWithEmail = async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
    }

    // Currently, only google oauth has been set up.
    const signInWithProvider = async (provider: 'google') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: window.location.origin + '/' }
        });
        if (error) throw error;
    }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithEmail, signUpWithEmail, signOut, signInWithProvider}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};