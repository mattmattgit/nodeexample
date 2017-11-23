const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use( (req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method}: ${req.url}`
	fs.appendFile('server.log', log + '\n', (e) => {
		if (e) {
			console.log('Unable to append');
		};
	});
	console.log(log);
	next();
});

// app.use( (req, res, next ) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper( 'currentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper( 'screamIt', (text) => {
	return text.toUpperCase();
});



app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Sup playaaa'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page',
		welcomeMessage: 'This is an about page'
	});
});

app.get('/bad', (req, res) => {
	res.send([{
		error: "This be an error mudder fucker"
	}])
});

app.listen(3000);