'use client'

import { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
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
import { supabase } from '@/utils/supabase/client'
import { useUserContext } from '@/context/UserContext'
import ClientToolbar from './ClientToolbar'
import CreateClientModal from './CreateClientModal'
import EditClientModal from './ClientModal'
import { SnackbarComponent } from '@/components/projects/SnackbarComponent'


export default function ClientList() {
    const [clients, setClients] = useState<Client[]>([])
    const [search, setSearch] = useState('')

    const [createOpen, setCreateOpen] = useState(false)
    const [editClient, setEditClient] = useState<Client | null>(null)
    const [confirmDelete, setConfirmDelete] = useState<Client | null>(null)

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')


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

    const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
        setSnackbarMessage(message)
        setSnackbarSeverity(severity)
        setSnackbarOpen(true)
    }


    const fetchClients = async () => {
        const { data, error } = await supabase.from('clients').select('*')
        if (data) setClients(data)
        if (error) console.error('Erreur chargement clients:', error)
    }

    const handleDelete = async () => {
        if (!confirmDelete) return

        const { error } = await supabase.from('clients').delete().eq('id', confirmDelete.id)

        if (error) {
            console.error('Erreur suppression:', error)
            showSnackbar('Erreur lors de la suppression', 'error')
        } else {
            showSnackbar('Client supprimé avec succès', 'success')
            fetchClients()
        }
        setConfirmDelete(null)
    }


    return (
        <Box>
            <ClientToolbar
                search={search}
                setSearch={setSearch}
                onAdd={() => setCreateOpen(true)}
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
                                        <IconButton onClick={() => setEditClient(client)}>
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

            <CreateClientModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onSuccess={(msg) => {
                    fetchClients()
                    showSnackbar(msg, msg.includes('Erreur') ? 'error' : 'success')
                }}
            />

            {editClient && (
                <EditClientModal
                    client={editClient}
                    onClose={() => setEditClient(null)}
                    onSuccess={(msg) => {
                        fetchClients()
                        showSnackbar(msg, msg.includes('Erreur') ? 'error' : 'success')
                    }}
                />
            )}


            <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
                <DialogTitle>Supprimer ce client ?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(null)}>Annuler</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
            <SnackbarComponent
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />

        </Box>
    )
}
