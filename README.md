# Node/Express Test Solution README

## Getting Started

To start the project, navigate into either the `expressjs-authentication-middleware` folder or the `sequelize-stock-trades-api` or the `stock-trades-api` folder, then run:

```
npm run start
```

## Important Notes

### Incase you want to run and test on postman

the port is `localhost:8000`

Since we are using `sqlite::memory` note that all data is temporarily stored in the RAM and will disappear when the project stops running or is restarted.

### nodemon for development

For development it makes no sense to keep starting and stopping the server. So I included a dev command that watches for changes and auto restarts the server each time a change occurs. To make use of this then run:

```
npm run dev
```

Ensure that all packages have been installed prior to running the above command. To install all packages run:

```
npm install
```
