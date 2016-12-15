var express = require('express');
// to make ajax  calls
var router = express.Router();
// simplest way possible to make http calls.
var request = require("request");
var cheerio = require("cheerio");
// requiring model
var Article = require('../models/Article');
var Note = require('../models/Note');
var id = 0;

// rendering HTML File
router.get('/', function(req, res) {
	res.send(index.html)
})

// scraping the articles
router.get('/scrape', function(req, Ores) {
	request('https://news.google.com/news/section?cf=all&pz=1&ned=us&topic=w&siidp=82c9d0ca59d602a85199e21f287f961eafc0&ar=1481491875', function(err, res, html) {
			var $ = cheerio.load(html);
			$('.story').each(function(i, elem) {
				id++
				var title = $(elem).find('.esc-lead-article-title').text();
				var story = $(elem).find('.esc-lead-snippet-wrapper').text();
				var link = $(elem).find('.article').attr('href');

				var result = {};
				// Add the text and href of every link, and save them as properties of the result object
				if (title && story && link) {
					result.articleId = id;
					result.title = title;
					result.story = story;
					result.link = link;
				}
				console.log(result)
					// Using our Article model, create a new entry
					// This effectively passes the result object to the entry (and the title and link, story)
				var entry = new Article(result);
				// Now, save that entry to the db
				entry.save(function(err, data) {
					if (err) throw err;
					else console.log('saved', data);
				})
			})
		})
		// Tell the browser that we finished scraping the text
		// Ores.json({'result': result})
	Ores.send('complete')
})

// display all articles in JSON format on this route
router.get('/articles', function(req, res) {
	Article.find({}, function(err, result) {
		if (err) throw err
		res.json({
			articles: result
		});
	})
})

// get article with an id and increment it to the next article on click event listener
router.get('/article/:id', function(req, res) {
	Article.findOne({
			articleId: req.params.id
		})
		.populate("note")
		.exec(function(err, doc) {
			if (err) throw err
			res.json({
				article: doc
			});
		})
})

// post notes in mongoDB which are posted by the user
router.post('/article/:id', function(req, res) {
	var newNote = req.body.noteText
	Note.create({
		'body': newNote
	}, function(err, doc) {
		if (err) throw err;
		else {
			Article.findOneAndUpdate({
					articleId: req.params.id
				}, {
					$push: {
						"note": doc._id
					}
				})
				.exec(function(err, doc) {
					console.log('doc', doc)
					if (err) throw err;
					res.send(doc);
				})
		}
	})
})

// deleting notes assosication with the article on click of the delete button
router.post('/article/del/:id', function(req, res) {
	// console.log('reqid',req.body.noteId)
	Article.findOne({
			articleId: req.params.id
		})
		.populate("note")
		.exec(function(err, doc) {
			var notes = doc.note;
			console.log(notes)
			for (var i = 0; i < notes.length; i++) {
				// var note = notes[i];
				// console.log(note.id)
				if (note.id === req.body.noteId) {
					doc.note.splice(i,1)
						// console.log('id', note.id);
						// console.log('id2', req.body.noteId);
					// console.log('notes', notes);
					// notes.splice(i, 1)
					// console.log('notes1', notes);
					// delete note["id"]
				} else {
					// return console.log(false);
				}
			}
			doc.save()
		})



	// console.log(req.body)
	// Article.findOne({
	// 		articleId: req.params.id
	// 	})
	// 	.populate("note")
	// 	// .remove("note")
	// 	.exec(function(err, doc) {
	// 		doc.note.forEach(function(ele) {
	// 			ele.findOne({id: req.body.noteId}, function(err, doc2) {
	// 				console.log('doc2', doc2)
	// 			})
	// 		})
	// if (err) throw err;
	// else {
	// 	doc.
	// }
	// else {
	// Article.remove({"note": doc.note.id}, function(err) {
	// if (err) throw err;
	// })
	// Article.remove({'note': doc.note})
	// }
	// res.send({
	// 	success: true
	// })
	// })

})

module.exports = router;