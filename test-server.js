'use strict';

const express = require('express'),
	app = express(),
	bodyParser = require('body-parser');
//Configure middleware
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.static('resources'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/test-post', function(req, res) {
	let testName = req.body.testName;
	let testEmail = req.body.testEmail;
	let testObject = req.body.testObject;
	let reqArray = [testName, testEmail, testObject];
	console.log('Request payload received: ', req.body);
	reqArray.forEach(function(item) {
		if (typeof item !== 'undefined' && item) {
			console.log('Type of ', item, 'is', typeof item);
		} else {
			console.log('An item in payload returned null or undefined');
		}
	});
	res.render('test-server');
});

const server = app.listen(3000, function() {
	console.log(`Server started on port ${server.address().port}`);
});
