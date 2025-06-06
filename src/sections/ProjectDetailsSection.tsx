'use client'

import { Box, useTheme, useMediaQuery } from '@mui/material'
import ProjectDetails from '@/components/projects/ProjectDetails'
import ProjectComments from '@/components/projects/ProjectComments'
import type { Project } from '@/types/database'

interface Props {
    project: Project & {
        clients?: { nom: string | null } | null
        business_units?: { nom: string | null } | null
    }
}

export const ProjectDetailsSection = ({ project }: Props) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 3,
                mt: 4,
                px: { xs: 2, md: 6 },
                pb: 6,
            }}
        >

            <Box
                sx={{
                    flex: 2,
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: 'background.paper',
                    boxShadow: 2,
                    minHeight: 300,
                }}
            >
                <ProjectDetails project={project} />
            </Box>


            {/* Right: Comments */}
            <Box
                sx={{
                    flex: 1,
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: 'background.paper',
                    boxShadow: 2,
                    minHeight: 300,
                }}
            >
                <ProjectComments projectId={project.id} />
            </Box>
        </Box>
    )
}
