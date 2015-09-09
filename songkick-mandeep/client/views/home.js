Template.resultList.helpers({
	results: function() {
		return Session.get('results');
	}
});

Template.resultItem.helpers({
	onTourDate: function(date) {
		if (date) {
			return moment(date, "YYYY-MM-DD").format("DD MMM YYYY");
		}
		else {
			return false;
		}
	}
});



// capture users input
Template.home.events({
	'keydown .search-by-artist-name': function(event) {
		if (event.which == 13) { //capture return key 
			event.preventDefault(); // prevent browsers autorefresh behaviour 
			var artistName = event.target.value;
			console.log(artistName);
			callApi(artistName);
		}
	},
	'click .btn-search': function(event, template) {
		event.preventDefault();
		var artistName = template.find('.input-search').value;
		callApi(artistName);

	}
});


function callApi(artistName) {
	Meteor.call('findArtist', artistName,
	function(error, result) {
		if (! error) {
			Session.set('results', result);
		}
		else {
			// errors would be handled differently in the 'real' application
			console.log(error);
		}
	});
}

 

