import { Card, CardContent, Typography, Box } from '@mui/material'
import { grey, blue, green, orange } from '@mui/material/colors'

interface ProjectCardProps {
    project: {
        id: number
        nom: string | null
        status: string
        budget_prevu: number | null
        clients?: { nom: string | null } | null
        business_units?: { nom: string | null } | null
        onClick?: () => void
    }
}

const buColors: Record<string, string> = {
    'Immobilier': '#2196f3',      // blue
    'Architecture': '#66bb6a',    // green
    'Design & Build': '#ffa726',  // orange
    'Transverse': '#bdbdbd',      // grey
}


export default function ProjectCard({ project }: ProjectCardProps) {
    const isArchived = project.status === 'archived'
    const bu = project.business_units?.nom || 'Transverse'
    const borderColor = buColors[bu] || '#9e9e9e'

    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: '0.3s',
                borderLeft: `6px solid ${borderColor}`,
                backgroundColor: isArchived ? 'action.hover' : 'background.paper',
                '&:hover': {
                    boxShadow: 4,
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {project.nom || 'Sans nom'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Client: {project.clients?.nom || '—'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    BU: {project.business_units?.nom || '—'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Budget: {project.budget_prevu?.toLocaleString()} €
                </Typography>
                <Box mt={1}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: isArchived ? grey[600] : 'success.main',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                        }}
                    >
                        {project.status}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

