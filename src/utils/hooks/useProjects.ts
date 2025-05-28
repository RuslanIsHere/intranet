import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import type { Project, Client, BusinessUnit } from '@/types/database';

interface ProjectWithRelations extends Project {
    clients?: Client | null;
    business_units?: BusinessUnit | null;
}

export function useProjects() {
    const [projects, setProjects] = useState<ProjectWithRelations[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('projects')
                .select(`
                    *,
                    clients ( nom ),
                    business_units ( nom )
                `);

            if (error) {
                setError(error);
            } else {
                setProjects(data as ProjectWithRelations[]);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);

    return { projects, loading, error };
}
