create table documents (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    url text,
    project_id bigint references projects(id) on delete set null,
    uploaded_at timestamp with time zone default timezone('utc', now())
);
