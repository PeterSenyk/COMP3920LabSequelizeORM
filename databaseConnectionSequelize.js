require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log("Loaded DB Config:", process.env);

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: console.log,
});

module.exports = sequelize;
