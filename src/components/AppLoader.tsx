'use client'

import { Box, CircularProgress } from '@mui/material'

export default function AppLoader() {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
            }}
        >
            <CircularProgress size={80} />
        </Box>
    )
}
