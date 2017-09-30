var auth	= 		require("./auth.js"),
	controller  = 	require("./authcontroller.js"),
	express = 		require("express"),
	router  = 		express.Router();

	router.route("/")
	.post(auth.verifyUser, controller.signIn);
	
	module.exports = router;