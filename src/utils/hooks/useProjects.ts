import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'

export function useProjects() {
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('projects')
                    .select(`
              *,
              clients ( nom ),
              business_units ( nom )
            `)

            if (error) {
                setError(error)
            } else {
                setProjects(data || [])
            }
            setLoading(false)
        }

        fetchProjects()
    }, [])

    return { projects, loading, error }
}
