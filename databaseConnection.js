const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfigLocal = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	multipleStatements: false,
	namedPlaceholders: true,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	connectTimeout: 10000,
	ssl: { rejectUnauthorized: false }
};

var database = mysql.createPool(dbConfigLocal);

module.exports = database;
		