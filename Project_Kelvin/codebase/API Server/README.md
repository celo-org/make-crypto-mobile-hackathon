

### Local dev setup
1. Run MySQL Locally in either ways below
   1. Docker
      - Setup docker
      - run mysql container
   2. Homebrew (macOs)
      - brew install mysql
      - berw services start mysql
2. Login to mysql server mysql workbench
   - connect using oot user for initial setup
   - root cannot be used for connection from application
3. Setup database, local user using script under `./scripts/init-db.sql`
   - modify  sql script to replace `<<usernaem>>` and `<<password>>` with appropriate vaulues
   - update same values in file `config/env/developement.js` under `datastores.default.mysql.url` attribute
4. Instal dependencies
   - `npm install -d`
5. run application locally
   - `npm run start:dev`
6. Test application
   - Now application can be accessed buy visiting a sample url `curl http://localhost:1337/employees/getEmployees`


### Add new api
sails automatically generates and registers models with basic CRUD operations if models are generated usign followign command:
>./node_modules/.bin/sails generate api employees

- Now Controller code can be added in `./node_modules/.bin/sails generate api employees`
  - sample function written to demonstrate database interaction although same behaviour automatically exposed on `http://localhost:1337/employees/getEmployees`
  - `rest` endpoints on each model are automatically exposed `https://sailsjs.com/documentation/reference/configuration/sails-config-blueprints#?routerelated-settings`
    - `id`, `createdAt`, `updatedAt`  fields are automatically created and updated on each model unless otherwise required
- Node Model code can be added in `./node_modules/.bin/sails generate api employees`

# Deploy to production:
 Application configured to deploy `main` branch automatically everytime there is a push on gituhub

Application is accessible via `https://wallet-demo.kulfyapp.com/employees/getEmployees`
