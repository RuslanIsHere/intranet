'use client'

import { Box, Container, Typography } from '@mui/material'
import { useUserContext } from '@/context/UserContext'

export default function DashboardWelcome() {
    const { profile } = useUserContext()

    return (
        <Box
            sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                height: { xs: 280, md: 360 },
                backgroundImage: 'url(/cover-dashboard.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mb: 4,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }}
            />

            <Container sx={{ position: 'relative', zIndex: 1, pt: 8 }}>
                <Typography variant="h4" fontWeight="bold" color="white" gutterBottom>
                    Bonjour, {profile?.full_name || '...'} !
                </Typography>
                <Typography variant="body1" color="white" paragraph>
                    Bienvenue dans votre espace personnel. Vous trouverez ici toutes les informations liées à votre activité au sein de l’entreprise.
                </Typography>
                <Typography variant="body2" color="white">
                    N'hésitez pas à explorer les différentes sections du portail pour découvrir l’ensemble des fonctionnalités disponibles.
                </Typography>
            </Container>
        </Box>
    )
}
