import React from 'react'
import { TextField, Button, Typography, Container, Box } from '@mui/material'

interface RegistrationFormProps {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    error: string
    handleRegistration: () => void
    switchToLogin: () => void
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ email, setEmail, password, setPassword, username, setUsername, error, handleRegistration, switchToLogin }) => {
    return (
        <Container maxWidth="sm">
            <Box mt={8}>
                <Typography variant="h4" gutterBottom>
                    Регистрация
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
                    label="Пароль"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Имя пользователя"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                <Box mt={2}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleRegistration}>
                        Зарегистрироваться
                    </Button>
                </Box>
                <Box mt={2}>
                    <Button variant="text" color="primary" fullWidth onClick={switchToLogin}>
                        Войти
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default RegistrationForm
