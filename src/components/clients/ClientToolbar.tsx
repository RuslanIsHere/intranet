'use client'

import { Box, Button, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useUserContext } from '@/context/UserContext'

interface ClientToolbarProps {
    search: string
    setSearch: (val: string) => void
    onAdd: () => void
}

export default function ClientToolbar({ search, setSearch, onAdd}: ClientToolbarProps) {
    const { profile, loading } = useUserContext()
    const isAdmin = profile?.roles?.includes('admin')

    return (
        <Box display="flex" alignItems="center" gap={2} mb={3}>
            <TextField
                label="Rechercher un client"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
            />
            {!loading && isAdmin && (
                <Button variant="contained" onClick={onAdd} startIcon={<AddIcon />}>
                    Ajouter
                </Button>
            )}
        </Box>
    )
}
