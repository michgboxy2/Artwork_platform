var express		= require('express'),
	controller	= require('./art-controller.js'),
	router		= express.Router();



	router.route('/')
	.get(controller.FetchArt)
	.post(controller.Uploads,controller.resize, controller.AddArt);


	router.route('/:id')
	.get(controller.getOneArt)
	.delete(controller.DeleteArt)
	.put(controller.EditArt);


	router.route('/:slug')
	.get(controller.findArt);






	module.exports = router;