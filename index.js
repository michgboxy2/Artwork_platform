var express 	= require("express"),
	mongoose 	= require('mongoose'),
	app			= require("./server/server.js");


	// import environmental variables from our variables.env file
	require('dotenv').config({ path: 'variables.env' });


	app.use(express.static(__dirname + "/www"));


	mongoose.connect(process.env.DATABASE);
	mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
	mongoose.connection.on('error', (err) => {
	  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
	});


	app.set('port', process.env.PORT || 3000);
	var server = app.listen(app.get('port'), () => {
	  console.log(`Express running → PORT ${server.address().port}`);
	});



	// app.listen(3000, () => {
	// 	console.log("server started");
	// }); 