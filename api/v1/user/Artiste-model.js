var mongoose 	= require('mongoose'),
	bcrypt		= require('bcrypt-nodejs'),
	ArtisteSchema;


	mongoose.connect("mongodb://localhost/art");

	ArtisteSchema = new mongoose.Schema({
		firstname : {type : String, required : true, trim : true},
		lastname  : { type : String, required : true},
		email	  : { type : String, required : true, unique : true, trim : true},
		password  : { type : String, required : true}
	});


	ArtisteSchema.pre('save', function(next){
		this.password = this.encryptPassword(this.password);
		next();
	});


	ArtisteSchema.methods = {

		authenticate : function(plaintext){
			return bcrypt.compareSync(plaintext, this.password);
		},

		encryptPassword : (plaintext) => {
			if(!plaintext){ return next(new Error("please enter password"));}

			var salt = bcrypt.genSaltSync();

			return bcrypt.hashSync(plaintext, salt);
		}
	}

	module.exports = mongoose.model("artiste", ArtisteSchema);