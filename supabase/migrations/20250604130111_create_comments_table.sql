create table comments (
    id uuid primary key default gen_random_uuid(),
    project_id bigint not null references projects(id) on delete cascade,
    author_id uuid references profiles(id) on delete set null,
    content text not null,
    created_at timestamp with time zone default timezone('utc', now())
);
