# Quantik - HTML, CSS, JavaScript
Egyszerű kétszemélyes játék. Egy 4x4-es táblán játszódik, ami 4 egyenlő, 2x2-es részre van bontva. A játékhoz négy, egymástól könnyen megkülönböztethető alakzatot használhatunk, jelen esetben négyzetet, kört, háromszöget és X-et. Mind a két játékosnak minden alakzatból 2-2 bábuja van, így összesen 8 alakzat található meg egy színből. A játék célja az, hogy elsőként helyezzék le a játékosok a negyedik, többitől különböző formát egy sorba, oszlopba, vagy négyzet alakú területre (színtől függetlenül). Ha egy cellára lehelyeztünk egy alakzatot, akkor annak sorába, oszlopába, vagy négyzet alakú területére nem tudja már egyik játékos sem még egyszer ugyanazt az alakzatot letenni.

Mivel a színek nem számítanak, nyerhetünk csupán úgy is, hogy mind a három másik alakzatot a másik játékos tette le, mi pedig a negyedik bábut helyeztük le.

## A játék megvalósítása
### Kezdőképernyő
A játéknak kétféle felhasználói felülete van:
- A játék nyitólapja, ami kezdetben jelenik meg, és a beállításokat tartalmazza; és
- A játékoldal, ahol játszani lehet.

### A játék nyitólapja
A játék nyitólapján megjelenik
- A játék neve
- Lehetőség van a játékszabály elolvasására,
- A játékosok nevének megadására,
- Egy mentett játék folytatására.
Két játékos lehet. A nyitólapon megadható a nevük, alapértelmezetten "1. játékos" és "2. játékos".
Ha vannak félbehagyott játékok, akkor azoknak a listája is ezen az oldalon jelenik meg. A lista egy eleme a mentés dátumát, és a kitöltés %-os arányát tartalmazza. Rákattintva az adott állás töltődik be.
Egy "Start" feliratú gomb lenyomására indul a játék.

### Játékoldal
- A játék indítása után megjelenik az üres tábla.
- Ha a játékot mentett állásból indítottuk, akkor az adott állás töltődik be.
- A felületen jelezve van, hogy melyik játékos van soron. Mindig az 1. játékos kezd.
- Az aktuális játékos a játék szabályainak megfelelően lehelyez egy bábut. A lehelyezés módjairól ld. a Bábu lerakása című fejezetet alább.
- Ezt követően a másik játékos kerül sorra.
- Ha valamelyik játékosnak egy sorban, egy oszlopban, vagy egy területen összejön a 4 különböző alakzat, akkor az a játékos nyer, és a játék véget ér. A győztes játékos neve kiíródik.
- Helyi tárolóba növeljük az adott párnál a győztes játékos győzelmeinek számát.
- Ha döntetlen, akkor ez van kiírva, és növeljük a döntetlenek számát.
- A játék menet közben félbehagyható. Van egy "Mentés" gomb, amelyre kattintva a játékállapot mentésre kerül, és visszatérünk a nyitólapra.
- Ha egy korábban mentett játékot végigjátszunk, akkor az már nem jelenik meg a mentett játékok listájában.

### Bábu lerakása
Kijelölünk egy bábut a játékosnál (aki épp soron van), majd megjelölünk egy helyet a táblán. Szabálytalan rakás esetén nem történik semmi, a bábu visszakerül a helyére.
A bábu választásakor kiemeljük azokat a mezőket, ahová a bábu rakható. A többi mezőre klikkelve nem is történik semmi.

### Statisztika
Az oldal eltárolja egy JSON állományban azt, hogy az adott játékospár hányszor és milyen eredménnyel játszott egymás ellen. Ha például Piroska nyert Farkas ellen már egyszer, és az új játékban ismét Piroska nyer, akkor az állás 2-0 Piroskának. (A Piroska-Farkas és a Farkas-Piroska játékospár két különböző játékospárnak minősül, hiszen más fog kezdeni.)
