const router = require('express').Router();
const userModel = require('../models/web_user');
const PetModel = require('../models/pet');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
	console.log("page hit");
	try {
		const users = await userModel.findAll({attributes: ['web_user_id','first_name','last_name','email']});
		if (!users) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to userModel");
		} else {
			// console.log(users);
			res.render('index', {allUsers: users});
		}
	} catch(ex) {
		res.render('error', {message: 'Error connecting to MySQL'});
		console.log("Error connecting to MySQL:", ex);
	}
});


router.get('/deleteUser', async (req, res) => {
	try {
		console.log("delete user");
		let userId = req.query.id;
		if (userId) {
			console.log("userId: " + userId);
			let deleteUser = await userModel.findByPk(userId);
			console.log("deleteUser: ", deleteUser);
			if (deleteUser !== null) {
				await deleteUser.destroy();
			}
		}
		res.redirect("/");
	} catch (ex) {
		res.render('error', { message: 'Error connecting to MySQL' });
		console.log("Error connecting to MySQL:", ex);
	}
});


router.post('/addUser', async (req, res) => {
	try {
		console.log("Form submit received:", req.body);

		// Validate required fields
		if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
			console.log("Missing required fields");
			res.render('error', { message: "All fields are required!" });
			return;
		}

		// Hash the password before storing
		const password_hash = await bcrypt.hash(req.body.password, 12);

		// Insert user into the database
		let newUser = await userModel.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password_hash: password_hash
		});

		console.log("User added successfully:", newUser);
		res.redirect("/");
	} catch (ex) {
		console.log("Error writing to MySQL:", ex);
		res.render('error', { message: `Error writing to MySQL: ${ex.message}` });
	}
});


router.get('/pets', async (req, res) => {
	console.log("Fetching all pets...");
	try {
		const pets = await PetModel.findAll({ attributes: ['name'] });
		console.log("Pets retrieved:", pets);
		res.render('pets', { allPets: pets });
	} catch (err) {
		console.error("Error fetching pets:", err);
		res.render('error', { message: "Error retrieving pets from database." });
	}
});


router.get('/showPets', async (req, res) => {
	console.log("page hit");
	try {
		let userId = req.query.id;
		const user = await userModel.findByPk(userId);

		if (!user) {
			res.render('error', { message: 'User not found' });
			console.log("Error: User not found");
			return;
		}

		let pets = await user.getPets();

		if (pets.length === 0) {
			console.log("⚠User has no pets");
			res.render('pets', { allPets: [], noPets: true }); // Send flag to EJS
		} else {
			console.log("Pets found:", pets);
			res.render('pets', { allPets: pets, noPets: false });
		}
	} catch (ex) {
		res.render('error', { message: 'Error connecting to MySQL' });
		console.log("Error connecting to MySQL:", ex);
	}
});

module.exports = router;
