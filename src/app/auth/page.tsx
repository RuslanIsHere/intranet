'use client'

import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import AuthForm from '@/components/auth/AuthForm'
import RegistrationForm from '@/components/auth/RegistrationForm'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

const AuthPage: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [isLogin, setIsLogin] = useState(true)

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            console.log('User logged in')
        }
    }

    const handleRegistration = async () => {
        const { data: { user }, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else if (user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    { user_id: user.id, username },
                ])

            if (profileError) {
                setError(profileError.message)
            } else {
                console.log('User registered and username added:', user)
            }
        }
    }

    const switchToRegistration = () => {
        setIsLogin(false)
    }

    const switchToLogin = () => {
        setIsLogin(true)
    }

    return (
        <>
            {isLogin ? (
                <AuthForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    error={error}
                    handleLogin={handleLogin}
                    switchToRegistration={switchToRegistration}
                />
            ) : (
                <RegistrationForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    username={username}
                    setUsername={setUsername}
                    error={error}
                    handleRegistration={handleRegistration}
                    switchToLogin={switchToLogin}
                />
            )}
        </>
    )
}

export default AuthPage
