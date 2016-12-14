// Require mongoose
var mongoose = require('mongoose');
// Create Schema class
var Schema = mongoose.Schema;
// Create article schema
var ArticleSchema = new Schema({
	articleId: {
		type: Number,
		unique: true,
		required: true
	},
	// title is a required string
	title: {
		type: String,
		required: true,
		unique: true
	},
	// story is a required string
	story: {
		type: String,
		required: true,
	},
	// link is a required string
	link: {
		type: String,
		required: true
	},
	// This only saves one note's ObjectId, ref refers to the Note model
	note: [{
		type: Schema.Types.ObjectId,
		ref: "Note"

	}]
})

// Create the Article model with the ArticleSchema
var Article = mongoose.model('Article', ArticleSchema)
	// exporting the schema
module.exports = Article;