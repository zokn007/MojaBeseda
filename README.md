# MojaBeseda 1.5

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


## Popravek 1.4.1
- Odpravljena napaka, zaradi katere se JavaScript modul ni naložil in noben gumb ni deloval.
- Vsebina je združena v eno zagonsko datoteko.
- Dodano samodejno čiščenje starega predpomnilnika.

## Novosti 1.5
- Nova kartica Google sinhronizacija v slogu MojaBeseda.
- Ročna sinhronizacija v oblak.
- Obnova podatkov iz oblaka.
- Izvoz varnostne kopije v JSON.
- Obnova varnostne kopije iz datoteke.
- Prikaz uporabnika, naprave in zadnje sinhronizacije.
- Popravljeno zvočno branje na iPhonu: predvajanje se sproži neposredno z uporabnikovim dotikom.
- Gumb Preizkusi glas in prikaz izbranega sistemskega glasu.
