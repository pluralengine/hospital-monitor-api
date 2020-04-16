# Hospital Monitor API

## Run local environment

Create your local PostgreSQL DB with the configuration defined in [Sequelize Dev Config file](https://github.com/pluralengine/hospital-monitor-api/blob/master/db/config/config.json#L2)

**Recomended:** Use `nvm` to manage the Node environment. [Install `nvm`](https://github.com/nvm-sh/nvm#installing-and-updating) and run:
```
nvm install
```

We have some big files in the repo, to manage them we use Git LFS. [You should install it](https://git-lfs.github.com./) before clone the repo:
```
brew install git-lfs
```

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