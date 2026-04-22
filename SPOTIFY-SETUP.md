# Spotify-Login einrichten

Dauer: ca. 5 Minuten. Du brauchst nur einen Spotify-Account (egal ob kostenlos oder Premium) und deine live Vercel-URL.

## Schritt 1 – Deine Vercel-URL bereithalten

Du brauchst die URL, unter der Crowdtune bei dir live ist. Z. B. `https://crowdtune-xyz.vercel.app/`. Die schreibst du dir kurz irgendwo auf, gleich wirst du sie zwei Mal brauchen. **Wichtig: mit `https://` vorn und `/` am Ende.**

## Schritt 2 – Spotify Developer App anlegen

1. Gehe auf [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) und logge dich mit deinem normalen Spotify-Account ein.
2. Falls das deine erste App ist, musst du einmal die Developer-Bedingungen akzeptieren.
3. Klicke auf „Create app".
4. Fülle das Formular aus:
   - **App name**: Crowdtune
   - **App description**: Party-Musik-Mix aus den Lieblingssongs der Gäste
   - **Website**: deine Vercel-URL (z. B. `https://crowdtune-xyz.vercel.app/`)
   - **Redirect URI**: dieselbe Vercel-URL. Klicke auf „Add" rechts, damit sie übernommen wird.
   - **Which API/SDKs are you planning to use?**: „Web API" anhaken
5. Bedingungen akzeptieren → „Save".

## Schritt 3 – Client-ID kopieren

1. Du landest auf der Übersichtsseite deiner neuen App.
2. Klicke oben rechts auf „Settings" (oder „Basic Information").
3. Ganz oben siehst du die **Client ID** (ein langer String aus Buchstaben und Zahlen). Klicke auf „Click to copy".

## Schritt 4 – Client-ID in die App eintragen

1. Öffne die Datei `config.js` in deinem Crowdtune-Ordner mit einem Texteditor (TextEdit, Notepad, VS Code – irgendwas, das Textdateien aufmacht).
2. Ersetze den Platzhalter `DEINE_SPOTIFY_CLIENT_ID_HIER` durch deine kopierte Client-ID. Die Anführungszeichen drumherum müssen bleiben. Sollte dann so aussehen:
   ```js
   window.CROWDTUNE_CONFIG = {
     SPOTIFY_CLIENT_ID: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
   };
   ```
3. Datei speichern.

## Schritt 5 – Deploy aktualisieren

Damit die Änderung auch bei Vercel ankommt:

- **Wenn du über GitHub deployst**: Gehe in dein GitHub-Repo, öffne `config.js`, klicke oben rechts auf das Stift-Symbol, ersetze den Inhalt mit dem neuen aus Schritt 4, und unten auf „Commit changes". Vercel deployed innerhalb von 30 Sekunden automatisch neu.
- **Wenn du mit Vercel CLI deployst**: einfach nochmal `npx vercel --prod` im Ordner.

## Schritt 6 – Testen

1. Warte, bis Vercel fertig ist (im Vercel-Dashboard siehst du den Status).
2. Deine Crowdtune-URL in Safari auf dem iPhone oder im Chrome/Firefox-Desktop öffnen.
3. Bei „Mit Spotify fortfahren" tippen.
4. Du wirst zu Spotify weitergeleitet, musst die Berechtigungen bestätigen (Top-Tracks lesen, Profil lesen).
5. Du kommst zurück zu Crowdtune und siehst oben links deinen echten Spotify-Namen und dein Profilbild.
6. Starte eine Party, klick auf „Mix generieren" – der fertige Mix zeigt jetzt deine **echten** Top-Tracks mit Album-Covern.

## Was wenn es nicht klappt?

**"Invalid redirect URI"** in Spotify während des Logins:
Die Redirect-URI im Spotify-Dashboard muss exakt mit deiner Vercel-URL übereinstimmen, inklusive `https://` und dem abschließenden `/`. Häufiger Fehler: URL ohne `/` am Ende. Im Spotify-Dashboard unter Settings → Redirect URIs prüfen und ggf. korrigieren.

**"Spotify Client-ID fehlt"**-Toast in der App:
Entweder ist `config.js` nicht bei Vercel oder der Platzhalter wurde nicht ersetzt. Prüfe im Browser über Entwicklertools → Konsole, ob ein Fehler geloggt wird.

**Nach dem Login passiert nichts / leere Seite:**
Öffne auf dem Desktop die Entwicklertools (Rechtsklick → Untersuchen → Konsole). Dort siehst du in der Regel die Fehlermeldung. Schick mir einen Screenshot der Konsole, dann schau ich drauf.

**"User not registered in the Developer Dashboard"**:
Spotify hat für neue Apps den „Development Mode". Deine App darf nur Leute einloggen, die du explizit als Test-User hinzufügst. Im Spotify Dashboard → deine App → „Users and Access" → „Add New User" → den Spotify-Account-Namen oder E-Mail eintragen. Für dich selbst bist du automatisch eingetragen; Freunde musst du einzeln hinzufügen (bis zu 25 Stück in Development Mode). Wenn das Konzept zieht, können wir später „Extended Quota Mode" beantragen – dann ist die App für alle Spotify-Nutzer offen.

## Was jetzt funktioniert

- Echter Login mit deinem Spotify-Account
- Dein Name und Profilbild erscheinen in der App
- Deine echten Top-50-Tracks werden gezogen
- Im finalen „Mix" siehst du deine echten Tracks mit Album-Covern statt Emojis
- Auch beim Reload bleibst du eingeloggt (Token wird automatisch erneuert)

## Was noch NICHT funktioniert (Phase 2b)

- Andere Gäste sind noch Mock-Avatare – für echte Multi-User brauchen wir ein Backend (Supabase) zum gemeinsamen Speichern der Top-Tracks mehrerer Personen
- Die „Matches" werden für die Demo simuliert (nicht echt gerechnet aus Gäste-Daten)
- Der „Auf Spotify öffnen"-Button am Mix-Ende öffnet noch kein fertiges Playlist
- Apple Music ist noch Mock (braucht Apple Developer Account, 99 USD/Jahr)

Sag Bescheid, wenn du Phase 2b angehen willst, sobald Phase 2a bei dir läuft.
