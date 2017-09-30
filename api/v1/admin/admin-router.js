var  express = 	require("express"),
	 router  =  express.Router(),
	 controller = require("./admin-controller");


	 router.param("id",controller.InterceptId);


	 router.route("/")
	 .post(controller.RegisterAdmin)
	 .get(controller.FetchAllAdmin);

	 router.route("/:id")
	 .delete(controller.RemoveAdmin)
	 .put(controller.EditAdmin)
	 .get(controller.FetchAdminById);


	 module.exports = router;