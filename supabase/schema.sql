create extension if not exists pgcrypto;

create table if not exists public.records (
  id uuid primary key default gen_random_uuid(),
  module text not null check (module in (
    'exames','leads-otica','leads-clinica','comissoes','pastores','crediarios'
  )),
  payload jsonb not null default '{}'::jsonb,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists records_module_created_idx
  on public.records (module, created_at desc);

create table if not exists public.team_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','admin','member')),
  created_at timestamptz not null default now()
);

create index if not exists team_members_role_idx on public.team_members (role);

alter table public.records enable row level security;
alter table public.team_members enable row level security;
revoke all on table public.records from anon, authenticated;
revoke all on table public.team_members from anon, authenticated;
grant select, insert, update, delete on table public.records to authenticated;
grant select on table public.team_members to authenticated;

create policy "members can view own role" on public.team_members
  for select to authenticated using (user_id = (select auth.uid()));

create policy "authorized team can read records" on public.records
  for select to authenticated using (
    exists (select 1 from public.team_members m where m.user_id = (select auth.uid()))
  );
create policy "authorized team can create records" on public.records
  for insert to authenticated with check (
    created_by = (select auth.uid()) and
    exists (select 1 from public.team_members m where m.user_id = (select auth.uid()))
  );
create policy "authorized team can update records" on public.records
  for update to authenticated
  using (exists (select 1 from public.team_members m where m.user_id = (select auth.uid())))
  with check (exists (select 1 from public.team_members m where m.user_id = (select auth.uid())));
create policy "admins can delete records" on public.records
  for delete to authenticated using (
    exists (
      select 1 from public.team_members m
      where m.user_id = (select auth.uid()) and m.role in ('owner','admin')
    )
  );

-- Envia INSERT, UPDATE e DELETE para os usuários conectados ao painel.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'records'
  ) then
    alter publication supabase_realtime add table public.records;
  end if;
end $$;
