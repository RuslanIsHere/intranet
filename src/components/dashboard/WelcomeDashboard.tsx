'use client'

import { Box, Container, Typography, CardContent } from '@mui/material'
import { useUserContext } from '@/context/UserContext'
import { useProjects } from '@/utils/hooks/useProjects'
import { useClients } from '@/utils/hooks/useClients'
import { useUsers } from '@/utils/hooks/useUsers'

export default function DashboardWelcome() {
    const { profile } = useUserContext()
    const { projects } = useProjects()
    const { clients } = useClients()
    const { users } = useUsers()

    return (
        <Box sx={{ mb: 4 }}>
            {/* Hero section */}
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
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 0,
                    }}
                />
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

            {/* Stats cards with background images */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                >
                    <StatCard
                        image="/stat-projects.jpg"
                        count={projects.length}
                        label="Projets actifs"
                    />
                    <StatCard
                        image="/stat-users.jpg"
                        count={users.length}
                        label="Employés"
                    />
                    <StatCard
                        image="/stat-clients.jpg"
                        count={clients.length}
                        label="Clients"
                    />
                </Box>
        </Box>
    )
}

function StatCard({
                      image,
                      count,
                      label,
                  }: {
    image: string
    count: number
    label: string
}) {
    return (
        <Box
            sx={{
                flex: 1,
                minHeight: 250,
                borderRadius: 2,
                overflow: 'hidden',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.4)',
                    zIndex: 0,
                }}
            />
            <CardContent
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    {count}
                </Typography>
                <Typography>{label}</Typography>
            </CardContent>
        </Box>
    )
}
