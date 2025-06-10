'use client'

import {
    Box,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Divider,
    Snackbar,
    Alert,
} from '@mui/material'
import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { useClients } from '@/utils/hooks/useClients'
import { useBusinessUnits } from '@/utils/hooks/useBusinessUnits'
import { useUsers } from '@/utils/hooks/useUsers'
import type { Project } from '@/types/database'

interface Props {
    project: Project & {
        clients?: { nom: string | null } | null
        business_units?: { nom: string | null } | null
    }
}

export default function ProjectDetails({ project }: Props) {
    const { clients } = useClients()
    const { businessUnits } = useBusinessUnits()
    const { users } = useUsers()

    const [form, setForm] = useState({
        nom: project.nom || '',
        budget_prevu: project.budget_prevu?.toString() || '',
        budget_reel: project.budget_reel?.toString() || '',
        revenu_cible: project.revenu_cible?.toString() || '',
        marge_prevue: project.marge_prevue?.toString() || '',
        status: project.status || 'active',
        client_id: project.client_id?.toString() || '',
        business_unit_id: project.business_unit_id?.toString() || '',
        capitaine_id: project.capitaine_id || '',
    })

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
    ) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        const updated = {
            nom: form.nom,
            budget_prevu: parseFloat(form.budget_prevu) || 0,
            budget_reel: parseFloat(form.budget_reel) || 0,
            revenu_cible: parseFloat(form.revenu_cible) || 0,
            marge_prevue: parseFloat(form.marge_prevue) || 0,
            status: form.status,
            client_id: form.client_id ? Number(form.client_id) : null,
            business_unit_id: form.business_unit_id ? Number(form.business_unit_id) : null,
            capitaine_id: form.capitaine_id || null,
        }

        const { error } = await supabase
            .from('projects')
            .update(updated)
            .eq('id', project.id)

        if (error) {
            console.error('Erreur lors de la sauvegarde:', error)
            setSnackbar({
                open: true,
                message: 'Erreur lors de la sauvegarde',
                severity: 'error',
            })
        } else {
            setSnackbar({
                open: true,
                message: 'Projet mis à jour avec succès',
                severity: 'success',
            })
        }
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" fontWeight="bold">
                Détails du projet
            </Typography>

            <TextField
                label="Nom"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                fullWidth
            />

            <FormControl fullWidth>
                <InputLabel id="client-label">Client</InputLabel>
                <Select
                    labelId="client-label"
                    id="client-select"
                    name="client_id"
                    value={form.client_id}
                    onChange={handleChange}
                    label="Client"
                >
                    {clients.map((client) => (
                        <MenuItem key={client.id} value={client.id.toString()}>
                            {client.nom}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="bu-label">Business Unit</InputLabel>
                <Select
                    labelId="bu-label"
                    id="bu-select"
                    name="business_unit_id"
                    value={form.business_unit_id}
                    onChange={handleChange}
                    label="Business Unit"
                >
                    {businessUnits.map((bu) => (
                        <MenuItem key={bu.id} value={bu.id.toString()}>
                            {bu.nom}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="capitaine-label">Capitaine</InputLabel>
                <Select
                    labelId="capitaine-label"
                    id="capitaine-select"
                    name="capitaine_id"
                    value={form.capitaine_id}
                    onChange={handleChange}
                    label="Capitaine"
                >
                    {users.map((u) => (
                        <MenuItem key={u.id} value={u.id}>
                            {u.full_name || u.email}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="status-label">Statut</InputLabel>
                <Select
                    labelId="status-label"
                    id="status-select"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    label="Statut"
                >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="archived">Archived</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Budget prévu (€)"
                name="budget_prevu"
                type="number"
                value={form.budget_prevu}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Budget réel (€)"
                name="budget_reel"
                type="number"
                value={form.budget_reel}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Revenu cible (€)"
                name="revenu_cible"
                type="number"
                value={form.revenu_cible}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Marge prévue (%)"
                name="marge_prevue"
                type="number"
                value={form.marge_prevue}
                onChange={handleChange}
                fullWidth
            />

            <Divider sx={{ my: 2 }} />
            <Button variant="contained" onClick={handleSave}>
                Enregistrer
            </Button>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
