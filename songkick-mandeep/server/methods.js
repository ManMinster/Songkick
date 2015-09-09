var request = Meteor.npmRequire('request');
var future = Meteor.npmRequire('fibers/future');

Meteor.methods({
	findArtist: function(artistName) {
		var resultOne = getArtistData(artistName);
		return resultOne
	}
})

function getArtistData(artistName) {
	// as node is asynchronous, we wrap the function inside a fiber and 'wait'
	// for the respnse. This behaves in like a syncronous function but does not block
	// the server.
	var f1 = new future(),
	url = 'http://api.songkick.com/api/3.0/search/artists.json',
	qs = {
		query: artistName,
		apikey:'jhevSy2yQF6HFzmb'
	}

	request({url: url,qs: qs, method: 'GET', json: true}, // return json object
		function(error, response, body) {
			if (! error && response.statusCode === 200) {
				var results = body.resultsPage.results.artist;
				return f1['return'](results);
			}
			else {
				console.log(error);
			}
		});
	return f1.wait();
}


