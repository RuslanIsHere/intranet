'use client'

import { Box, Typography, Divider, Button } from '@mui/material'
import RHList from '@/components/rh/RHList'
import RHEditorModal from '@/components/rh/RHEditorModal'
import { useUserContext } from '@/context/UserContext'
import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'

export const RHSection=()=> {
    const { profile } = useUserContext()
    const [open, setOpen] = useState(false)

    const handleSave = async ({ title, content }: { title: string; content: string }) => {
        const { error } = await supabase.from('rh').insert({
            title,
            content,
            added_by: profile?.id,
        })

        if (error) {
            console.error('Erreur ajout RH:', error)
        } else {
            location.reload()
        }
    }

    return (
        <Box px={{ xs: 2, sm: 4 }} py={4}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Ressources Humaines
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {profile?.roles?.includes('admin') && (
                <Box mb={3}>
                    <Button variant="contained" onClick={() => setOpen(true)}>
                        Ajouter un article
                    </Button>
                </Box>
            )}

            <RHList />

            <RHEditorModal open={open} onClose={() => setOpen(false)} onSave={handleSave} />
        </Box>
    )
}
