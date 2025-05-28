import { supabase } from '@/utils/supabase/client'
import type { Profile } from '@/types/database'

export async function getUserProfile(): Promise<Profile | null> {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (error || !user) {
        console.error('Not authorized:', error)
        return null
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single<Profile>()

    if (profileError || !profile) {
        console.error('Error fetching profile:', profileError)
        return null
    }

    return profile
}
