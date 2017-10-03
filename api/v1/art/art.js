var mongoose 		= require('mongoose'),
	slug			= require('slugs'),
	ArtSchema;
	mongoose.Promise = global.Promise;


	mongoose.connect("mongodb:localhost/art");


	ArtSchema = new mongoose.Schema({
		name : {type : String, trim : true, required : 'Please insert the Art name', unique : true},
		slug : String,
		created : {  type : Date, default : Date.now},
		description : { type : String, trim : true, required : 'please give the artwork descrription'},
		category : { type : String},
		photo : String
	});



	ArtSchema.pre('save', function(next){
		if(!this.isModified('name')){
			next(); //skip it

			return;
		}
		this.slug = slug(this.name);

		//make slug distinct
		var slugRegEx = new RegExp(`^(this.slug)((-[0-9]*$)?)$`, 'i');
		var artWithSlug = this.constructor.find({slug : slugRegEx});
		if(artWithSlug.length){
			this.slug = this.slug + "-" + (artWithSlug.length + 1);
		}
		next()

	});

	ArtSchema.statics.getCategoryList = function(){
		return this.aggregate([

			{$unwind : '$category'},
			{$group : {_id : '$category', count : {$sum : 1} }},
			{$sort  : {count : -1}}



			]);
	}


	module.exports = mongoose.model('art', ArtSchema);