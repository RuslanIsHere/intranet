create table factures (
    id uuid primary key default gen_random_uuid(),
    project_id bigint references projects(id) on delete cascade,
    client_id bigint references clients(id) on delete set null,
    montant numeric,
    status text check (status in ('envoyée', 'payée', 'en attente')) default 'en attente',
    date_emission date not null default current_date,
    date_paiement date,
    created_at timestamp with time zone default now()
);
create table equipes (
    id uuid primary key default gen_random_uuid(),
    project_id bigint references projects(id) on delete cascade,
    member_id uuid references profiles(id) on delete cascade,
    created_at timestamp with time zone default now()
);
