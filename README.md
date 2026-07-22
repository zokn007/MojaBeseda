# MojaBeseda 1.2 – Firebase Spark

PWA za osebno in skupinsko svetopisemsko razmišljanje v zaprti skupini približno 30 ljudi.

## Najlažja namestitev na Macu

1. V Firebase Console ustvari projekt na paketu **Spark**.
2. Dodaj spletno aplikacijo in si zapiši: `apiKey`, `messagingSenderId`, `appId` in `projectId`.
3. V **Authentication → Sign-in method** omogoči Google.
4. V **Firestore Database** ustvari podatkovno zbirko v produkcijskem načinu.
5. Dvoklikni `setup-macos.command` in vnesi zahtevane podatke.
6. Potrdi Google prijavo. Pomočnik nato sam ustvari konfiguracijo in izvede deploy.

Če macOS blokira datoteko: desni klik → **Odpri** → **Odpri**.

## Poznejše objave

Po spremembah dvoklikni `deploy-macos.command`.

## Lokalni preizkus

Dvoklikni `test-local-macos.command` in odpri `http://localhost:8080`.

## Vključeno

- Google prijava
- Firestore sinhronizacija dnevnika, nastavitev in skupin
- skupine in povabila že registriranim uporabnikom
- slovensko sistemsko branje besedila (TTS)
- zasebno polje »Moja molitev«
- temni in svetli pogled
- PWA in offline predpomnilnik
- Firestore pravila in indeks

## Pomembno

Firebase konfiguracija spletne aplikacije ni geslo. Dostop do podatkov omejujejo `firestore.rules`. Oseba se mora pred povabilom v skupino vsaj enkrat prijaviti v MojaBeseda.

Aplikacija uporablja knjižnico referenc, povzetkov in razlag. Celotni licencirani prevodi Svetega pisma niso vključeni.
