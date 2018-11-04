'use strict';

const express = require('express'),
	app = express(),
	admin = require('firebase-admin'),
	bodyParser = require('body-parser'),
	serviceAccount = require('/Users/owner/Desktop/borrow-my-angel-firebase-adminsdk-n90eq-9bc6961097.json');
//Configure middleware
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static('resources'));
app.use('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://borrow-my-angel.firebaseio.com'
});

let db = admin.firestore();
let usersRef = db.collection('users');
let angelsRef = db.collections('angels');

app.get('/', function(req, res) {
	res.render('test-server');
});

//Create user
//Assume request contains userName, email, password key/value pairs
//Optionally include firstName, age, gender, and location key/value pairs
app.post('/create-user', function(req, res) {
	let userName = req.body.userName;
	let email = req.body.email;
	let password = req.body.password;
	let optionalFields = ['firstName', 'age', 'gender', 'location'];
	usersRef
		.doc(userName)
		.get()
		.then(doc => {
			if (doc.exists) {
				//Send 400 if username already in use
				res.status(400).json({ error: 'Username already in use' });
			} else {
				//Set email and password for userName doc in users collection in Firebase
				usersRef.doc(userName).set({
					email: email,
					password: password
				});
				optionalFields.forEach(function(field) {
					//I think abstract equality operator is actually useful here
					if (req.body[field] != null) {
						usersRef.doc(userName).update({ field: req.body[field] });
					}
				});
			}
		});
	res.send('./pageOne.html');
});

//Become angel
//This path will receive multiple requests per user, and response will change based on content
//Assume request contains firstName, lastName, maidenName, address, phone, email, references, reasonsWhy, experienceCrisis, experienceVolunteer, bkgdPermission, criminalHistory
//these keys have string values: firstName, lastName, maidenName, phone, email, reasonsWhy
//these keys have JSON values: references, address, experienceCrisis, experienceVolunteer
//these keys have boolean values: bkgdPermission, criminalHistory (i.e. answers the question "Have you ever been convicted of a felony? etc.")
app.post('/become-angel/:id', function(req, res) {
	//If no path param specified
	if (req.params.id == null) {
		let angelName = req.body.angelName;
		let password = req.body.password;
		let email = req.body.email;
		angelsRef
			.doc(angelName)
			.get()
			.then(doc => {
				if (doc.exists) {
					//Send 400 if username already in use
					res.status(400).json({ error: 'Username already in use' });
				} else {
					//Set email and password for userName doc in users collection in Firebase
					angelsRef.doc(angelName).set({
						email: email,
						password: password
					});
				}
			});
		res.status(200).json({ angelName: angelName });
	}
	//If angelName specified in path param
	else {
		let angelName = req.params.id;
		angelsRef.doc(angelName).update;
		//Iterate over whatever fields were provided in by request
		Object.keys(req.body).forEach(function(name) {
			//I think abstract equality operator is actually useful here
			if (req.body[name] != null) {
				//Potential bug: will updating with name in name field just overwrite it for each item in object, like ("name": req.body[name]) would do?
				angelsRef.doc(angelName).update({ name: req.body[name] });
			}
		});
		res.status(200).json({ angelName: angelName });
	}
});

//User login
//Assume request contains userName and password key/value pairs
app.post('/login-user', function(req, res) {
	let userName = req.body.userName;
	let userData;
	if (userName == null) {
		res.status(400).json({ error: 'No username specified' });
	} else {
		userData = usersRef
			.doc(userName)
			.get()
			.then(doc => {
				if (!doc.exists) {
					//Send 400 if username doesn't exist
					res.status(400).json({ error: 'Username not found in our system' });
				}
			});
	}
	//if passwords match, send the 200 OK
	if (req.body.password === userData.password) {
		res.status(200).json();
	} else {
		res.status(400).json({ error: 'Incorrect password' });
	}
});

//Angel login
//Assume request contains angelName and password key/value pairs
app.post('/login-angel', function(req, res) {
	let angelName = req.body.userName;
	let angelData;
	if (angelName == null) {
		res.status(400).json({ error: 'No angelName specified' });
	} else {
		angelData = angelsRef
			.doc(angelName)
			.get()
			.then(doc => {
				if (!doc.exists) {
					//Send 400 if username doesn't exist
					res.status(400).json({ error: 'angelName not found in our system' });
				}
			});
	}
	//if passwords match, send the 200 OK
	if (req.body.password === angelData.password) {
		res.status(200).json();
	} else {
		res.status(400).json({ error: 'Incorrect password' });
	}
});

//Set angel status
//Assume request contains angelName and angelStatus key/value pairs
app.post('/set-angel-status', function(req, res) {
	let angelName = req.body.angelName;
	let angelStatus = req.body.angelStatus;
	angelsRef.doc(angelName).update({ status: angelStatus });
	//redirect to angel's homepage as a pug template
	res.status(200).redirect('/angelHome');
});

//start a call
//Assume request contains userName and angelName key/value pairs
app.post('/make-call', function(req, res) {
	let userName = req.body.userName;
	//Jason said no encryption needed here since we'll assume HTTPS connection
	let password = req.body.password;
});

//start message
//Assume request contains userName and angelName key/value pairs
app.post('/start-message', function(req, res) {
	let userName = req.body.userName;
	//Jason said no encryption needed here since we'll assume HTTPS connection
	let password = req.body.password;
});
