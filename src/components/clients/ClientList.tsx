'use client'

import { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Client } from '@/types/database'
import ClientModal from './ClientModal'
import { supabase } from '@/utils/supabase/client'
import { useUserContext } from '@/context/UserContext'
import ClientToolbar from './ClientToolbar'

export default function ClientList() {
    const [clients, setClients] = useState<Client[]>([])
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)
    const [confirmDelete, setConfirmDelete] = useState<Client | null>(null)
    const [search, setSearch] = useState('')

    const { profile } = useUserContext()
    const isAdmin = profile?.roles?.includes('admin')

    const columns = [
        { key: 'nom', label: 'Nom' },
        { key: 'email', label: 'Email' },
        { key: 'telephone', label: 'Téléphone' },
        { key: 'adresse', label: 'Adresse' },
        ...(isAdmin ? [{ key: 'actions', label: 'Actions' }] : []),
    ]

    const filteredClients = clients.filter((c) =>
        c.nom?.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = async () => {
        const { data, error } = await supabase.from('clients').select('*')
        if (data) setClients(data)
        if (error) console.error('Erreur chargement clients:', error)
    }

    const handleDelete = async () => {
        if (!confirmDelete) return
        await supabase.from('clients').delete().eq('id', confirmDelete.id)
        setConfirmDelete(null)
        fetchClients()
    }

    return (
        <Box>
            <ClientToolbar
                search={search}
                setSearch={setSearch}
                onAdd={() => setSelectedClient({} as Client)}
            />

            <Paper
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    overflowX: 'auto',
                }}
            >
                <Table sx={{ minWidth: 400 }} size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key}
                                    sx={{
                                        fontWeight: 'bold',
                                        textAlign: col.key === 'actions' ? 'right' : 'left',
                                    }}
                                >
                                    {col.label.toUpperCase()}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredClients.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell>{client.nom}</TableCell>
                                <TableCell>{client.email || '-'}</TableCell>
                                <TableCell>{client.telephone || '-'}</TableCell>
                                <TableCell>{client.adresse || '-'}</TableCell>
                                {isAdmin && (
                                    <TableCell align="right">
                                        <IconButton onClick={() => setSelectedClient(client)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => setConfirmDelete(client)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/* Модалки и диалоги */}
            <ClientModal client={selectedClient} onClose={() => {
                setSelectedClient(null)
                fetchClients()
            }} />

            <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
                <DialogTitle>Supprimer ce client ?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(null)}>Annuler</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
