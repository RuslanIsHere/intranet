import React from 'react'
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Paper,
} from '@mui/material'
import Image from 'next/image'

interface AuthFormProps {
    form: {
        email: string
        password: string
    }
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string
    onSubmit: () => void
    onSwitchToRegister: () => void
}

const AuthForm: React.FC<AuthFormProps> = ({
                                               form,
                                               onChange,
                                               error,
                                               onSubmit,
                                               onSwitchToRegister,
                                           }) => {
    return (
        <Container maxWidth="sm">
            <Box mt={8} display="flex" flexDirection="column" alignItems="center" >
                {/* Logo */}
                <Image src={'/logo.svg'} alt="Logo" width={80} height={80} />

                {/* Titre de bienvenue */}
                <Typography variant="h5" mt={2} gutterBottom>
                    Bienvenue sur la page de connexion
                </Typography>

                {/* Carte/boîte avec ombre pour contenir le formulaire */}
                <Paper elevation={3} sx={{ p: 4, mt: 2, width: '100%', borderRadius: 2 }}>
                    <Box
                        component="form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            onSubmit()
                        }}
                    >
                        {/* Champ Email */}
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={form.email}
                            onChange={onChange}
                            autoFocus
                            required
                        />

                        {/* Champ Mot de passe */}
                        <TextField
                            name="password"
                            label="Mot de passe"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={form.password}
                            onChange={onChange}
                            required
                        />

                        {/* Message d’erreur affiché sous les champs */}
                        {error && (
                            <Typography color="error" variant="body2" mt={1}>
                                {error}
                            </Typography>
                        )}

                        {/* Bouton pour se connecter */}
                        <Box mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ borderRadius: 2 }}
                            >
                                Se connecter
                            </Button>
                        </Box>

                        {/* Lien vers l'inscription */}
                        <Box mt={2}>
                            <Button
                                variant="text"
                                color="primary"
                                fullWidth
                                onClick={onSwitchToRegister}
                            >
                                Créer un compte
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}

export default AuthForm
