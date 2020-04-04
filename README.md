# Hospital Monitor API

## Run local environment

Create your local PostgreSQL DB with the configuration defined in [Sequelize Dev Config file](https://github.com/pluralengine/hospital-monitor-api/blob/master/db/config/config.json#L2)

Install dependencies
```
npm install
```

Run database migration from `/db` directory
```
npm run db:migrate
```

Start the local server
```
npm start
```