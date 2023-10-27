SELECT * FROM actors;
SELECT * FROM actors WHERE birthday between '1950-01-01' AND '1970-12-31';
SELECT name, lastname FROM actors WHERE country = 'Estados Unidos';
SELECT * FROM movies;
SELECT title, genre FROM movies WHERE year >1994;
SELECT * FROM movies;
UPDATE movies SET year = 1997 WHERE id_movies = 2;