'use client'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
} from '@mui/material'
import { useState } from 'react'

interface Props {
    open: boolean
    onClose: () => void
    onSave: (data: { title: string; content: string }) => void
}

export default function RHEditorModal({ open, onClose, onSave }: Props) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSave = () => {
        if (!title.trim() || !content.trim()) return
        onSave({ title, content })
        setTitle('')
        setContent('')
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Nouvel article RH</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField
                        label="Titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Contenu"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        fullWidth
                        multiline
                        rows={6}
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
