$(document).ready(function(){

	var foodArray = ['pizza', 'taco', 'donut', 'meatball', 'fried chicken', 'cake'];

	function giphyCall(){

		//getting items from array
		var oneFood = $(this).attr('data-food');

		//getting giphy URL from API
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + oneFood + "&api_key=dc6zaTOxFJmzC&limit=10";

		console.log(queryURL);

		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
			var results = response.data;

			for (var i = 0; i < results.length; i++){
				var gifContainer = $('<div class="item">');

				var rating = results[i].rating; 

				var text = $('<p>').text("Food Intensity:" + rating);

				var foodImage = $('<img>'); 
				foodImage.attr('src', results[i].images.fixed_height.url);

				gifContainer.append(text);
				gifContainer.append(foodImage);

				$('#gifBox').prepend(gifContainer);


			}


		});
	}

	function makeButtons(){
		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$('#buttonBox').empty();

		// Loops through the array of movies
		for (var i = 0; i < foodArray.length; i++){

			// Then dynamicaly generates buttons for each movie in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('noms'); // Added a class 
		    a.attr('data-food', foodArray[i]); // Added a data-attribute
		    a.text(foodArray[i]); // Provided the initial button text
		    $('#buttonBox').append(a); // Added the button to the HTML
		}
	}

	$('#addFood').on('click', function(){

	// This line of code will grab the input from the textbox
	var food = $('#food-input').val().trim();

	// The movie from the textbox is then added to our array
	foodArray.push(food);
	
	// Our array then runs which handles the processing of our movie array
	makeButtons();

	// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
	return false;
	})


$(document).on('click', '.noms', giphyCall);
makeButtons();	

// STOP THIS IS THE END OF THE DOCUMENT.READY FUNCTION
//**********************************************************
});