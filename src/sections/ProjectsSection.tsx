'use client'
import { useState, useEffect } from 'react';
import { Alert, Box } from '@mui/material';
import { useProjects } from '@/utils/hooks/useProjects';
import { useUserContext } from '@/context/UserContext';
import { supabase } from '@/utils/supabase/client';
import ProjectModal from '@/components/projects/ProjectModal';
import ProjectToolbar from '@/components/projects/ProjectToolbar';
import { SnackbarComponent } from '@/components/projects/SnackbarComponent';
import { ProjectList } from '@/components/projects/ProjectList';
import type { Project } from '@/types/database';

export const ProjectsSection = () => {
    const { projects: fetchedProjects, error } = useProjects();
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const { profile } = useUserContext();
    const isAdmin = profile?.roles?.includes('admin');

    useEffect(() => {
        setProjects(fetchedProjects);
    }, [fetchedProjects]);

    const handleOpenModal = (project: Project) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProject(null);
    };

    const handleAddProject = () => {
        setSelectedProject(null);
        setModalOpen(true);
    };

    const handleSaveProject = async (project: Project) => {
        const { data, error } = await supabase
            .from('projects')
            .insert({
                nom: project.nom,
                budget_prevu: project.budget_prevu,
                budget_reel: project.budget_reel,
                revenu_cible: project.revenu_cible,
                marge_prevue: project.marge_prevue,
                status: project.status,
                client_id: project.client_id,
                business_unit_id: project.business_unit_id,
                capitaine_id: project.capitaine_id,
            })
            .select()
            .single()

        if (error) {
            console.error(error)
            setSnackbar({ open: true, message: 'Erreur lors de la création', severity: 'error' })
        } else if (data) {
            setProjects((prev) => [...prev, data])
            setSnackbar({ open: true, message: 'Projet créé avec succès', severity: 'success' })
        }

        setModalOpen(false)
    }



    const handleDeleteProject = async (project: Project) => {
        const { error } = await supabase.from('projects').delete().eq('id', project.id);
        if (error) {
            setSnackbar({ open: true, message: 'Erreur lors de la suppression', severity: 'error' });
        } else {
            setSnackbar({ open: true, message: 'Projet supprimé', severity: 'success' });
            setProjects((prev) => prev.filter((p) => p.id !== project.id));
        }
    };

    const filteredProjects = projects.filter((project) =>
        project.nom?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ px: { xs: 2, sm: 4 }, py: 4, maxWidth: '100%', mx: 'auto' }}>
            {error && <Alert severity="error">Erreur: {error.message}</Alert>}

            <ProjectToolbar search={search} setSearch={setSearch} onAdd={handleAddProject} />

            <ProjectList
                projects={filteredProjects}
                onProjectClick={handleOpenModal}
                onDeleteProject={handleDeleteProject}
                isAdmin={!!isAdmin}
            />

            <ProjectModal
                open={modalOpen}
                onClose={handleCloseModal}
                project={selectedProject}
                onSave={handleSaveProject}
            />

            <SnackbarComponent
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </Box>
    );
};
