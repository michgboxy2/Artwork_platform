var express 		= require("express"),
	api				= express.Router(),
	artisteRouter 	= require("./v1/user/artiste-router.js");
	adminRouter		= require("./v1/admin/admin-router.js");
	
	//mount the routers on the API

	api.use("/artiste", artisteRouter);
	api.use("/admin", adminRouter);

	module.exports = api;

