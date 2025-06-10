'use client'

import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { useUserContext } from '@/context/UserContext'
import type { Comment } from '@/types/database'

export default function ProjectComments({ projectId }: { projectId: number }) {
    const { profile } = useUserContext()
    const [comments, setComments] = useState<Comment[]>([])
    const [content, setContent] = useState('')
    const [posting, setPosting] = useState(false)

    useEffect(() => {
        const fetchComments = async () => {
            const { data } = await supabase
                .from('comments')
                .select('*')
                .eq('project_id', projectId)
                .order('created_at', { ascending: false })

            if (data) setComments(data)
        }

        fetchComments()
    }, [projectId])

    const handleSubmit = async () => {
        if (!content.trim() || !profile?.id) return
        setPosting(true)

        const { data, error } = await supabase
            .from('comments')
            .insert({
                project_id: projectId,
                content,
                author_id: profile.id,
            })
            .select('*')
            .single()

        if (!error && data) {
            setComments((prev) => [data, ...prev])
            setContent('')
        }

        setPosting(false)
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100%"
            sx={{ minHeight: 0 }}
        >
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Commentaires
            </Typography>


            <Box sx={{ flexShrink: 0, mb: 2 }}>
                <Stack spacing={2}>
                    <TextField
                        label="Ajouter un commentaire"
                        value={content}
                        multiline
                        minRows={2}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSubmit} disabled={posting}>
                        {posting ? 'Envoi...' : 'Envoyer'}
                    </Button>
                </Stack>
            </Box>


            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    pr: 1,
                    minHeight: 0,
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '3px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#c1c1c1',
                        borderRadius: '3px',
                        '&:hover': {
                            background: '#a1a1a1',
                        },
                    },
                }}
            >
                {comments.map((c) => (
                    <Box key={c.id} mb={2} p={2} bgcolor="#f9f9f9" borderRadius={2}>
                        <Typography variant="body2" fontWeight="bold">
                            {profile?.full_name || profile?.email || 'Utilisateur'}
                        </Typography>
                        <Typography variant="body2" mb={1}>
                            {c.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(c.created_at).toLocaleString('fr-FR')}
                        </Typography>
                    </Box>
                ))}

                {comments.length === 0 && (
                    <Typography variant="body2" color="text.secondary" textAlign="center" mt={4}>
                        Aucun commentaire pour le moment
                    </Typography>
                )}
            </Box>
        </Box>
    )
}