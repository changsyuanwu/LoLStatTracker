SELECT * FROM champions WHERE LOWER(champion_name) = "Fiora";

SELECT COUNT(*) AS count FROM matches WHERE (
  "Morgana" IN (
    LOWER(blue_top), LOWER(blue_jungle), LOWER(blue_mid), LOWER(blue_adc),
    LOWER(blue_support)) AND result = "Blue") 
OR (
  "Morgana" IN (
    LOWER(red_top), LOWER(red_jungle), LOWER(red_mid), LOWER(red_adc), 
    LOWER(red_support)) 
  AND result = "Red");

SELECT COUNT(*) AS count FROM matches WHERE (
  "Morgana" IN (LOWER(blue_top), LOWER(blue_jungle), LOWER(blue_mid), 
  LOWER(blue_adc), LOWER(blue_support))) 
OR ("Morgana" IN (
  LOWER(red_top), LOWER(red_jungle), LOWER(red_mid), LOWER(red_adc), 
  LOWER(red_support)));

SELECT * FROM matches WHERE (
  "Garen" IN (
    LOWER(blue_top), LOWER(blue_jungle), LOWER(blue_mid), LOWER(blue_adc),
    LOWER(blue_support)) 
  AND result = "Blue") 
OR (
  "Garen" IN (
    LOWER(red_top), LOWER(red_jungle), LOWER(red_mid), LOWER(red_adc),
    LOWER(red_support))
  AND result = "Red");

INSERT INTO matches (blue_top, blue_jungle, blue_mid, blue_adc, blue_support,
  red_top, red_jungle, red_mid, red_adc, red_support, result)
VALUES ('Lee Sin', 'Rumble', 'Sett', 'Varus', 'Lulu', 'Viego', 'Xin Zhao',
  'Lucian', 'Ezreal', 'Leona', 'Red');

UPDATE champions SET armour = 35 WHERE champion_name = "Gnar";

UPDATE matches SET red_jungle = "Udyr" WHERE match_id = 2;
