// EquipeList.tsx
'use client'

import { useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Avatar,
    Collapse,
    Stack,
    Alert,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useEquipesGrouped } from '@/utils/hooks/useEquipesGroupes'

export default function EquipeList() {
    const { data: groupedEquipes, error } = useEquipesGrouped()
    const [expanded, setExpanded] = useState<number | null>(null)

    if (groupedEquipes.length === 0) {
        return <Typography variant="h6" fontWeight="bold">Pas d&apos;equipes</Typography>
    }
    if (error) {
        return <Alert severity="error">Erreur: {error}</Alert>
    }

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            {groupedEquipes.map(({ project, members }) => (
                <Card key={project.id}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight="bold">
                                {project.nom || 'Projet sans nom'}
                            </Typography>
                            <IconButton onClick={() => setExpanded((prev) => (prev === project.id ? null : project.id))}>
                                <ExpandMoreIcon />
                            </IconButton>
                        </Box>
                        <Collapse in={expanded === project.id}>
                            <Box mt={2}>
                                {members.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">
                                        Aucun membre dans cette équipe.
                                    </Typography>
                                ) : (
                                    <Stack spacing={1}>
                                        {members.map((member) => (
                                            <Box key={member.id} display="flex" alignItems="center" gap={2}>
                                                <Avatar src={member.avatar_url || undefined} alt={member.full_name || ''} />
                                                <Box>
                                                    <Typography variant="body2" fontWeight="medium">
                                                        {member.full_name || 'Utilisateur inconnu'}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {member.email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Stack>
                                )}
                            </Box>
                        </Collapse>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}
