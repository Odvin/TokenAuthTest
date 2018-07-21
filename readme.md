## Wartech coding challenge

### You would need:
* Node.js
* PostgreSql to store user information
* Express.js
* node-postgres
* jsonwebtoken
* body-parser
* express-bearer-token
* cookie-parser
The last one is optional. It is not covered by tests, but usually a token is stored as a cookie on a client side.

### Create database
* Install PostgreSql
* Connect to PostgreSql as admin 
  * ```$ sudo -u postgres bash```
  * ```$ psql```
* Create database and user
  * ```CREATE DATABASE tokenauth;```
  * ```CREATE USER tester WITH ENCRYPTED PASSWORD 'dbpass';```
  * ```GRANT ALL PRIVILEGES ON DATABASE tokenauth TO tester;```
* Disconnect from database and connect again as user ```tester```
  * ```\q```
  * ```$ exit ```
  * ```psql -d tokenauth -U tester```
* If you get errors like: ```psql: FATAL:  Peer authentication failed for user "tester"```
  * edit pg_hba.conf in /etc/postgresql/X.Y/main/pg_hba.conf. Replace ident or peer with trust
  * reload postgresql ```# /etc/init.d/postgresql reload```
* We will use pgcrypto  password hashing and salting. It is possible to do the same on server side with bcrypt but it is better to use PostgreSql extension.
  * Connect to database as superuser 
  * ```$ sudo -u postgres bash```
  * ```psql -d tokenauth```
  * ```CREATE EXTENSION pgcrypto;```
* Disconect from database
* To perform migrations use commands
  * ```psql -d tokenauth -U tester < ./pg/data/migrations/schema.up.sql```
  * If needed ```psql -d tokenauth -U tester < ./pg/data/migrations/schema.down.sql```
* Insert Data into Local Schema
  * ```psql -d tokenauth -U tester < ./pg/data/seed-database.sql```


## Task:
* Write an API with Express
* Use the API to authenticate users and store them in your db

* API should allow users:
   * To register
   * To Login
   * To Logout

* API should pass all integration tests: ```npm test```

### Run local server
Check api with Postman
* Register new user
  * Url POST http://localhost:5000/api/register
  * Headers {Key: "Content-Type", Value: "application/json"}
  * Body {"name": "John Doe", "email": "jon@mail.io", "password": "superPass"}
  * You receive token for the user
* Login with email and password
  * Url POST http://localhost:5000/api/login
  * Headers {Key: "Content-Type", Value: "application/json"}
  * Body {"email": "jon@mail.io", "password": "superPass"}
  * You receive new token for the user
* Get user profile
  * Url GET http://localhost:5000/api/profile
  * Autorization: Bearer Token, Token: user token ...
  * You receive {"name": "John Doe", "email": "dou@mail.io"}

### Run integration tests