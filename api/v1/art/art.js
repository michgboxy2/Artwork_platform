var mongoose 		= require('mongoose'),
	slug			= require('slugs'),
	ArtSchema;
	mongoose.Promise = global.Promise;


	mongoose.connect("mongodb:localhost/art");


	ArtSchema = new mongoose.Schema({
		name : {type : String, trim : true, required : 'Please insert the Art name'},
		slug : String,
		description : { type : String, trim : true, required : 'please give the artwork descrription'},
		photo : {type : String},
		category : { type : String}
	});



	ArtSchema.pre('save', function(next){
		if(!this.isModified('name')){
			next(); //skip it

			return;
		}
		this.slug = slug(this.name);
		next()

	});




	module.exports = mongoose.model('art', ArtSchema);