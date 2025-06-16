import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import type { Project, Client, BusinessUnit } from '@/types/database';

interface ProjectWithRelations extends Project {
    clients?: Client | null;
    business_units?: BusinessUnit | null;
    profiles?: { full_name: string | null } | null;
}

export function useProjects() {
    const [projects, setProjects] = useState<ProjectWithRelations[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select(`
                    *,
                    clients ( nom ),
                    business_units ( nom ), 
                    profiles:capitaine_id ( full_name )

                `);

            if (error) {
                setError(error);
            } else {
                setProjects(data as ProjectWithRelations[]);
            }
        };

        fetchProjects();
    }, []);

    return { projects, error };
}
