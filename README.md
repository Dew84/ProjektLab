Közösségi adok-veszek oldal

Funkciók:
Felhasználó kezelés
Eladó adatait csak bejelentkezett felhasználók láthatják
Admin jogkör létrehozása aki látja az összes felhasználót tudja törölni és a hirdetéseket is tudja törölni,
Saját hirdetések ki listázása,
,
,
Kategória kezelés,
Üzenet küldés egymásnak
10 másodpercenként a rendszer figyeli, hogy van-e üzenet ha van küld értesítést,
,
Értékelési rendszer
Csak bejelentkezett felhasználók
Csak eladókat lehet értékelni,
,
,
Keresés
Regisztráció nélkül is elérhető kivéve a felhasználóra
Termékre,
Kategóriára,
Felhasználóra,
,
,
Hirdetés feladás
Termék állapot (új, újszerű, használt, stb..) -> csak ötlet,
,

Ütemterv:

Októberre:
Backend-->
Felhasználó kezelés
Hirdetések létrehozása (szerkesztés és törlés is),
Hirdetések ki listázása,

Frontend-->

1. Login / Register oldal
Login: email + jelszó → JWT token a localStorage-be.
Register: felhasználónév, email, jelszó → automatikus login vagy visszairányítás login oldalra.
+
Profil oldal (My Profile)
Saját adatok megtekintése + módosítás

2.Főoldal -> Hirdetés lista oldal (Public Ads List)
Minden látogató láthatja.
jobb oldalt login/reg.
Keresőmező + kategória szűrő (opcionális).
Az eladó adatai csak belépett usernek jelenjenek meg.
kategóriánként 5-5 hirdetés
Kategóriák kezelése (Categories)
Egyszerű lista a kategóriák kiválasztásához.
+
Hirdetés részletező oldal (Ad Details)
Egy konkrét hirdetés részletei.
Belépett user → látja az eladó nevét.


3. Hirdetés Bővített lista
Egy lapozható oldal bővebb listákról
Lapozás (PagedResult).
+
Saját hirdetéseim (My Ads)
Csak belépett user fér hozzá.
Listázás + gombok: szerkesztés / törlés.
+
Hirdetés létrehozása (Create)
Form mezők: cím, leírás, ár, kategória kiválasztás (multiselect).

a.




8. EXTRA2 - Admin felület (Admin only)
Csak Admin role jogosultsággal.
Funkciók:
Felhasználók listázása + törlése
Hirdetések törlése (bárki hirdetése)
(admin CRUD később jöhet.)

Felosztás:

1. BDávid - Database,modell
2. MDávid - Interface 
3. Oli - Controller
4. BDávid - 3. csomag
5. MDávid - 1. csomag
6 Oli- 2. csomag


Decemberre
Keresés
Üzenetküldés,
Minden maradék,


2 hetente Orosz Ákossal egyeztetés az aktuális helyzetről.
Kövi: 2025.10.13 17:15

A csapat heti 2-szer egyeztet a haladásról.
Kövi: 2025.09.29 17:30

Leírás tartalmazza kb.:
Téma leírását,
Használt technológiákat
Backend: C# + EF Core
Frontend: React,
Adatbázis: sqlite,
,
,
Adatbázis sémát,
Funkciók specifikációját


