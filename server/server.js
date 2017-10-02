var express		= require("express"),
	cors		= require("cors"),
	path		= require('path'),
	session     = require("express-session"),
	bps			= require("body-parser"),
	morgan		= require("morgan"),
	flash 		= require('connect-flash');

	app			= express(),
	api			= require("../api/api.js");


	// view engine setup
	app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
	app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too


	


	app.use(flash());




	app.use(bps.json());
	app.use(bps.urlencoded({extended : true}));
	app.use(cors());
	app.use(morgan("dev"));

	app.use("/api/v1", api);

	app.use((err, req, res, next) => {
		res.status(500).json(err.message);
		next();
	})

	module.exports = app;