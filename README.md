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

0.Főoldal

1. Login / Register oldal
Login: email + jelszó → JWT token a localStorage-be.
Register: felhasználónév, email, jelszó → automatikus login vagy visszairányítás login oldalra.

2. Hirdetés lista oldal (Public Ads List)
Minden látogató láthatja.
Keresőmező + kategória szűrő (opcionális).
Lapozás (PagedResult).
Az eladó adatai csak belépett usernek jelenjenek meg.

3. Saját hirdetéseim (My Ads)
Csak belépett user fér hozzá.
Listázás + gombok: szerkesztés / törlés.

4. Hirdetés létrehozása / szerkesztése (Create/Edit Ad)
Form mezők: cím, leírás, ár, kategória kiválasztás (multiselect).

5. Profil oldal (My Profile)
Saját adatok megtekintése + módosítása.

6. Kategóriák kezelése (Categories)
Egyszerű lista a kategóriák kiválasztásához.
(elég csak lekérdezni, admin CRUD később jöhet.)

7. EXTRA1 -  Hirdetés részletező oldal (Ad Details)
Egy konkrét hirdetés részletei.
Belépett user → látja az eladó nevét.

8. EXTRA2 - Admin felület (Admin only)
Csak Admin role jogosultsággal.
Funkciók:
Felhasználók listázása + törlése
Hirdetések törlése (bárki hirdetése)

Felosztás:

1. BDávid - Database,modell
2. MDávid - Interface 
3. Oli - Controller
4. BDávid - Regisztráció, Bejelentkezés, Főoldal
5. MDávid


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


