'use client'

import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    CircularProgress,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import type { Comment } from '@/types/database'

export interface CommentWithAuthor extends Comment {
    profiles?: {
        full_name: string | null
        email: string
    } | null
}

interface RawCommentWithAuthor extends Comment {
    profiles: {
        full_name: string | null
        email: string
    }[] | null
}

export default function ProjectComments({ projectId }: { projectId: number }) {
    const [comments, setComments] = useState<CommentWithAuthor[]>([])
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)
    const [posting, setPosting] = useState(false)

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('comments')
                .select(`
          id,
          project_id,
          content,
          created_at,
          author_id,
          profiles (
            full_name,
            email
          )
        `)
                .eq('project_id', projectId)
                .order('created_at', { ascending: false })

            if (!error && data) {
                const cleaned: CommentWithAuthor[] = (data as RawCommentWithAuthor[]).map((item) => ({
                    ...item,
                    profiles: item.profiles?.[0] || null,
                }))
                setComments(cleaned)
            }
            setLoading(false)
        }

        fetchComments()
    }, [projectId])

    const handleSubmit = async () => {
        if (!content.trim()) return
        setPosting(true)

        const { data, error } = await supabase
            .from('comments')
            .insert({ project_id: projectId, content })
            .select(`
        id,
        project_id,
        content,
        created_at,
        author_id,
        profiles (
          full_name,
          email
        )
      `)
            .single()

        if (!error && data) {
            const newComment: CommentWithAuthor = {
                ...data,
                profiles: (data.profiles as RawCommentWithAuthor['profiles'])?.[0] || null,
            }
            setComments((prev) => [newComment, ...prev])
            setContent('')
        }

        setPosting(false)
    }

    return (
        <Box>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Commentaires
            </Typography>

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

            {loading ? (
                <Box mt={4} textAlign="center">
                    <CircularProgress />
                </Box>
            ) : (
                <Box mt={3}>
                    {comments.map((c) => (
                        <Box key={c.id} mb={2} p={2} bgcolor="#f9f9f9" borderRadius={2}>
                            <Typography variant="body2" fontWeight="bold">
                                {c.profiles?.full_name || c.profiles?.email || 'Utilisateur'}
                            </Typography>
                            <Typography variant="body2" mb={1}>
                                {c.content}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {new Date(c.created_at).toLocaleString('fr-FR')}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}
