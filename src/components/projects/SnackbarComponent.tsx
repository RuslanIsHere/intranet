// SnackbarComponent.tsx
import { Alert, Snackbar } from '@mui/material';

interface SnackbarComponentProps {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
    onClose: () => void;
}

export const SnackbarComponent = ({ open, message, severity, onClose }: SnackbarComponentProps) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
