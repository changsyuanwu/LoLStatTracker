# CS348 Group Project

## Prerequisites

To run, make sure you have Node.js and MySQL installed.

Make sure that the MySQL server is running on your computer with the following settings:
* Host: localhost
* Username: root
* Password: password
* Database: test

## Populating the database

Navigate to the `api` folder and run `mysql -u root test -p` and enter `password` when prompted.

Once you have entered the mysql shell (you should see `mysql >` in your command line), run `source ./data/LOL_champions_stats.sql` and `source ./data/matches2020.sql` to create and populate the required tables.

## Running the program

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

## Features

