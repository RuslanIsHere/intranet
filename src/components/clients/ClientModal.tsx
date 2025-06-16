'use client'

import {
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { Client } from '@/types/database'
import { supabase } from '@/utils/supabase/client'

interface Props {
    client: Client
    onClose: () => void
    onSuccess?: (message: string) => void
}

export default function EditClientModal({ client, onClose, onSuccess }: Props) {
    const [form, setForm] = useState({
        nom: '',
        email: '',
        telephone: '',
        adresse: '',
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (client) {
            setForm({
                nom: client.nom || '',
                email: client.email || '',
                telephone: client.telephone || '',
                adresse: client.adresse || '',
            })
        }
    }, [client])

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: e.target.value })
    }

    const handleUpdate = async () => {
        if (!form.nom.trim() || !form.email.trim() || !form.telephone.trim()) {
            onSuccess?.('Erreur : veuillez remplir les champs obligatoires')
            return
        }
        setLoading(true)
        const { error } = await supabase
            .from('clients')
            .update(form)
            .eq('id', client.id)

        setLoading(false)

        if (error) {
            console.error('Erreur modification client:', error)
            onSuccess?.('Erreur lors de la modification')
        } else {
            onSuccess?.('Client modifié avec succès')
            onClose()
        }
    }

    return (
        <Dialog open={!!client} onClose={onClose} maxWidth="sm" fullWidth>
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
                <Button onClick={handleUpdate} variant="contained" disabled={loading}>
                    {loading ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
