'use client'

import { useProjects } from '@/utils/hooks/useProjects'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectModal from '@/components/projects/ProjectModal'
import { supabase } from '@/utils/supabase/client'
import {Alert, Box, Snackbar} from '@mui/material'
import { useState } from 'react'


export default function ProjectsPage() {
    const { projects, error } = useProjects()
    const [selectedProject, setSelectedProject] = useState<any | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    })



    const handleOpenModal = (project: any) => {
        setSelectedProject(project)
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setSelectedProject(null)
    }

    const handleSaveProject = async (updated: any) => {
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
        }

        setModalOpen(false)
    }

    return (
        <Box sx={{ px: { xs: 2, sm: 4 }, py: 4, maxWidth: '100%', mx: 'auto' }}>

            {error && <Alert severity="error">Erreur: {error.message}</Alert>}

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'center',
                }}
            >
                {projects.map((project) => (
                    <Box
                        key={project.id}
                        sx={{
                            flex: '1 1 220px',
                            maxWidth: 300,
                            width: '100%',
                        }}
                        onClick={() => handleOpenModal(project)}
                    >
                        <ProjectCard project={project} />
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
