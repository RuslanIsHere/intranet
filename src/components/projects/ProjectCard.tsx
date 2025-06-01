'use client'

import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Stack,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material'
import { grey, blue, green, orange } from '@mui/material/colors'
import BusinessIcon from '@mui/icons-material/Business'
import EuroIcon from '@mui/icons-material/Euro'
import ArchiveIcon from '@mui/icons-material/Archive'
import DoneIcon from '@mui/icons-material/Done'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'

interface ProjectCardProps {
    project: {
        id: number
        nom: string | null
        status: string
        budget_prevu: number | null
        clients?: { nom: string | null } | null
        business_units?: { nom: string | null } | null
    }
    onClick?: () => void
    onDelete?: () => void
    showDelete?: boolean
}

const buColors: Record<string, string> = {
    'Immobilier': blue[500],
    'Architecture': green[400],
    'Design & Build': orange[400],
    'Transverse': grey[400],
}

export default function ProjectCard({ project, onClick, onDelete, showDelete }: ProjectCardProps) {
    const isArchived = project.status === 'archived'
    const bu = project.business_units?.nom || 'Transverse'
    const borderColor = buColors[bu] || grey[400]

    const [confirmOpen, setConfirmOpen] = useState(false)

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
            onClick={onClick}
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
                backgroundColor: isArchived ? grey[100] : 'background.paper',
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
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
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

                <Stack spacing={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <BusinessIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            Client: {project.clients?.nom || '—'}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        <EuroIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            Budget prévu: {project.budget_prevu?.toLocaleString() || '—'} €
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                        {isArchived ? (
                            <ArchiveIcon fontSize="small" sx={{ color: grey[600] }} />
                        ) : (
                            <DoneIcon fontSize="small" sx={{ color: 'success.main' }} />
                        )}
                        <Typography
                            variant="body2"
                            sx={{
                                color: isArchived ? grey[600] : 'success.main',
                                fontWeight: 'medium',
                                textTransform: 'uppercase',
                            }}
                        >
                            {project.status}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}
