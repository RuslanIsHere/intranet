import { supabase } from '@/utils/supabase/client'

export async function getUserProfile() {
    const {data: { user }, error,} = await supabase.auth.getUser()

    if (error || !user) {
        console.error('Not authorized:', error)
        return null
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (profileError || !profile) {
        console.error('Error fetching profile:', profileError)
        return null
    }

    return profile
}
