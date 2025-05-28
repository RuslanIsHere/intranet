drop type if exists project_status cascade;
create type project_status as enum ('active', 'archived');

create table clients (
    id serial primary key,
    nom text not null
);

create table business_units (
    id serial primary key,
    nom text not null
);

create table projects (
    id serial primary key,
    nom text,
    client_id integer  references clients(id),
    capitaine_id uuid  references profiles(id),
    business_unit_id integer references business_units(id),
    status project_status not null default 'active',
    budget_prevu numeric,
    budget_reel numeric,
    revenu_cible numeric,
    marge_prevue numeric,
    created_at timestamp with time zone default timezone('utc', now())
);
