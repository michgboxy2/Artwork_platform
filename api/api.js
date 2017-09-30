var express 		= require("express"),
	api				= express.Router(),
	artisteRouter 	= require("./v1/user/artiste-router.js");
	adminRouter		= require("./v1/admin/admin-router.js");
	auth			= require("./v1/auth/authRouter.js");
	
	//mount the routers on the API

	api.use("/auth", auth);
	api.use("/artiste", artisteRouter);
	api.use("/admin", adminRouter);


	module.exports = api;

