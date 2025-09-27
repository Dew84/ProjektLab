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
API:
POST /api/Auth/register
POST /api/Auth/login

2. Hirdetés lista oldal (Public Ads List)
Minden látogató láthatja.
Keresőmező + kategória szűrő (opcionális).
Lapozás (PagedResult).
Az eladó adatai csak belépett usernek jelenjenek meg.
API:
GET /api/Ads (paraméterek: categoryId, page, pageSize)

3. Saját hirdetéseim (My Ads)
Csak belépett user fér hozzá.
Listázás + gombok: szerkesztés / törlés.
API:
GET /api/Ads/mine
PUT /api/Ads/{id}
DELETE /api/Ads/{id}

4. Hirdetés létrehozása / szerkesztése (Create/Edit Ad)
Form mezők: cím, leírás, ár, kategória kiválasztás (multiselect).
API:
POST /api/Ads
PUT /api/Ads/{id}

5. Profil oldal (My Profile)
Saját adatok megtekintése + módosítása.
API:
GET /api/Users/me
PUT /api/Users/me

6. Kategóriák kezelése (Categories)
Egyszerű lista a kategóriák kiválasztásához.
(Kezdő szinten elég csak lekérdezni, admin CRUD később jöhet.)
API:
GET /api/Categories

7. EXTRA1 -  Hirdetés részletező oldal (Ad Details)
Egy konkrét hirdetés részletei.
Belépett user → látja az eladó nevét.
API:
GET /api/Ads/{id}

8. EXTRA2 - Admin felület (Admin only)
Csak Admin role jogosultsággal.
Funkciók:
Felhasználók listázása + törlése
GET /api/Users
DELETE /api/Users/{id}
Hirdetések törlése (bárki hirdetése)
DELETE /api/Ads/{id}

1. BDávid - Database,modell
2. MDávid - Interface 
3. Oli - Controller
4. BDávid - Regisztráció, Bejelentkezés, Főoldal


Decemberre
Keresés
Üzenetküldés,
Minden maradék,


2 hetente Orosz Ákossal egyeztetés az aktuális helyzetről.
Kövi: 2025.09.29 17:15

A csapat heti 2-szer egyeztet a haladásról.
Kövi: 2025.09.18 18:00

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


