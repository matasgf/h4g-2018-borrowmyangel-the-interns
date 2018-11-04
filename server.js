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
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: 'https://borrow-my-angel.firebaseio.com'
});

let db = admin.firestore();
let ref = db.ref('restricted_access/secret_document');
let usersRef = ref.child('users');
let angelsRef = ref.child('angels');

app.get('/', function(req, res) {
	res.render('test-server');
});

//Create user
//Assume request contains userName, email, password key/value pairs
//Optionally include firstName, age, gender, and location key/value pairs
app.post('/create-user', function(req, res) {
	let userID = req.body.userName;
	let email = req.body.email;
	//Jason said no encryption needed here since we'll assume HTTPS connection
	let password = req.body.password;
	let newUser = usersRef.doc(userID);
	//Need to send back "Thanks for registering" page
});

//Become angel
//Assume request contains firstName, lastName, maidenName, address, phone, email, references, reasonsWhy, experienceCrisis, experienceVolunteer, bkgdPermission, criminalHistory
//these keys have string values: firstName, lastName, maidenName, phone, email, reasonsWhy
//these keys have JSON values: references, address, experienceCrisis, experienceVolunteer
//these keys have boolean values: bkgdPermission, criminalHistory (i.e. answers the question "Have you ever been convicted of a felony? etc.")
app.post('/become-angel', function(req, res) {
	let userID = req.body.userName;
	let email = req.body.email;
	//Jason said no encryption needed here since we'll assume HTTPS connection
	let password = req.body.password;
	//Need to pass back auto response: "Thank you for your interest in becoming an Angel..." page
});

//User login
//Assume request contains userName and password key/value pairs
app.post('/login-user', function(req, res) {
	let userID = req.body.userName;
	//Jason said no encryption needed here since we'll assume HTTPS connection
	let password = req.body.password;
});

//Angel login
//Assume request contains angelName and password key/value pairs
app.post('/login-angel', function(req, res) {
	let userID = req.body.userName;
	//Jason said no encryption needed here since we'll assume HTTPS connection
	let password = req.body.password;
});

//Set angel status
//Assume request contains angelName and angelStatus key/value pairs
app.post('/set-angel-status', function(req, res) {
	let userID = req.body.userName;
	//Jason said no encryption needed here since we'll assume HTTPS connection
	let password = req.body.password;
});

//start a call
//Assume request contains userName and angelName key/value pairs
app.post('/make-call', function(req, res) {
	let userID = req.body.userName;
	//Jason said no encryption needed here since we'll assume HTTPS connection
	let password = req.body.password;
});

//start message
//Assume request contains userName and angelName key/value pairs
app.post('/start-message', function(req, res) {
	let userID = req.body.userName;
	//Jason said no encryption needed here since we'll assume HTTPS connection
	let password = req.body.password;
});

//this will replace doc if it exists, and create it if it doesn't. Returns a promise
usersRef.set({
	alanisawesome: {
		date_of_birth: 'June 23, 1912',
		full_name: 'Alan Turing'
	}
});
