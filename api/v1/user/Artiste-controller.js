var  artisteModel 	= require("./Artiste-model.js"),
	 auth		= require("../auth/auth.js");
	

	exports.RegisterArtiste = (req, res, next) =>{
		var admin = req.body,
			artisteObj = new artisteModel(admin);

			artisteObj.save((err, data) => {

				if(err){return next(new Error("can't register artiste"));}

				data = data.toObject();

				 var token = auth.signToken(data._id);
				 data["_token"] = token;

				res.status(200).json(data);
			})
	}


	exports.FetchArtistes = (req, res, next) => {
		artisteModel.find((err, data) => {
			if(err){ return next(new Error("can't find artistes"));}
			res.status(200).json(data);
		})
	}