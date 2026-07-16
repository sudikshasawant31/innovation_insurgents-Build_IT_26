create table if not exists resources (
  id uuid primary key default gen_random_uuid(), name text not null, quantity text not null, status text not null default 'Available', location text, category text, created_at timestamptz not null default now()
);
create table if not exists survivors (
  id uuid primary key default gen_random_uuid(), name text not null, status text not null default 'Safe', skill text, location text, phone text, verified boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists capsules (
  id uuid primary key default gen_random_uuid(), title text not null, category text, priority text, location text, description text, resources text, people integer, confidence numeric default 0, created_at timestamptz not null default now()
);
alter table resources enable row level security;
alter table survivors enable row level security;
alter table capsules enable row level security;
create policy "public read resources" on resources for select using (true);
create policy "public read survivors" on survivors for select using (true);
create policy "public read capsules" on capsules for select using (true);
