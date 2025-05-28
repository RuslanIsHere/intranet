'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getUserProfile } from '@/utils/hooks/getUserProfile'

type UserProfile = {
    id: string
    full_name: string
    email?: string
    avatar_url?: string
    [key: string]: any
}

type UserContextType = {
    profile: UserProfile | null
    loading: boolean
}

const UserContext = createContext<UserContextType>({
    profile: null,
    loading: true,
})

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const data = await getUserProfile()
            setProfile(data)
            setLoading(false)
        }
        fetch()
    }, [])

    return (
        <UserContext.Provider value={{ profile, loading }}>
            {children}
        </UserContext.Provider>
    )
}
