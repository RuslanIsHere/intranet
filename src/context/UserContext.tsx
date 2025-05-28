'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getUserProfile } from '@/utils/hooks/getUserProfile'
import type { Profile } from '@/types/database'; // Укажи верный путь


type UserContextType = {
    profile: Profile | null
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
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const data = await getUserProfile()
            setProfile(data)
            setLoading(false)
            console.log("user context", data)

        }
        fetch()
    }, [])

    return (
        <UserContext.Provider value={{ profile, loading }}>
            {children}
        </UserContext.Provider>
    )
}
