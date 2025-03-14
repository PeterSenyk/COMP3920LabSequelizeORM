global.base_dir = __dirname;
global.abs_path = function(path) {
	return base_dir + path;
}
global.include = function(file) {
	return require(abs_path('/' + file));
}

const express = require('express');
const database = require('./databaseConnectionSequelize');
const router = require('./routes/router');

const port = process.env.PORT || 3000;

async function printMySQLVersion() {
	try {
		await database.authenticate(); // Ensure the connection is working
		console.log("✅ Successfully connected to MySQL");

		const [results] = await database.query("SHOW VARIABLES LIKE 'version';");
		console.log(results);
	} catch (err) {
		console.error("❌ Error getting version from MySQL");
		console.error(err);
	}
}

printMySQLVersion();

// const success = printMySQLVersion();


const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
 
app.use('/',router);
app.use(express.static(__dirname + "/public"));

app.listen(port, () => {
	console.log("Node application listening on port "+port);

}); 
