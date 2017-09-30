var  express = 	require("express"),
	 router  =  express.Router(),
	 controller = require("./Artiste-controller.js");



	 router.route('/')
	 .post(controller.RegisterArtiste)
	 .get(controller.FetchArtistes);



	 module.exports = router;