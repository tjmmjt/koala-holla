CREATE TABLE "koala" (
	"id" serial primary key,
	"name" varchar(80),
	"age" integer,
	"gender" varchar(6),
	"ready_for_transfer" boolean,
	"notes" varchar(80)
);

INSERT INTO "koala" ("name", "age", "gender", "ready_for_transfer", "notes")
VALUES ('Scotty', '4', 'M', TRUE, 'Born in Guatemala'), ('Jean', '5', 'F', TRUE, 'Allergic to lots of lava'), ('Ororo', '7', 'F', FALSE, 'Loves listening to Paula (abdul)'), ('Logan', '15', 'M', FALSE, 'Love the sauna'), ('Charlie', '9', 'M', TRUE, 'Favorite band is Nirvana'), ('Betsy', '4', 'F', TRUE, 'Has a pet iguana');

--SELECT ALL INFO IN TABLE
SELECT * FROM "koala";

--SELECT KOALAS THAT *ARE NOT* READY FOR TRANSFER
SELECT * FROM "koala" 
WHERE "ready_for_transfer" = FALSE;

--SELECT KOALAS THAT *ARE* READY FOR TRANSFER
SELECT * FROM "koala"
WHERE "ready_for_transfer" = TRUE;

--UPDATE KOALAS READY FOR TRANSFER BY NAME
UPDATE "koala" SET "ready_for_transfer" = 'TRUE' WHERE "name" ILIKE '%Ororo%';

--ORDER KOALAS BY AGE YOUNGEST TO OLDEST
SELECT * FROM "koala" 
ORDER BY "age" ASC;

--ORDER KOALAS BY AGE OLDEST TO YOUNGEST
SELECT * FROM "koala"
ORDER BY "age" DESC;

--ORDER KOALAS BY GENDER - FEMALE
SELECT * FROM "koala"
WHERE "gender" ILIKE '%F%';

--ORDER KOALAS BY GENDER - MALE
SELECT * FROM "koala"
WHERE "gender" ILIKE '%M%';

--ORDER KOALAS BY NAME A-Z
SELECT * FROM "koala" 
ORDER BY "name" ASC;

--ORDER KOALAS BY NAME Z-A
SELECT * FROM "koala"
ORDER BY "name" DESC;






