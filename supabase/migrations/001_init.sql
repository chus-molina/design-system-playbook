-- Tabla de perfiles de usuario
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  role text not null default 'user' check (role in ('admin', 'user')),
  blocked boolean not null default false,
  created_at timestamptz not null default now()
);

-- Habilitar RLS
alter table public.profiles enable row level security;

-- Políticas: cada usuario ve su propio perfil
create policy "users_see_own_profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Admins ven todos los perfiles
create policy "admins_see_all_profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admins actualizan cualquier perfil
create policy "admins_update_profiles"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admins eliminan perfiles
create policy "admins_delete_profiles"
  on public.profiles for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Trigger: crear perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
