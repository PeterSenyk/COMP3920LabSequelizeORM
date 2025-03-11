const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfigLocal = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	multipleStatements: false,
	namedPlaceholders: true,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	connectTimeout: 10000, // 10 seconds
	ssl: { rejectUnauthorized: false } // Required for Aiven SSL connections
};

var database = mysql.createPool(dbConfigLocal);

module.exports = database;
		