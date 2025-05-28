import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl, Box,} from '@mui/material'
import { useState, useEffect } from 'react'

interface ProjectModalProps {
    open: boolean
    onClose: () => void
    project: any
    onSave: (updated: any) => void
}

export default function ProjectModal({ open, onClose, project, onSave }: ProjectModalProps) {
    const [form, setForm] = useState({
        nom: '',
        budget_prevu: '',
        status: 'active',
        business_unit: '',
    })

    useEffect(() => {
        if (project) {
            setForm({
                nom: project.nom || '',
                budget_prevu: project.budget_prevu || '',
                status: project.status || 'active',
                business_unit: project.business_units?.nom || '',
            })
        }
    }, [project])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = () => {
        onSave({ ...project, ...form })
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Modifier le projet</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField
                        label="Nom"
                        name="nom"
                        fullWidth
                        value={form.nom}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Budget"
                        name="budget_prevu"
                        type="number"
                        fullWidth
                        value={form.budget_prevu}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel>BU</InputLabel>
                        <Select
                            name="business_unit"
                            value={form.business_unit}
                            onChange={(e) => setForm((f) => ({ ...f, business_unit: e.target.value }))}
                            label="BU"
                        >
                            <MenuItem value="Immobilier">Immobilier</MenuItem>
                            <MenuItem value="Architecture">Architecture</MenuItem>
                            <MenuItem value="Design & Build">Design & Build</MenuItem>
                            <MenuItem value="Transverse">Transverse</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={form.status}
                            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                            label="Status"
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="archived">Archived</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={handleSave} variant="contained">Enregistrer</Button>
            </DialogActions>
        </Dialog>
    )
}
