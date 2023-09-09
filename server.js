const express = require('express');
const routes = require('./routes');
// import sequelize connection
// sequlize hepls us connect to a databasebase and perform operation without writing  raw SQL queries
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
