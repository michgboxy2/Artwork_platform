var adminModel	= require("./admin-model.js");
	// auth		= require("../auth/auth.js");



	exports.InterceptId = (req, res, next, id) => {
		var id = req.params.id;
		adminModel.findById(id).then((data)=> {
			if(!data){ return next(new Error("cant find id"));}
			data = req.admin;
			next();
		})

	}


	exports.RegisterAdmin = (req, res, next) =>{
		var admin = req.body,
			adminObj = new adminModel(admin);

			adminObj.save((err, data) => {
				if(err){return next(new Error("can't register admin"));}

				// data = data.toObject();
				// var token = auth.signToken(data._id);
				// data['_token'] = token;
				res.status(200).json(data);
			})
	}

	exports.FetchAllAdmin =(req, res, next) => {
		adminModel.find((err, data)=> {
			if(err){return next(new Error("can't fetch Admins"));}
			res.status(200).json(data);
		})
	}

	exports.RemoveAdmin = (req, res, next) => {
		var id =req.params.id;

		adminModel.findByIdAndRemove(id).then((data)=> {
			if(!data){ return next(new Error("can't delete admin"));}
			res.status(200).json(data);
		}, (err) =>{ return next(err);})
	}

	exports.EditAdmin = (req, res, next) =>{
		var id = req.params.id;

		adminModel.findByIdAndUpdate(id, req.body).then((data) => {
			if(!data){return next(new Error("can't update admin"));}
			res.status(200).json(data);
		}, (err) => { return next(err);})
	}

	exports.FetchAdminById = (req, res, next) => {
		var id = req.params.id;
		adminModel.findById(id).then((data) => {
			if(!data){ return next(new Error("can't fetch admin"));}
			res.status(200).json(data);
		}, (err) => {return next(err);})
	}