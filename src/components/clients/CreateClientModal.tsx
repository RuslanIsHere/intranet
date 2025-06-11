'use client'

import {
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
} from '@mui/material'
import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'

interface Props {
    open: boolean
    onClose: () => void
    onSuccess?: (message: string) => void
}

export default function CreateClientModal({ open, onClose, onSuccess }: Props) {
    const [form, setForm] = useState({
        nom: '',
        email: '',
        telephone: '',
        adresse: '',
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: e.target.value })
    }

    const handleCreate = async () => {
        setLoading(true)
        const { error } = await supabase.from('clients').insert(form)

        setLoading(false)

        if (error) {
            console.error('Erreur création client:', error)
            onSuccess?.('Erreur lors de la création')
        } else {
            onSuccess?.('Client ajouté avec succès')
            onClose()
            setForm({ nom: '', email: '', telephone: '', adresse: '' }) // reset
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField label="Nom" value={form.nom} onChange={handleChange('nom')} fullWidth />
                    <TextField label="Email" type="email" value={form.email} onChange={handleChange('email')} fullWidth />
                    <TextField label="Téléphone" value={form.telephone} onChange={handleChange('telephone')} fullWidth />
                    <TextField label="Adresse" value={form.adresse} onChange={handleChange('adresse')} fullWidth multiline rows={2} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={handleCreate} variant="contained" disabled={loading}>
                    {loading ? 'Ajout...' : 'Ajouter'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
