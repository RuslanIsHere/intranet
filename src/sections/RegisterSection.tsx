'use client'

import React, { useState } from 'react'
import RegistrationForm from '@/components/auth/RegistrationForm'
import { supabase } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export const RegisterSection = () => {
    const router = useRouter()

    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    })

    const [error, setError] = useState('')

    const handleRegistration = async () => {
        const { email, password, confirmPassword, username } = form

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas')
            return
        }

        setError('')

        try {
            const { data: { user }, error } = await supabase.auth.signUp({ email, password })

            if (error) {
                if (error.message.includes('already registered')) {
                    setError('Cet utilisateur existe déjà.')
                } else {
                    setError("Erreur lors de l'inscription : " + error.message)
                }
                return
            }

            if (user) {
                const { error: profileError } = await supabase.from('profiles').insert([{
                    id: user.id,
                    email: user.email,
                    full_name: username,
                    roles: ['user'],
                    avatar_url: null,
                }])

                if (profileError) {
                    setError("Inscription réussie, mais erreur lors de l'enregistrement du profil.")
                } else {
                    router.push('/')
                }
            }
        } catch (err) {
            console.error(err)
            setError("Erreur réseau.")
        }
    }

    return (
        <RegistrationForm
            form={form}
            setForm={setForm}
            error={error}
            onSubmit={handleRegistration}
            onSwitchToLogin={() => router.push('/login')}
        />
    )
}
