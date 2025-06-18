'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Facture } from '@/types/database'

export interface FactureDisplay extends Facture {
    project_nom: string | null
    client_nom: string | null
}

interface FactureRowRaw extends Facture {
    projects: { nom: string | null }
    clients: { nom: string | null }
}

export function useFactures() {
    const [factures, setFactures] = useState<FactureDisplay[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetch = async () => {
            const { data, error } = await supabase
                .from('factures')
                .select(`
                    id,
                    project_id,
                    client_id,
                    montant,
                    status,
                    date_emission,
                    date_paiement,
                    created_at,
                    projects!project_id ( nom ),
                    clients!client_id ( nom )
                `)
                .order('date_emission', { ascending: false })

            if (error) {
                console.error('Erreur:', error)
                setError(error.message)
                return
            }

            const rows = data as unknown as FactureRowRaw[]

            const cleaned: FactureDisplay[] = rows.map((f) => ({
                ...f,
                project_nom: f.projects?.nom ?? null,
                client_nom: f.clients?.nom ?? null,
            }))

            setFactures(cleaned)
            setError(null)
        }

        fetch()
    }, [])

    return { factures, error }
}
