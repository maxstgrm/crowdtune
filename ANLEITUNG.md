# Crowdtune – Prototyp-Anleitung

Willkommen! Das ist der Phase-1-Prototyp deiner App. Er zeigt das komplette Konzept mit Mock-Daten (also fiktive Gäste und Songs), damit du das Gefühl der App erleben und sie Freunden zeigen kannst, bevor wir die echte Spotify-Anbindung bauen.

## 1. Schnell im Browser testen (Desktop)

Doppelklick auf `index.html` – die App öffnet sich im Browser. Am besten funktioniert sie in Chrome, Safari oder Edge. Auf dem Desktop siehst du einen iPhone-ähnlichen Rahmen, damit das mobile Layout erkennbar bleibt.

**Was du ausprobieren kannst:**
- Login-Screen: beliebigen Button antippen
- "Neue Party starten" → Name + Emoji wählen → Party erstellen
- Party-Lobby: Gäste tröpfeln automatisch ein, QR-Code und Code werden angezeigt
- "Mix generieren" → Analyse-Animation → fertiger Mix mit 15 Songs

## 2. Auf dem iPhone testen (empfohlen)

Damit das Feature "zum Homescreen hinzufügen" funktioniert, muss die Seite von einer richtigen Adresse geladen werden (nicht vom Datei-Pfad). Zwei einfache Wege:

### Variante A – Lokaler Mini-Server (nur für dein eigenes WLAN)
1. Terminal (macOS) oder CMD (Windows) öffnen
2. In den `crowdtune`-Ordner wechseln: `cd Pfad/zu/crowdtune`
3. Server starten: `python3 -m http.server 8080` (macOS/Linux) oder `py -m http.server 8080` (Windows)
4. Auf dem Mac: IP herausfinden mit `ipconfig getifaddr en0`
5. Auf dem iPhone (gleiches WLAN): `http://<deine-ip>:8080` in Safari öffnen

### Variante B – Kostenlos online stellen (empfohlen, dauert 5 Minuten)
1. Account bei [vercel.com](https://vercel.com) anlegen (kostenlos, Google-Login möglich)
2. "Add New → Project" → "Deploy without a Git Repository"
3. Den kompletten `crowdtune`-Ordner per Drag & Drop hochladen
4. Du bekommst eine Adresse wie `crowdtune-xyz.vercel.app`
5. Die Adresse auf dem iPhone in Safari öffnen
6. Teilen-Button → "Zum Home-Bildschirm" → App-Icon erscheint wie eine echte App

## 3. Was der Prototyp NOCH NICHT kann

- Echte Spotify-/Apple-Music-Anbindung (kommt in Phase 2)
- Echter Login mit Apple/Google (aktuell nur Demo-Buttons)
- Daten speichern auf einem Server (aktuell nur im Browser-Speicher)
- Freunde wirklich einladen (Codes sind Demo, "Gäste" erscheinen automatisch animiert)

## 4. Phase 2 – Was du als Nächstes brauchst

Wenn dir der Prototyp gefällt und wir die echte Version bauen, brauchst du (alles kostenlos):

1. **Spotify Developer Account** → [developer.spotify.com](https://developer.spotify.com)
   - App anlegen, Client-ID + Client-Secret notieren
2. **Google Cloud Account** für Google-Login → [console.cloud.google.com](https://console.cloud.google.com)
   - OAuth-Credentials anlegen
3. **Supabase-Account** (Datenbank + Auth) → [supabase.com](https://supabase.com)
   - Projekt anlegen, URL + Anon-Key notieren
4. **Vercel-Account** für Hosting → [vercel.com](https://vercel.com) (hast du vielleicht schon aus Phase 1)

Apple Music und Sign-in-with-Apple brauchen einen kostenpflichtigen Apple Developer Account (99 USD/Jahr). Das machen wir erst in Phase 3, wenn klar ist, dass das Konzept zieht.

## 5. Feedback sammeln

Zeig den Prototyp 3–5 Freunden und frag:
- Ist sofort klar, was die App macht?
- Würdest du sie auf einer Party nutzen?
- Welche Funktion fehlt?
- Stört dich etwas am Design?

Schreib dir die Antworten auf – darauf bauen wir Phase 2 auf.
