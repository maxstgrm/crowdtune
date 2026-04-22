# Supabase einrichten (Phase 2b – echte Multi-User-Partys)

Dauer: ca. 10 Minuten. Du brauchst nichts zu bezahlen, alles läuft auf dem kostenlosen Tier.

Was Supabase für Crowdtune macht:
- Speichert Partys mit ihrem Code und dem Gastgeber
- Speichert für jeden Gast seine Top-Tracks
- Schickt dem Handy automatisch ein Update, wenn jemand Neues beitritt („Live-Lobby")
- Ermöglicht am Ende echte Überschneidungs-Berechnung über alle Gäste

## Schritt 1 – Account anlegen

1. Gehe auf [supabase.com](https://supabase.com) und klicke oben rechts auf „Start your project".
2. Melde dich mit GitHub, Google oder E-Mail an (egal womit).
3. Du landest im Dashboard.

## Schritt 2 – Projekt erstellen

1. Klicke auf „New project".
2. Fülle aus:
   - **Organization**: lass die vorausgewählte stehen (Supabase legt automatisch eine an)
   - **Project name**: `crowdtune`
   - **Database Password**: Klicke auf „Generate a password" – Supabase macht ein sicheres für dich. Kopiere es einmal in eine Notiz, aber für das, was wir bauen, brauchst du es nicht weiter.
   - **Region**: die dir geografisch am nächsten ist (z. B. `Frankfurt (eu-central-1)` für Deutschland)
   - **Pricing Plan**: **Free**
3. „Create new project" klicken. Supabase richtet die DB ein – das dauert ca. 2 Minuten, lass den Tab offen.

## Schritt 3 – Datenbank-Schema anlegen

1. Sobald das Projekt fertig ist, klicke links in der Seitenleiste auf das Symbol für den **SQL Editor** (Symbol wie ein Dokument mit `>_`).
2. Oben auf „New query" / „+".
3. Kopiere den kompletten folgenden SQL-Block und füge ihn ein:

```sql
-- Crowdtune Schema (Phase 2b)
create table if not exists parties (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  emoji text default '🎉',
  host_id text not null,
  host_name text,
  created_at timestamptz default now()
);

create table if not exists party_members (
  id uuid primary key default gen_random_uuid(),
  party_id uuid references parties(id) on delete cascade,
  user_id text not null,
  display_name text,
  avatar_url text,
  service text default 'spotify',
  tracks jsonb default '[]'::jsonb,
  joined_at timestamptz default now(),
  unique (party_id, user_id)
);

create index if not exists idx_members_party on party_members(party_id);
create index if not exists idx_parties_code on parties(code);

-- Zugriff öffnen (Crowdtune läuft anonym, Partys sind per Code-Kenntnis zugänglich)
alter table parties enable row level security;
alter table party_members enable row level security;

drop policy if exists "parties_read" on parties;
drop policy if exists "parties_write" on parties;
drop policy if exists "members_read" on party_members;
drop policy if exists "members_write" on party_members;

create policy "parties_read"  on parties for select using (true);
create policy "parties_write" on parties for insert with check (true);
create policy "members_read"  on party_members for select using (true);
create policy "members_write" on party_members for insert with check (true);
create policy "members_update" on party_members for update using (true);

-- Realtime aktivieren, damit die Lobby live Updates bekommt
alter publication supabase_realtime add table party_members;
```

4. Unten rechts „Run" klicken. Du solltest grüne „Success"-Meldungen sehen.

## Schritt 4 – URL und Anon-Key holen

1. Klicke links in der Seitenleiste ganz unten auf das Zahnrad → „Project Settings".
2. Dort auf „API".
3. Kopiere zwei Werte:
   - **Project URL** – sieht aus wie `https://abcdefg.supabase.co`
   - **anon public** Key – langer String, beginnt mit `eyJ...` (ein JWT)

https://wbvlpxrgaxmsgkwghixk.supabase.co/rest/v1/

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidmxweHJnYXhtc2drd2doaXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NTIxNTQsImV4cCI6MjA5MjQyODE1NH0.WwQRnXd74uTDhvpWIr6rah12Q03oIovAnMPOJz9YZvQ


Beides brauchst du gleich in `config.js`.

## Schritt 5 – In die App eintragen

Öffne `config.js` im Crowdtune-Ordner. Die Datei sieht jetzt so aus:

```js
window.CROWDTUNE_CONFIG = {
  SPOTIFY_CLIENT_ID: "deine-spotify-id",
  SUPABASE_URL: "DEINE_SUPABASE_URL_HIER",
  SUPABASE_ANON_KEY: "DEIN_SUPABASE_ANON_KEY_HIER"
};
```

Trage die beiden Werte aus Schritt 4 ein (Anführungszeichen stehen lassen). Speichern.

## Schritt 6 – Deploy aktualisieren

Wie bei Spotify: Änderung nach GitHub committen (oder `npx vercel --prod`). Vercel deployed innerhalb einer Minute neu.

## Schritt 7 – Testen

1. Öffne die Crowdtune-URL auf deinem Handy **und** auf dem Computer (zwei verschiedene Browser/Geräte, damit du Multi-User simulieren kannst).
2. Auf dem Handy: mit Spotify einloggen, Party erstellen, Code notieren.
3. Auf dem Computer: mit einem zweiten Spotify-Account einloggen (oder dem gleichen, falls du nur einen hast – Supabase unterscheidet nur per User-ID, gleicher Account = eine Person), Party beitreten mit dem Code.
4. In der Lobby auf beiden Geräten: nach 1-2 Sekunden siehst du beide Avatare nebeneinander. Live.
5. „Mix generieren" – jetzt werden **echte** Überschneidungen zwischen euren Hör-Profilen berechnet.

## Was jetzt funktioniert

- Echte Party-Codes, die über Geräte hinweg gelten
- Live-Update der Lobby, sobald jemand beitritt (ohne Refresh)
- Echte Überschneidungs-Berechnung aus den Tracks aller Teilnehmenden
- Sortierung: Songs, die bei den meisten Leuten in den Top-Hörungen auftauchen, kommen ganz oben

## Was (noch) nicht funktioniert

- Wenn ein Gast offline geht, bleibt er in der Lobby – wir haben noch keinen „Leave"-Button (kommt, wenn du es willst)
- Der „Auf Spotify öffnen"-Button am Mix-Ende erzeugt noch keine fertige Playlist in deinem Account
- Apple Music ist weiterhin Mock (braucht separaten Developer-Account)

## Was kostet das?

Nichts. Das kostenlose Tier deckt:
- 500 MB Datenbank-Speicher (reicht für 10.000+ Partys)
- 50.000 Monthly Active Users
- 5 GB Datenverkehr/Monat
- Realtime inklusive

Erst wenn Crowdtune wirklich viral geht (mehrere tausend gleichzeitige Nutzer), musst du über den Pro-Plan nachdenken (25 USD/Monat). Bis dahin: gratis.

## Was wenn es nicht klappt?

**„Failed to fetch" / Netzwerkfehler in der Konsole beim Party-Erstellen:**
Wahrscheinlich sind `SUPABASE_URL` oder `SUPABASE_ANON_KEY` leer oder falsch. Prüfe `config.js` und dass Vercel das neue Deploy hat.

**„permission denied for table parties":**
Die SQL-Policies aus Schritt 3 sind nicht durchgelaufen. Öffne im Supabase-Dashboard „Authentication" → „Policies" und prüfe, ob bei `parties` und `party_members` jeweils Einträge existieren. Wenn nicht, SQL aus Schritt 3 nochmal ausführen.

**Lobby aktualisiert sich nicht live:**
Prüfe im Supabase-Dashboard unter „Database" → „Replication", ob `party_members` bei „Source: supabase_realtime" eingehakt ist. Wenn nicht, SQL-Zeile `alter publication supabase_realtime add table party_members;` nochmal ausführen.

**Ich habe nur einen Spotify-Account und will trotzdem testen:**
Funktioniert – öffne Crowdtune in zwei unterschiedlichen Browsern (z. B. Chrome und Safari) bzw. einmal normal und einmal im Inkognito-Modus. Beide loggen sich mit demselben Spotify-Account ein, aber du siehst trotzdem, dass Erstellen/Beitreten über Geräte klappt. Für echte Überschneidungs-Tests brauchst du zwei Accounts.

Sag Bescheid, wenn alles läuft – dann gehen wir an die nächsten Features (Playlist-Export nach Spotify, Apple Music, eigene Domain).
