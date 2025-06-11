import React, { useEffect, useRef } from 'react'
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    List,
    ListItem,
    ListItemText,
    Collapse,
} from '@mui/material'

interface RegistrationFormProps {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    confirmPassword: string
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    error: string
    handleRegistration: () => void
    switchToLogin: () => void
}

const getPasswordErrors = (password: string): string[] => {
    const errors = []
    if (password.length < 10) errors.push('Au moins 10 caractères')
    if (!/[a-z]/.test(password)) errors.push('Une lettre minuscule')
    if (!/[A-Z]/.test(password)) errors.push('Une lettre majuscule')
    if (!/[0-9]/.test(password)) errors.push('Un chiffre')
    if (!/[^A-Za-z0-9]/.test(password)) errors.push('Un symbole spécial')
    return errors
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
                                                               email,
                                                               setEmail,
                                                               password,
                                                               setPassword,
                                                               confirmPassword,
                                                               setConfirmPassword,
                                                               username,
                                                               setUsername,
                                                               error,
                                                               handleRegistration,
                                                               switchToLogin,
                                                           }) => {
    const emailRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    const passwordErrors = getPasswordErrors(password)
    const passwordValid = passwordErrors.length === 0
    const passwordsMatch = password === confirmPassword

    return (
        <Container maxWidth="sm">
            <Box mt={8}     component="form"
                 onSubmit={(e) => {
                     e.preventDefault()
                     handleRegistration()
                 }}>
                <Typography variant="h4" gutterBottom>
                    Création de compte
                </Typography>

                <TextField
                    inputRef={emailRef}
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Nom d'utilisateur"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Mot de passe"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    color={passwordValid ? 'success' : undefined}
                    required
                />


                <Collapse in={!passwordValid && password.length > 0}>
                    <Box ml={1} mt={1}>
                        <Typography variant="caption" color="error">
                            Le mot de passe doit contenir :
                        </Typography>
                        <List dense disablePadding>
                            {passwordErrors.map((err) => (
                                <ListItem key={err} sx={{ pl: 2 }}>
                                    <ListItemText primary={`• ${err}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Collapse>

                <TextField
                    label="Confirmer le mot de passe"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!confirmPassword && !passwordsMatch}
                    helperText={
                        !!confirmPassword && !passwordsMatch
                            ? 'Les mots de passe ne correspondent pas'
                            : ''
                    }
                    disabled={!passwordValid}
                    color={passwordValid ? 'success' : undefined}
                    required
                />

                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}

                <Box mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleRegistration}
                        disabled={!passwordValid || !passwordsMatch}
                    >
                        S&apos;inscrire
                    </Button>
                </Box>

                <Box mt={2}>
                    <Button variant="text" color="primary" fullWidth onClick={switchToLogin}>
                        Se connecter
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default RegistrationForm
