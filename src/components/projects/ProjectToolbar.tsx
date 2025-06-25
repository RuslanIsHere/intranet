'use client'

import { Box, Button, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useUserContext } from '@/context/UserContext' // или правильный путь

interface Props {
    search: string
    setSearch: (val: string) => void
    onAdd: () => void
}

export default function ProjectToolbar({ search, setSearch, onAdd }: Props) {
    const { profile } = useUserContext()

    const isAdmin = profile?.roles?.includes('admin')

    return (
        <Box display="flex" alignItems="center" gap={2} mb={3}>
            <TextField
                label="Rechercher un projet"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
            />
            {isAdmin && (
                <Button variant="contained" onClick={onAdd} startIcon={<AddIcon />}>
                    Ajouter
                </Button>
            )}
        </Box>
    )
}
