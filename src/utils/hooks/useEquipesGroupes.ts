import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Project, Profile } from '@/types/database'

interface EquipeRowRaw {
    id: string
    created_at: string
    project_id: number
    member_id: string
    projects: Project
    profiles: Profile
}

export interface ProjectWithEquipe {
    project: Project
    members: Profile[]
}

export const useEquipesGrouped = () => {
    const [data, setData] = useState<ProjectWithEquipe[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            setError(null)

            const { data, error } = await supabase
                .from('equipes')
                .select(`
          id,
          created_at,
          project_id,
          member_id,
          projects!project_id (*),
          profiles!member_id (*)
        `)

            if (error) {
                setError(error.message)
                setLoading(false)
                return
            }

            const rows = data as unknown as EquipeRowRaw[]

            const grouped = new Map<number, ProjectWithEquipe>()

            for (const row of rows) {
                const project = row.projects
                const member = row.profiles

                if (!project || !member) continue

                if (!grouped.has(project.id)) {
                    grouped.set(project.id, { project, members: [] })
                }

                grouped.get(project.id)!.members.push(member)
            }

            setData(Array.from(grouped.values()))
            setLoading(false)
        }

        fetch()
    }, [])

    return { data, loading, error }
}
