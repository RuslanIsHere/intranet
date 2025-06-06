import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { ProjectDetailsSection } from '@/sections/ProjectDetailsSection'

export default async function ProjectPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    const { data: project, error } = await supabase
        .from('projects')
        .select('*, clients (nom), business_units (nom)')
        .eq('id', params.id)
        .single()

    if (!project || error) return notFound()

    return <ProjectDetailsSection project={project} />
}
