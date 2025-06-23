'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthForm from '@/components/auth/AuthForm'
import { supabase } from '@/utils/supabase/client'

export const LoginSection = () => {
    const router = useRouter()

    // État du formulaire (email et mot de passe)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    // Message d’erreur affiché sous les champs
    const [error, setError] = useState('')

    // Gère les modifications dans les champs de saisie
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        setError('') // Efface l’erreur dès que l’utilisateur tape quelque chose
    }

    // Tentative de connexion à Supabase
    const handleLogin = async () => {
        setError('') // Nettoie les erreurs précédentes

        const { email, password } = form

        // Requête à Supabase pour se connecter
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            // Erreur retournée par Supabase (identifiants incorrects, etc.)
            setError(error.message)
        } else {
            // Vérifie que la session est bien créée
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                // Redirige vers la page d’accueil si tout va bien
                router.push('/')
            } else {
                setError('Не удалось получить сессию. Попробуйте снова.')
            }
        }
    }

    return (
        <AuthForm
            form={form} // Données du formulaire
            onChange={handleInputChange} // Gestionnaire d’entrée unique
            error={error} // ⚠Message d'erreur
            onSubmit={handleLogin} // Quand on clique sur "Se connecter"
            onSwitchToRegister={() => router.push('/register')} // Vers l’inscription
        />
    )
}
