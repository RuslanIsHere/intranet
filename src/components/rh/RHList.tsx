'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import {
    Box,
    Typography,
    Card,
    CardContent,
    Skeleton,
    Stack,
    IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'
import type { RHArticle } from '@/types/database'

interface ArticleWithAuthor extends RHArticle {
    profiles: {
        full_name: string | null
    } | null
}

export default function RHList() {
    const [articles, setArticles] = useState<ArticleWithAuthor[]>([])
    const [loading, setLoading] = useState(true)

    const fetchArticles = async () => {
        const { data, error } = await supabase
            .from('rh')
            .select(`
                id,
                title,
                content,
                created_at,
                added_by,
                profiles:profiles!added_by (
                    full_name
                )
            `)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Erreur chargement RH:', error)
        } else {
            const normalized = (data as any[]).map((item): ArticleWithAuthor => ({
                ...item,
                profiles: Array.isArray(item.profiles) ? item.profiles[0] || null : item.profiles,
            }))
            setArticles(normalized)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    const handleDelete = async (id: number) => {
        const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cet article ?')
        if (!confirmDelete) return

        const { error } = await supabase.from('rh').delete().eq('id', id)
        if (error) {
            console.error('Erreur suppression:', error)
        } else {
            setArticles(prev => prev.filter(item => item.id !== id))
        }
    }

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {loading &&
                Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={140} />
                ))}

            {articles.map((item) => (
                <Card key={item.id} variant="outlined">
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                {item.title}
                            </Typography>
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(item.id)}
                                title="Supprimer l’article"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Stack
                            direction="row"
                            spacing={2}
                            mb={2}
                            sx={{ color: 'text.secondary', fontSize: 13 }}
                        >
                            <span>{dayjs(item.created_at).format('DD MMM YYYY, HH:mm')}</span>
                            <span>
                                {item.profiles?.full_name
                                    ? `Ajouté par ${item.profiles.full_name}`
                                    : ''}
                            </span>
                        </Stack>

                        <Typography variant="body2" whiteSpace="pre-line">
                            {item.content}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}
