'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthForm from '@/components/auth/AuthForm'
import RegistrationForm from '@/components/auth/RegistrationForm'
import { supabase } from '@/utils/supabase/client'


const AuthPage: React.FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)

    const switchToRegistration = () => {
        setError('')
        setIsLogin(false)
    }

    const switchToLogin = () => {
        setError('')
        setIsLogin(true)
    }

    const handleLogin = async () => {
        setLoading(true)
        setError('')

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        console.log('Logged in')

        // Подстраховка — получаем session, убеждаемся что всё ок
        const {
            data: { session },
        } = await supabase.auth.getSession()

        if (session) {
            window.location.href = '/' // ❗ именно хард-редирект
        } else {
            setError('Не удалось получить сессию. Попробуй снова.')
        }

        setLoading(false)
    }



    const handleRegistration = async () => {
        setLoading(true)
        setError('')
        if (password !== confirmPassword) {
            setError('Пароли не совпадают')
            setLoading(false)
            return
        }

        try {
            const {
                data: { user },
                error,
            } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) {
                if (error.message.includes('already registered')) {
                    setError('Такой пользователь уже существует.')
                } else {
                    setError('Ошибка при регистрации: ' + error.message)
                }
                setLoading(false)
                return
            }

            if (user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: user.id,
                            email: user.email,
                            full_name: username, // 👈 сюда имя
                            roles: ['user'],
                            avatar_url: null,
                        },
                    ])

                if (profileError) {
                    console.error('Ошибка при сохранении профиля:', profileError)
                    setError('Регистрация прошла, но не удалось сохранить профиль.')
                } else {
                    console.log('Профиль сохранён')
                    window.location.href = '/'
                }
            }
        } catch (err) {
            console.error('Registration error:', err)
            setError('Не удалось завершить регистрацию. Попробуйте позже.')
        } finally {
            setLoading(false)
        }
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
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
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
