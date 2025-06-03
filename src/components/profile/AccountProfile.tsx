'use client'

import { useEffect, useState } from 'react'
import {
    TextField,
    Button,
    Box,
    Typography,
    Stack,
    Paper,
    Divider, Avatar
} from '@mui/material'
import { useUserContext } from '@/context/UserContext'
import { supabase } from '@/utils/supabase/client'

export default function AccountProfile() {
    const { profile, setProfile } = useUserContext()
    const [telephone, setTelephone] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    useEffect(() => {
        if (profile?.telephone) {
            setTelephone(profile.telephone)
        }
    }, [profile])

    const handleSave = async () => {
        if (!profile) return

        setLoading(true)
        setMessage(null)

        const { error } = await supabase
            .from('profiles')
            .update({ telephone })
            .eq('id', profile.id)

        if (error) {
            setMessage('❌ Erreur lors de la mise à jour.')
        } else {
            setMessage('✅ Téléphone mis à jour.')
            setProfile?.({ ...profile, telephone })
        }

        setLoading(false)
    }

    if (!profile) {
        return (
            <Box maxWidth="sm" mx="auto" mt={4}>
                <Typography variant="body1">Chargement du profil...</Typography>
            </Box>
        )
    }

    return (
        <Box maxWidth="md" mx="auto" mt={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant="h5" gutterBottom>
                        Mon profil
                    </Typography>
                    <Avatar
                        alt="Remy Sharp"
                        src="avatar.jpg"
                        sx={{ width: 150, height: 150, border: 'black' }}
                    />
                </Box>
                {profile.roles && (
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Rôles : {profile.roles.join(', ')}
                    </Typography>
                )}

                <Divider sx={{ my: 2 }} />

                <Stack spacing={3}>
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Votre nom :
                        </Typography>
                        <TextField value={profile.full_name || ''} fullWidth disabled />
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Votre email :
                        </Typography>
                        <TextField value={profile.email} fullWidth disabled />
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Votre téléphone :
                        </Typography>
                        <TextField
                            type="tel"
                            placeholder="+33 6 12 34 56 78"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            fullWidth
                            inputProps={{
                                maxLength: 20,
                                inputMode: 'tel',
                                'aria-label': 'Numéro de téléphone',
                            }}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={loading}
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>

                    {message && (
                        <Typography variant="body2" color="text.secondary">
                            {message}
                        </Typography>
                    )}
                </Stack>
            </Paper>
        </Box>
    )
}
