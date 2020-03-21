# Fullstack

## What is this?
This is a minimalist sample web app to demonstrate multiple technologies used at Dev.jetzt camp 01/2020.

## How to run locally
First, clone to a directory of your choice. Then...
### Start the database
Make sure that port 5432 is not taken by another docker container or running postgres server. Then run from the repo root directory:
```
$ docker-compose up
```
### Start the server
```
$ cd server
$ npm install
$ npm run local
```
The server is now listening on port 4000.
### Start the frontend
```
$ cd frontend
$ npm install
$ npm run local
```
The server is now listening on port 4001. A browser window may automatically open.

## Tech Notes
For the backend, this app uses NextJS with TypeORM and Postgres. 

For the frontend, it uses React, compiled by create-react-app. Instead of using the default React state, this app uses a MobX store - to see how it works, have a look at `Store.ts`. For styling, it uses a pure SCSS version of Bootstrap without Reactstrap.

The app also uses DTOs that are shared between frontend and backend to make reliable data exchange possible. 

### What does this app not do (yet?)
* Authentication and authorization
* CI & CD
* Proper input validation
* Proper error handling
* More functionality

Feel free to fork and submit PRs. :-)
