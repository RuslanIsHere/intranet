import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export const useAuth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const switchToRegistration = () => {
        setError('');
        setIsLogin(false);
    };

    const switchToLogin = () => {
        setError('');
        setIsLogin(true);
    };

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        console.log('Connecté avec succès');

        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            window.location.href = '/';
        } else {
            setError('Impossible de récupérer la session. Veuillez réessayer.');
        }

        setLoading(false);
    };

    const handleRegistration = async () => {
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            setLoading(false);
            return;
        }

        try {
            const { data: { user }, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                if (error.message.includes('already registered')) {
                    setError('Cet utilisateur existe déjà.');
                } else {
                    setError("Erreur lors de l'inscription : " + error.message);
                }
                setLoading(false);
                return;
            }

            if (user) {
                const { error: profileError } = await supabase.from('profiles').insert([{
                    id: user.id,
                    email: user.email,
                    full_name: username,
                    roles: ['user'],
                    avatar_url: null,
                }]);

                if (profileError) {
                    console.error('Erreur lors de la sauvegarde du profil :', profileError);
                    setError("Inscription réussie, mais impossible d'enregistrer le profil.");
                } else {
                    console.log('Profil enregistré');
                    window.location.href = '/';
                }
            }
        } catch (err) {
            console.error("Erreur d'inscription :", err);
            setError("Impossible de finaliser l'inscription. Veuillez réessayer plus tard.");
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        username,
        setUsername,
        error,
        isLogin,
        loading,
        switchToRegistration,
        switchToLogin,
        handleLogin,
        handleRegistration,
    };
};
