create table if not exists public.municipalities (
  id text primary key,
  slug text not null unique,
  region text not null,
  prefecture text not null,
  municipality text not null,
  "programName" text not null,
  type text not null default 'その他',
  summary text not null default '',
  price text not null default '要確認',
  "priceNumber" integer,
  status text not null default '要確認',
  target text not null default '',
  benefits text[] not null default '{}',
  "benefitCategories" text[] not null default '{}',
  "benefitConditions" text not null default '公式ページをご確認ください。',
  "applicationMethod" text not null default '公式ページよりご確認ください。',
  "officialUrl" text not null default '',
  "relatedUrl" text,
  "imageUrl" text,
  "lastChecked" date,
  notes text not null default '',
  "isOfficialInfo" boolean not null default false,
  "isFeatured" boolean not null default false,
  "createdAt" date,
  "updatedAt" date
);

create index if not exists municipalities_prefecture_idx on public.municipalities (prefecture);
create index if not exists municipalities_region_idx on public.municipalities (region);
create index if not exists municipalities_status_idx on public.municipalities (status);
create index if not exists municipalities_type_idx on public.municipalities (type);

alter table public.municipalities enable row level security;

drop policy if exists "Allow public read municipalities" on public.municipalities;
create policy "Allow public read municipalities"
  on public.municipalities
  for select
  using (true);
