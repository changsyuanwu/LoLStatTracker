# League of Legends Stats Tracker

# Prerequisites

To run, make sure you have Node.js and MySQL installed.

Make sure that the MySQL server is running on your computer with the following settings:
* Host: localhost
* Username: root
* Password: password
* Database: test

## Populating the "production" database

Navigate to the `api` folder and run `mysql -u root test -p` and enter `password` when prompted.

Once you have entered the mysql shell (you should see `mysql >` in your command line), run `source ./data/champions.sql`, `source ./data/matches.sql`, and `source ./data/users.sql` to create and populate the required tables.


# Running the program

Both the API and the client must be running at the same time for the user interface to function properly (the user interface pulls data from the API).

Make sure ports 9000 and 3000 are free on your machine's local environment before starting the API and client or they will fail to start.

## Running the program (API)

Navigate to the `api` folder and run `npm install` to install the required packages from npm.

To start the program, run `npm start`.

Navigate to http://localhost:9000 in your browser and there should be a test message.

## Running the program (Front-end client)

Navigate to the `client` folder and run `npm install` to install the required packages from npm.

To start the program run `npm start`

It should automatically open a browser window to http://localhost:3000 and there should be something there.


# Features

## API

We will be referring to `http://localhost:9000` as `...` since all routes have the same root.

### Champions (championsController.js)

  * GET `.../champions/list` will return an array of the names of all of the champions in the database
    * Example: `.../champions/list` will return `["Aatrox", "Ahri", "Alistar", ...]`

  * GET `.../champions/stats/<name>` will return an object containing the champion whose `name` was given's base stats
    * Example: `.../champions/stats/ezreal` will return `{"champion_name":"Ezreal","champion_title":"the Prodigal Explorer","class":"Marksman","playstyle":"Marksman","date_release":"16-03-2010","last_change":"V11.5","blue_essence_price":3150,"rp_price":790,"resource_type":"Mana","health":"530.0","health_growth":88,"health_lvl18":"2026.0","health_regen":"4.00","health_regen_growth":"0.55","health_regen_lvl18":"13.35","mana":"375.00","mana_growth":"70.0","mana_lvl18":"1565.00","mana_regen":"8.50","mana_regen_growth":"0.65","mana_regen_lvl18":"19.55","attack_damage":"60.00","attack_damage_growth":"2.5000000","attack_damage_lvl18":"102.5000000","attack_speed":"0.625","attack_speed_growth":"2.5%","attack_speed_lvl18":"0.891","armour":"22.0","armour_growth":"3.50","armour_lvl18":"81.50","magic_resistance":"30.0","magic_resistance_growth":"0.50","magic_resistance_lvl18":"38.50","movement_speed":325,"movement_speed_lvl18":325,"attack_range":550,"attack_range_lvl18":550}`

  * GET `.../champions/play-stats/<name>` will return an object containing the champion whose `name` was given's win rate, play rate, number of matches won, and number of matches played
    * Example: `.../champions/play-stats/ezreal` will return `{"champion":"ezreal","winrate":0.490442054958184,"playrate":0.2982893799002138,"won":821,"played":1674}`

  * PUT `.../champions/update-stats?name=<name>&stat=<stat>&value=<value>` will change the `stat` of the champion given by `name` to `value`
    * Example `.../champions/update-stats?name=ezreal&stat=health&value=500` will set Ezreal's health stat to 500

### Matches (matchesController.js)

  * GET `.../matches` will return an array of all the matches in the database
    * Example: `.../matches` will return `[{"match_id":1,"blue_top":"Rumble","blue_jungle":"Elise","blue_mid":"Qiyana","blue_adc":"Miss Fortune","blue_support":"Nautilus","red_top":"Aatrox","red_jungle":"Gragas","red_mid":"Mordekaiser","red_adc":"Xayah","red_support":"Rakan","result":"Blue"},{"match_id":2,"blue_top":"Jayce","blue_jungle":"Jarvan IV","blue_mid":"Orianna","blue_adc":"Miss Fortune","blue_support":"Nautilus","red_top":"Aatrox","red_jungle":"Elise","red_mid":"Qiyana","red_adc":"Varus","red_support":"Tahm Kench","result":"Red"}, ...]`
  
  * GET `.../matches/filter?name=<name>&position=<all/top/jungle/mid/adc/support>&outcome=<all/win/loss>` will return an array of matches with the champion given by `name` being played in `position` with the game outcome being `outcome`
    * Example: `.../matches/filter?name=ezreal&position=adc&outcome=win` will return all matches with `Ezreal` being played in the `adc` position with the outcome being a `win` for Ezreal's team `[{"match_id":61,"blue_top":"Aatrox","blue_jungle":"Gragas","blue_mid":"Leblanc","blue_adc":"Aphelios","blue_support":"Leona","red_top":"Urgot","red_jungle":"Lee Sin","red_mid":"Nautilus","red_adc":"Ezreal","red_support":"Braum","result":"Red"},{"match_id":79,"blue_top":"Renekton","blue_jungle":"Elise","blue_mid":"Qiyana","blue_adc":"Ezreal","blue_support":"Braum","red_top":"Gangplank","red_jungle":"Gragas","red_mid":"Zoe","red_adc":"Aphelios","red_support":"Leona","result":"Blue"}, ...]`

  * POST `.../matches/new` creates a new match with fields defined in the response body. All fields must be present. The user must be authenticated. See the examples for the GET requests for the field names.

  * PUT `.../matches/edit/<matchID>` updates a match with edits defined in the response body. All fields must be present. The user must be authenticated and must be the author of the match. See the examples for the GET requests for the field names.
    * Example: `.../matches/edit/2` will edit the match with ID 2.

  * DELETE `.../matches/delete/<matchID>` deletes a match. User must be authenticated and must be the author of the match.
    * Example: `.../matches/delete/2` will delete the match with ID 2.

### Users (usersController.js)

  * POST `.../users/authenticate` will attempt to authenticate a user based on the `username` and `password` fields in the request body

  * POST `.../users/register` will register a new user based on the `username` and `password` fields in the request body

  * PUT `.../users/change-password` will attempt to change a user's password to the `newPassword` field, verifying their identity using the `oldPassword` field in the request body

  * POST `.../users/logout` will logout the user currently logged in

## Client

Can view match history on the dashboard

Can view match history on the match history page

Champion play statistics are on the dashboard page

Can register new users on the register page

Can login and logout users
