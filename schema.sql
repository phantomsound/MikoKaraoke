
-- MikoKaraoke database schema

create table if not exists signups (
  id bigserial primary key,
  name text not null,
  song text,
  artist text,
  contact text,
  created_at timestamptz default now()
);

create table if not exists now_playing (
  id int primary key default 1,
  name text,
  song text,
  artist text,
  started_at timestamptz
);

insert into now_playing (id) values (1)
on conflict (id) do nothing;

create table if not exists history (
  id bigserial primary key,
  name text,
  song text,
  artist text,
  finished_at timestamptz default now()
);
