'use client'

import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material'
import { grey, blue, green, orange } from '@mui/material/colors'

import ArchiveIcon from '@mui/icons-material/Archive'
import DoneIcon from '@mui/icons-material/Done'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import type { Project } from '@/types/database'
import { useRouter } from 'next/navigation'
import { useTheme } from '@mui/material/styles'


interface ProjectCardProps {
    project: Project & {
        clients?: { nom: string | null } | null
        business_units?: { nom: string | null } | null
        capitaine?: string | null
    }
    onClick?: () => void
    onDelete?: () => void
    showDelete?: boolean
}

const buColors: Record<string, string> = {
    'Immobilier': blue[500],
    'Architecture': green[400],
    'Design & Build': orange[400],
    'Transverse': grey[500],
}

export default function ProjectCard({ project, onDelete, showDelete }: ProjectCardProps) {
    const theme = useTheme()
    const isArchived = project.status === 'archived'
    const bu = project.business_units?.nom || 'Transverse'
    const borderColor = buColors[bu] || grey[500]

    const [confirmOpen, setConfirmOpen] = useState(false)
    const router = useRouter()
    const handleCardClick = () => router.push(`/projects/${project.id}`)

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setConfirmOpen(true)
    }

    const handleConfirmDelete = () => {
        onDelete?.()
        setConfirmOpen(false)
    }

    return (
        <Card
            onClick={handleCardClick}
            variant="outlined"
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: '0.3s',
                borderLeft: `6px solid ${borderColor}`,
                borderRadius: 2,
                backgroundColor: isArchived
                    ? theme.palette.mode === 'dark'
                        ? grey[900]
                        : grey[100]
                    : theme.palette.background.paper,
                color: isArchived ? grey[500] : 'inherit',
                '&:hover': {
                    boxShadow: 6,
                    transform: 'scale(1.01)',
                },
                position: 'relative',
            }}
        >
            {showDelete && (
                <>
                    <IconButton
                        size="small"
                        onClick={handleDeleteClick}
                        color="error"
                        sx={{ position: 'absolute', bottom: 8, right: 8 }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>

                    <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                        <DialogContent>Voulez-vous vraiment supprimer ce projet ?</DialogContent>
                        <DialogActions>
                            <Button onClick={() => setConfirmOpen(false)}>Annuler</Button>
                            <Button onClick={handleConfirmDelete} color="error" variant="contained">
                                Supprimer
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}

            <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                        {project.nom || 'Sans nom'}
                    </Typography>
                    <Chip
                        label={bu}
                        size="small"
                        sx={{
                            backgroundColor: borderColor,
                            color: '#fff',
                            fontWeight: 'bold',
                        }}
                    />
                </Box>

                <Box display="flex" flexWrap="wrap" gap={1}>
                    <Box flex={1} minWidth={160}>
                        <Typography variant="body2">
                            Client: {project.clients?.nom || '—'}
                        </Typography>
                        <Typography variant="body2">
                            Capitaine: {project.capitaine || '—'}
                        </Typography>
                        <Typography variant="body2">
                            Budget prévu: {project.budget_prevu?.toLocaleString() || '—'} €
                        </Typography>
                        <Typography variant="body2">
                            Revenu cible: {project.revenu_cible?.toLocaleString() || '—'} €
                        </Typography>
                        <Typography variant="body2">
                            Budget réel: {project.budget_reel?.toLocaleString() || '—'} €
                        </Typography>
                        <Typography variant="body2">
                            Marge prévue: {project.marge_prevue?.toFixed(2) || '—'} %
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                            {isArchived ? (
                                <ArchiveIcon fontSize="small" sx={{ color: grey[500] }} />
                            ) : (
                                <DoneIcon fontSize="small" sx={{ color: 'success.main' }} />
                            )}
                            <Typography
                                variant="body2"
                                sx={{
                                    color: isArchived ? grey[500] : 'success.main',
                                    fontWeight: 'medium',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {project.status}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}