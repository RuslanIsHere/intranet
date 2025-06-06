'use client'

import { Box, Typography, Divider } from '@mui/material'
import type { Project } from '@/types/database'

interface Props {
    project: Project & {
        clients?: { nom: string | null } | null
        business_units?: { nom: string | null } | null
    }
}

const formatEuro = (value: number | null | undefined) =>
    value != null ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value) : '—'

export default function ProjectDetails({ project }: Props) {
    const fields = [
        { label: 'Client', value: project.clients?.nom },
        { label: 'Business Unit', value: project.business_units?.nom },
        { label: 'Capitaine', value: project.capitaine_id },
        { label: 'Budget prévu', value: formatEuro(project.budget_prevu) },
        { label: 'Revenu cible', value: formatEuro(project.revenu_cible) },
        { label: 'Budget réel', value: formatEuro(project.budget_reel) },
        { label: 'Marge prévue', value: project.marge_prevue != null ? `${project.marge_prevue.toFixed(2)} %` : '—' },
    ]

    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                {project.nom || 'Projet sans nom'}
            </Typography>

            <Box display="flex" flexDirection="column" gap={1} mt={2}>
                {fields.map((field) => (
                    <Box key={field.label}>
                        <Typography variant="body2" color="text.secondary">
                            {field.label}:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {field.value?.toString().toUpperCase() || '—'}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" color="text.secondary">
                Statut:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
                {project.status.toUpperCase()}
            </Typography>
        </Box>
    )
}
