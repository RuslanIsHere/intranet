import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import type { BusinessUnit } from '@/types/database';

export function useBusinessUnits() {
    const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBUs = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('business_units').select('*');

            if (error) {
                setError(error);
            } else {
                setBusinessUnits(data || []);
            }
            setLoading(false);
        };

        fetchBUs();
    }, []);

    return { businessUnits, loading, error };
}
