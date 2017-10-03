var ArtModel 		= require('./art.js'),
	multer			= require('multer'),
	jimp			= require('jimp'),
	uuid			= require('uuid'),
	

	multerOptions	= {
		storage 		: multer.memoryStorage(),
		fileFilter(req, file, next){
			var isPhoto = file.mimetype.startsWith('image/');
			if(isPhoto){
				next(null, true);
			} else {
				next({message : "That fileType isn't allowed!!"}, false);
			}
		}
	};

exports.Uploads = multer(multerOptions).single('photo');

exports.resize = (req, res, next) => {

	if(!req.file){ next();
	return; }

	var extension = req.file.mimetype.split('/')[1];

		req.body.photo = uuid.v4()+ "." +extension;
	
	jimp.read(req.file.buffer).then(function(photo){
		
		if(!photo){ return next(new Error("bla bla bla"));}
		photo.resize(800, jimp.AUTO).write(__dirname+"/www/"+req.body.photo);

	}, (err) => {return next(err);})
	next();


};
	

exports.AddArt	= (req, res, next) => {

	var art = new ArtModel(req.body);
	
	art.save().then((data) => {
		if(!data){ return next(new Error("bla bla bla"));}
		res.status(200).json(data);
	}, (err) => { return next(err);})
}


exports.FetchArt = (req, res, next) => {
	ArtModel.find((err, data) => {
		if(err){ return next(new Error("can't find stores"));}
		res.status(200).json(data);
	})
}

exports.getOneArt = (req, res, next) => {
	var id = req.params.id;

	ArtModel.findById(id).then((data) => {
		if(!data){return next(new Error("can't fetch art"));}
		res.status(200).json(data);
	}, (err) => {return next(err);})
}

exports.findSlug = (req, res, next) => {
	ArtModel.find({slug : req.params.slug}).then((slug)=> {
		if(!slug){ return next(new Error("can't find store"));}
		res.status(200).json(slug);
	})
}

exports.getCategory = (req, res, next) => {
	ArtModel.getCategoryList().then((data) => {
		if(!data){ return next(new Error("can't find categories"));}
		res.status(200).json(data);
	}, (err) => { return next(err);})
} 

exports.EditArt  = (req, res, next) => {
	var id = req.params.id;
	ArtModel.findByIdAndUpdate(id, req.body, {new : true, runValidators : true}).then((data) => {
		if(!data){ return next(new Error("can't edit store"));}
		res.status(200).json(data);
	}, (err) => { return next(err);})
}

exports.DeleteArt = (req, res, next) => {
	var id = req.params.id;
	ArtModel.findByIdAndRemove(id).then((data) => {
		if(!data){ return next(new Error("can't find the art to delete"));}
		res.status(200).json({message : "successfully deleted", data : data});
	})
}