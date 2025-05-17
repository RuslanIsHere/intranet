'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthForm from '@/components/AuthForm'

export default function AuthPage() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
        } else {
            router.push('/')
        }
    }

    return (
        <AuthForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            handleLogin={handleLogin}
        />
    )
}
