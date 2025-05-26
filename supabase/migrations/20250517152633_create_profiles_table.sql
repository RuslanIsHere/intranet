create table public.profiles (
                                 id uuid primary key references auth.users(id) on delete cascade,
                                 email text unique,
                                 full_name text,
                                 roles text[],
                                 avatar_url text,
                                 created_at timestamp with time zone default timezone('utc'::text, now()),
                                 updated_at timestamp with time zone default timezone('utc'::text, now())
);
