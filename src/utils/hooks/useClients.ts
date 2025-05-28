import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import type { Client } from '@/types/database';

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('clients').select('*');

            if (error) {
                setError(error);
            } else {
                setClients(data || []);
            }
            setLoading(false);
        };

        fetchClients();
    }, []);

    return { clients, loading, error };
}
