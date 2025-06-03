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
                minHeight: { xs: 400, md: 500, lg: 600 },
                backgroundImage: 'url(/cover-dashboard.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 4,
            }}
        >
            {/* затемнение */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 0,
                }}
            />

            {/* контент */}
            <Container
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    px: 2,
                }}
            >
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    color="white"
                    gutterBottom
                    sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
                >
                    Bonjour, {profile?.full_name || '...'} !
                </Typography>

                <Typography
                    variant="h6"
                    color="white"
                    sx={{ maxWidth: 800, mx: 'auto', mb: 2 }}
                >
                    Bienvenue dans votre espace personnel. Vous trouverez ici toutes les
                    informations liées à votre activité au sein de l’entreprise.
                </Typography>

                <Typography
                    variant="body1"
                    color="white"
                    sx={{ maxWidth: 700, mx: 'auto' }}
                >
                    N'hésitez pas à explorer les différentes sections du portail pour découvrir
                    l’ensemble des fonctionnalités disponibles.
                </Typography>
            </Container>
        </Box>
    )
}
