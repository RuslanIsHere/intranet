'use client'

import { useProjects } from '@/utils/hooks/useProjects'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectModal from '@/components/projects/ProjectModal'
import ProjectToolbar from '@/components/projects/ProjectToolbar'
import { supabase } from '@/utils/supabase/client'
import { Alert, Box, Snackbar } from '@mui/material'
import { useState, useEffect } from 'react'
import type { Project } from '@/types/database'
import { useUserContext } from '@/context/UserContext'

export default function ProjectsPage() {
    const { projects: fetchedProjects, error } = useProjects()
    const [projects, setProjects] = useState<Project[]>([])
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    })

    const { profile } = useUserContext()
    const isAdmin = profile?.roles?.includes('admin')

    useEffect(() => {
        setProjects(fetchedProjects)
    }, [fetchedProjects])

    const handleOpenModal = (project: Project) => {
        setSelectedProject(project)
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setSelectedProject(null)
    }

    const handleAddProject = () => {
        setSelectedProject(null)
        setModalOpen(true)
    }

    const handleSaveProject = async (updated: Project) => {
        const { id, nom, budget_prevu, status } = updated

        const { error } = await supabase
            .from('projects')
            .update({ nom, budget_prevu, status })
            .eq('id', id)

        if (error) {
            console.error(error)
            setSnackbar({ open: true, message: 'Erreur lors de la mise à jour', severity: 'error' })
        } else {
            setSnackbar({ open: true, message: 'Projet mis à jour avec succès', severity: 'success' })
            setProjects((prev) =>
                prev.map((p) => (p.id === id ? { ...p, nom, budget_prevu, status } : p))
            )
        }

        setModalOpen(false)
    }

    const handleDeleteProject = async (project: Project) => {
        const { error } = await supabase.from('projects').delete().eq('id', project.id)
        if (error) {
            setSnackbar({ open: true, message: 'Erreur lors de la suppression', severity: 'error' })
        } else {
            setSnackbar({ open: true, message: 'Projet supprimé', severity: 'success' })
            setProjects((prev) => prev.filter((p) => p.id !== project.id))
        }
    }

    const filteredProjects = projects.filter((project) =>
        project.nom?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Box sx={{ px: { xs: 2, sm: 4 }, py: 4, maxWidth: '100%', mx: 'auto' }}>
            {error && <Alert severity="error">Erreur: {error.message}</Alert>}

            <ProjectToolbar search={search} setSearch={setSearch} onAdd={handleAddProject} />

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'flex-start',
                }}
            >
                {filteredProjects.map((project) => (
                    <Box
                        key={project.id}
                        sx={{ flex: '1 1 220px', maxWidth: 300, width: '100%' }}
                        onClick={() => handleOpenModal(project)}
                    >
                        <ProjectCard
                            project={project}
                            onClick={() => handleOpenModal(project)}
                            onDelete={() => handleDeleteProject(project)}
                            showDelete={isAdmin}
                        />
                    </Box>
                ))}
            </Box>

            <ProjectModal
                open={modalOpen}
                onClose={handleCloseModal}
                project={selectedProject}
                onSave={handleSaveProject}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
