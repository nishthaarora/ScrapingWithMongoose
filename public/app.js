var id = 1;

// setting them as hidden on page load
$('.enterNote').addClass('hidden');
$('.notes').addClass('hidden');

// cube click handler
$('.cube').on('click', function() {
	if ($(this).hasClass('rotate')) {
		$(this).removeClass('rotate');
		$('.enterNote').removeClass('hidden');
		$('.notes').removeClass('hidden');
		$('.wrapper.col-md-4').css('padding-left', '0px');
		$('.displayNote').text('')
		getAllArticles()
		return;
	} else {
		$(this).toggleClass('rotate');
		$('.enterNote').addClass('hidden');
		$('.notes').addClass('hidden');
		$('.wrapper.col-md-4').css('padding-left', '500px')
		return;
	}

})

// getting all the articles and notes associated with those articles and displaying them on the page
function getAllArticles() {
	// making ajax call to get all articles
	$('.front-article').html('')
	var code = $('#displayArticle').html();
	var articleId = id++

		$.get('/article/' + articleId, function(data) {
			// console.log(data)
			var template = Handlebars.compile(code);
			var articleElem = {
				id: data.article.articleId,
				title: data.article.title,
				link: data.article.link,
				story: data.article.story
			}

			var html = template({
				article: [articleElem],
			});

			// displaying notes array and creating a button for each comment
			data.article.note.forEach(function(ele) {
				// console.log(ele)
				var deleteButton = $('<button class="delete" data-id = ' + ele._id + '>' + 'Delete' + '</button>');
				var commentList = $('<p>').text(ele.body)
				commentList.append(deleteButton);
				$('.displayNote').append(commentList)
			})

			$('.front-article').append(html)
		})
}



// post notes in database
function postNote(event) {
	event.preventDefault();

	var articleId = $('li').data('id');
	var text = {
		noteText: $('.noteText').val()
	};
	$('.displayNote').append($('<p>').text($('.noteText').val()));
	$.post('/article/' + articleId, text).done(function(data) {})
	$('.noteText').val('');
}


// delete notes from database
function deleteNote(event) {
	event.preventDefault();
	var articleId = $('li').data('id');
	var noteId = {
		noteId: $(this).data('id')
	};

	$.post('/article/del/' + articleId, noteId).done(function(res) {})

	// 	$.ajax({
	//   method: "POST",
	//   url: "/article/del/" + articleId,
	//   noteId: noteId
	// }).done(function(res) {
	// 		// if(res.success) {
	// 			// $('.displayNote').val('');
	// 		// }
	// })
}


$('.submit').on('click', postNote);
$(document).on('click', '.delete', deleteNote);