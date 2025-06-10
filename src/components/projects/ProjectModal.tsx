'use client'

import {
    Dialog,  DialogContent, DialogActions,
    Button, TextField, MenuItem, Select, InputLabel,
    FormControl, Box,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useState, useEffect } from 'react'
import type { Project } from '@/types/database'
import { useClients } from '@/utils/hooks/useClients'
import { useBusinessUnits } from '@/utils/hooks/useBusinessUnits'
import { useUsers } from '@/utils/hooks/useUsers'

interface ProjectModalProps {
    open: boolean
    onClose: () => void
    project: Project | null
    onSave: (updated: Project) => void
}

interface FormState {
    nom: string
    budget_prevu: string
    budget_reel: string
    revenu_cible: string
    marge_prevue: string
    status: string
    client_id: number | null
    business_unit_id: number | null
    capitaine_id: string | null
}

export default function ProjectModal({
                                         open,
                                         onClose,
                                         project,
                                         onSave,
                                     }: ProjectModalProps) {
    const { clients } = useClients()
    const { businessUnits } = useBusinessUnits()
    const { users } = useUsers()

    const [form, setForm] = useState<FormState>({
        nom: '',
        budget_prevu: '',
        budget_reel: '',
        revenu_cible: '',
        marge_prevue: '',
        status: 'active',
        client_id: null,
        business_unit_id: null,
        capitaine_id: null,
    })

    useEffect(() => {
        if (project) {
            setForm({
                nom: project.nom || '',
                budget_prevu: project.budget_prevu?.toString() || '',
                budget_reel: project.budget_reel?.toString() || '',
                revenu_cible: project.revenu_cible?.toString() || '',
                marge_prevue: project.marge_prevue?.toString() || '',
                status: project.status || 'active',
                client_id: project.client_id || null,
                business_unit_id: project.business_unit_id || null,
                capitaine_id: project.capitaine_id || null,
            })
        }
    }, [project])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target
        const numericFields = ['client_id', 'business_unit_id']
        setForm((prev) => ({
            ...prev,
            [name as keyof FormState]: value === '' ? null :
                numericFields.includes(name) ? Number(value) : value,
        }))
    }

    const handleSave = async () => {
        const newProject: Omit<Project, 'id'> = {
            nom: form.nom,
            budget_prevu: parseFloat(form.budget_prevu) || 0,
            budget_reel: parseFloat(form.budget_reel) || 0,
            revenu_cible: parseFloat(form.revenu_cible) || 0,
            marge_prevue: parseFloat(form.marge_prevue) || 0,
            status: form.status,
            client_id: form.client_id,
            business_unit_id: form.business_unit_id,
            capitaine_id: form.capitaine_id,
            created_at: new Date().toISOString(),
        }

        onSave(newProject as Project)
        onClose()
    }



    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField
                        label="Nom"
                        name="nom"
                        value={form.nom}
                        onChange={handleInputChange}
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel>Client</InputLabel>
                        <Select<string>
                            name="client_id"
                            value={form.client_id?.toString() ?? ''}
                            onChange={handleSelectChange}
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
                        <InputLabel>Business Unit</InputLabel>
                        <Select<string>
                            name="business_unit_id"
                            value={form.business_unit_id?.toString() ?? ''}
                            onChange={handleSelectChange}
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
                        <InputLabel>Capitaine</InputLabel>
                        <Select<string>
                            name="capitaine_id"
                            value={form.capitaine_id ?? ''}
                            onChange={handleSelectChange}
                            label="Capitaine"
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.full_name || user.email}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select<string>
                            name="status"
                            value={form.status}
                            onChange={handleSelectChange}
                            label="Status"
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="archived">Archived</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Budget prévu"
                        name="budget_prevu"
                        type="number"
                        value={form.budget_prevu}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Budget réel"
                        name="budget_reel"
                        type="number"
                        value={form.budget_reel}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Revenu cible"
                        name="revenu_cible"
                        type="number"
                        value={form.revenu_cible}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Marge prévue"
                        name="marge_prevue"
                        type="number"
                        value={form.marge_prevue}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={handleSave} variant="contained">
                    Enregistrer
                </Button>
            </DialogActions>
        </Dialog>
    )
}
