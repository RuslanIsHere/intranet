// ProjectList.tsx
import { Box } from '@mui/material';
import ProjectCard from '@/components/projects/ProjectCard';
import type { Project } from '@/types/database';

interface ProjectListProps {
    projects: Project[];
    onProjectClick: (project: Project) => void;
    onDeleteProject: (project: Project) => void;
    isAdmin: boolean;
}

export const ProjectList = ({ projects, onProjectClick, onDeleteProject, isAdmin }: ProjectListProps) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'flex-start' }}>
            {projects.map((project) => (
                <Box key={project.id} sx={{ flex: '1 1 220px', maxWidth: 300, width: '100%' }}>
                    <ProjectCard
                        project={project}
                        onClick={() => onProjectClick(project)}
                        onDelete={() => onDeleteProject(project)}
                        showDelete={isAdmin}
                    />
                </Box>
            ))}
        </Box>
    );
};
