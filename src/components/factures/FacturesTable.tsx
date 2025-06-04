'use client'

import {
    Container,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Box,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import DoneIcon from '@mui/icons-material/Done'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import { useFactures } from '@/utils/hooks/useFactures'

const statusColorMap = {
    'payée': 'success',
    'envoyée': 'info',
    'en attente': 'warning',
} as const

const statusIconMap = {
    'payée': <DoneIcon fontSize="small" />,
    'envoyée': <SendIcon fontSize="small" />,
    'en attente': <HourglassEmptyIcon fontSize="small" />,
} as const

const formatEuro = (value: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)

const getRowColor = (status: string) => {
    switch (status) {
        case 'payée':
            return 'rgba(76, 175, 80, 0.05)'
        case 'en attente':
            return 'rgba(255, 193, 7, 0.05)'
        case 'envoyée':
            return 'rgba(33, 150, 243, 0.05)'
        default:
            return undefined
    }
}

type SortField = 'montant' | 'date_emission' | 'status'
type SortDirection = 'asc' | 'desc'

export default function FacturesTable() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const { factures } = useFactures()
    const [sortField, setSortField] = useState<SortField>('date_emission')
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

    const handleSortChange = (e: SelectChangeEvent) => {
        const value = e.target.value as `${SortField}-${SortDirection}`
        const [field, dir] = value.split('-') as [SortField, SortDirection]
        setSortField(field)
        setSortDirection(dir)
    }

    const sortedFactures = [...factures].sort((a, b) => {
        const aVal = a[sortField]
        const bVal = b[sortField]

        if (aVal == null) return 1
        if (bVal == null) return -1

        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
        }

        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return sortDirection === 'asc'
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal)
        }

        return 0
    })

    return (
        <Container sx={{ mt: 4 }}>
            <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ borderBottom: '2px solid', borderColor: 'divider', pb: 1, mb: 2 }}
            >
                🧾 Liste des factures
            </Typography>

            <Box display="flex" justifyContent="flex-end" mb={2}>
                <FormControl size="small">
                    <InputLabel id="sort-label">Trier par</InputLabel>
                    <Select
                        labelId="sort-label"
                        value={`${sortField}-${sortDirection}`}
                        onChange={handleSortChange}
                        label="Trier par"
                    >
                        <MenuItem value="montant-asc">Montant ↑</MenuItem>
                        <MenuItem value="montant-desc">Montant ↓</MenuItem>
                        <MenuItem value="date_emission-asc">Émise le ↑</MenuItem>
                        <MenuItem value="date_emission-desc">Émise le ↓</MenuItem>
                        <MenuItem value="status-asc">Statut A→Z</MenuItem>
                        <MenuItem value="status-desc">Statut Z→A</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Paper sx={{ width: '100%', overflowX: 'auto' }}>
                <Box sx={{ minWidth: 400 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: 'background.paper', position: 'sticky', top: 0, zIndex: 1 }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Projet</TableCell>
                                {!isMobile && (
                                    <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Client</TableCell>
                                )}
                                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Montant</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Statut</TableCell>
                                {!isMobile && (
                                    <>
                                        <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Émise le</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Payée le</TableCell>
                                    </>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedFactures.map((facture) => (
                                <TableRow
                                    key={facture.id}
                                    hover
                                    sx={{
                                        backgroundColor: getRowColor(facture.status),
                                        '&:not(:last-of-type)': {
                                            borderBottom: '1px solid',
                                            borderColor: 'divider',
                                        },
                                    }}
                                >
                                    <TableCell>{facture.project_nom}</TableCell>
                                    {!isMobile && <TableCell>{facture.client_nom}</TableCell>}
                                    <TableCell>{facture.montant != null ? formatEuro(facture.montant) : '-'}</TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={statusIconMap[facture.status]}
                                            label={facture.status}
                                            color={statusColorMap[facture.status]}
                                            size="small"
                                        />
                                    </TableCell>
                                    {!isMobile && (
                                        <>
                                            <TableCell>{new Date(facture.date_emission).toLocaleDateString('fr-FR')}</TableCell>
                                            <TableCell>
                                                {facture.date_paiement
                                                    ? new Date(facture.date_paiement).toLocaleDateString('fr-FR')
                                                    : '-'}
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Paper>
        </Container>
    )
}
