# MojaBeseda 1.4

## Glavne izboljšave
- Google prijava uporablja varno pojavno okno brez problematičnega redirect postopka.
- TTS je razdeljen na krajše dele in čaka na sistemske glasove, kar izboljša delovanje na iPhonu.
- 300 tem za razmišljanje.
- 240 vodenih bralnih poti.
- Iskanje in filtriranje poti.
- Končane poti so označene ter prestavljene na konec.
- Gumb Odpri besedilo odpre izbrani odlomek na BIBLIJA.net.
- Napredek poti in dnevnik se sinhronizirata v Firestore.

## Obvezna nastavitev za Google prijavo
V Firebase Console odpri Authentication:
1. Sign-in method → Google → Enable → Save.
2. Settings → Authorized domains.
3. Preveri, da sta dodani:
   - mojabeseda-ef82a.firebaseapp.com
   - mojabeseda-ef82a.web.app

Po spremembi počakaj minuto, nato aplikacijo popolnoma zapri in znova odpri.

## Posodobitev
Vsebino ZIP datoteke naloži v koren GitHub repozitorija in potrdi prepis datotek.
