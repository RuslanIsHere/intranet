import React from 'react'
import { TextField, Button, Typography, Container, Box } from '@mui/material'

interface AuthFormProps {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    error: string
    handleLogin: () => void
    switchToRegistration: () => void
}

const AuthForm: React.FC<AuthFormProps> = ({ email, setEmail, password, setPassword, error, handleLogin, switchToRegistration }) => {
    return (
        <Container maxWidth="sm">
            <Box mt={8}>
                <Typography variant="h4" gutterBottom>
                    Connexion
                </Typography>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Mot de passe"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                <Box mt={2}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                        Se connecter
                    </Button>
                </Box>
                <Box mt={2}>
                    <Button variant="text" color="primary" fullWidth onClick={switchToRegistration}>
                        Créer un compte
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default AuthForm
