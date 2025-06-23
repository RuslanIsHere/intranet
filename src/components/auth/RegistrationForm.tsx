import React, { useEffect, useRef } from 'react'
import {TextField, Button, Typography, Container, Box, List, ListItem, ListItemText, Collapse} from '@mui/material'

interface Props {
    form: {
        email: string
        username: string
        password: string
        confirmPassword: string
    }
    setForm: React.Dispatch<React.SetStateAction<Props['form']>>
    error: string
    onSubmit: () => void
    onSwitchToLogin: () => void
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

const RegistrationForm: React.FC<Props> = ({form, setForm, error, onSubmit, onSwitchToLogin,}) => {
    const emailRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    const passwordErrors = getPasswordErrors(form.password)
    const passwordValid = passwordErrors.length === 0
    const passwordsMatch = form.password === form.confirmPassword

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }))
    }

    return (
        <Container maxWidth="sm">
            <Box mt={8} component="form" onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
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
                    value={form.email}
                    onChange={handleChange('email')}
                    required
                />
                <TextField
                    label="Nom d'utilisateur"
                    fullWidth
                    margin="normal"
                    value={form.username}
                    onChange={handleChange('username')}
                    required
                />
                <TextField
                    label="Mot de passe"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={form.password}
                    onChange={handleChange('password')}
                    color={passwordValid ? 'success' : undefined}
                    required
                />
                <Collapse in={!passwordValid && form.password.length > 0}>
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
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    error={!!form.confirmPassword && !passwordsMatch}
                    helperText={!passwordsMatch && form.confirmPassword ? 'Les mots de passe ne correspondent pas' : ''}
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
                        disabled={!passwordValid || !passwordsMatch}
                    >
                        S&apos;inscrire
                    </Button>
                </Box>
                <Box mt={2}>
                    <Button variant="text" color="primary" fullWidth onClick={onSwitchToLogin}>
                        Se connecter
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default RegistrationForm
