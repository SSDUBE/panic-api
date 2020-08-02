The app consist of three parts database serve and web

in order compile run the following commands on the root directory
you need docker, node and react installed on your machine and you
also need a GOOGLE MAPS API KEY

to spin up the database run
  - docker-compose up

to spin up the server open a new terminal and run the below comands on the root directory
  - cd packages/server/
  - yarn install
  - yarn migrate
  - yarn start
you should now have a running server make sure nothing is crushing

to spin up the client side run the below commands on the root directory
  - cd packages/web/
  - touch .env
  inside the .env add REACT_APP_MAPS_API_KEY="GOOGLE MAPS API KEY"
  - yarn install
  - yarn start

by default when you run the migration an admin user is created with
  - username admin
  - password as password
use the above details to login as admin

now you need to open a new browser window in incognito
register a new user
and signin using the details used to signup
allow google maps to access your location
you can now click panic button

Please note this does not send realtime panics so you need to refresh your browser as an admin to see user panics

