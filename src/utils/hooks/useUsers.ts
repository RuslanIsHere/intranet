import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import type { Profile } from '@/types/database';

export function useUsers() {
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('profiles').select('*');

            if (error) {
                setError(error);
            } else {
                setUsers(data || []);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
}
