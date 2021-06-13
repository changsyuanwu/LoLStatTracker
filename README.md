# CS348 Group Project

The files needed for each Milestone are in the `archives` folder

# Prerequisites

To run, make sure you have Node.js and MySQL installed.

Make sure that the MySQL server is running on your computer with the following settings:
* Host: localhost
* Username: root
* Password: password
* Database: test

## Populating the database

Navigate to the `api` folder and run `mysql -u root test -p` and enter `password` when prompted.

Once you have entered the mysql shell (you should see `mysql >` in your command line), run `source ./data/LOL_champions_stats.sql` and `source ./data/matches2020.sql` to create and populate the required tables.


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

### Champions

  * GET `.../champions/list` will return an array of the names of all of the champions in the database
    * Example: `.../champions/list` will return `["Aatrox", "Ahri", "Alistar", ...]`

  * GET `.../champions/stats/<name>` will return an object containing the champion whose `name` was given's base stats
    * Example: `.../champions/stats/ezreal` will return ```json {"champion_name":"Ezreal","champion_title":"the Prodigal Explorer","class":"Marksman","playstyle":"Marksman","date_release":"16-03-2010","last_change":"V11.5","blue_essence_price":3150,"rp_price":790,"resource_type":"Mana","health":"530.0","health_growth":88,"health_lvl18":"2026.0","health_regen":"4.00","health_regen_growth":"0.55","health_regen_lvl18":"13.35","mana":"375.00","mana_growth":"70.0","mana_lvl18":"1565.00","mana_regen":"8.50","mana_regen_growth":"0.65","mana_regen_lvl18":"19.55","attack_damage":"60.00","attack_damage_growth":"2.5000000","attack_damage_lvl18":"102.5000000","attack_speed":"0.625","attack_speed_growth":"2.5%","attack_speed_lvl18":"0.891","armour":"22.0","armour_growth":"3.50","armour_lvl18":"81.50","magic_resistance":"30.0","magic_resistance_growth":"0.50","magic_resistance_lvl18":"38.50","movement_speed":325,"movement_speed_lvl18":325,"attack_range":550,"attack_range_lvl18":550}```

  * GET `.../champions/play-stats/<name>` will return an object containing the champion whose `name` was given's win rate, play rate, number of matches won, and number of matches played
    * Example: `.../champions/play-stats/ezreal` will return `{"champion":"ezreal","winrate":0.490442054958184,"playrate":0.2982893799002138,"won":821,"played":1674}`

  * POST `.../champions/update-stats?name=<name>&stat=<stat>&value=<value>` will change the `stat` of the champion given by `name` to `value`
    * Example `.../champions/update-stats?name=ezreal&stat=health&value=500` will set Ezreal's health stat to 500

### Matches

## Client
