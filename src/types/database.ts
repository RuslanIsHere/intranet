export interface Project {
    id: number
    nom: string | null
    client_id: number | null
    capitaine_id: string | null
    business_unit_id: number | null
    status: string
    budget_prevu: number | null
    budget_reel: number | null
    revenu_cible: number | null
    marge_prevue: number | null
    created_at: string
}

export interface Client {
    id: number
    nom: string
}

export interface BusinessUnit {
    id: number
    nom: string
}

export interface Profile {
    id: string
    email: string
    full_name: string | null
    roles: string[] | null
    avatar_url: string | null
    created_at: string
    updated_at: string
}

export interface RHArticle {
    id: number
    title: string
    content: string
    added_by: string
    created_at: string
}
