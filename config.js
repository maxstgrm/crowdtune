/**
 * Crowdtune – App-Konfiguration
 *
 * Trage hier deine Keys ein.
 *
 * SPOTIFY_CLIENT_ID
 *   Holst du dir unter: https://developer.spotify.com/dashboard
 *   Die Redirect-URI in den Spotify-App-Einstellungen muss GENAU deiner
 *   Webseiten-URL entsprechen (inkl. https:// und abschließendem /).
 *   Beispiel: https://crowdtune-xyz.vercel.app/
 *   Siehe SPOTIFY-SETUP.md für die komplette Anleitung.
 *
 * SUPABASE_URL + SUPABASE_ANON_KEY
 *   Holst du dir unter: https://supabase.com/dashboard → dein Projekt →
 *   Project Settings → API
 *   Siehe SUPABASE-SETUP.md für die komplette Anleitung.
 *   Ohne Supabase läuft die App, aber mit Mock-Gästen (ohne echte Multi-User).
 */
window.CROWDTUNE_CONFIG = {
  // <-- HIER DEINE SPOTIFY CLIENT-ID EINFÜGEN
  SPOTIFY_CLIENT_ID: "7a51c25003df4af191f6d001f82417f8",

  // <-- HIER DEINE SUPABASE-URL EINFÜGEN (z. B. "https://abcdefg.supabase.co")
  SUPABASE_URL: "https://wbvlpxrgaxmsgkwghixk.supabase.co",

  // <-- HIER DEINEN SUPABASE ANON-KEY EINFÜGEN (langer String, beginnt mit "eyJ...")
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidmxweHJnYXhtc2drd2doaXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NTIxNTQsImV4cCI6MjA5MjQyODE1NH0.WwQRnXd74uTDhvpWIr6rah12Q03oIovAnMPOJz9YZvQ"
};
