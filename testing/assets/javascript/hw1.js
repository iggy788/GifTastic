$('document').ready(function() {

    var players = ['Michael Jordan', 'Magic Johnson', 'LeBron James', 'Larry Bird', 'Kobe Bryant', 'Kareem Abdul-Jabbar', 'Wilt Chamberlain', 'Bill Russell', "Shaquille O'Neal", 'Oscar Robertson'];

    // Function for displaying players
    function renderButtons() {
        // Deleting the player buttons prior to adding new player buttons
        // (this is necessary otherwise we will have repeat buttons)
        $('#players-view').empty();

        // Looping through the array of movies
        for (var i = 0; i < players.length; i++) {
            // Then dynamicaly generating buttons for each player in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $('<button>');
            // Adding a class
            a.addClass('player');
            // Adding a data-attribute with a value of the player at index i
            a.attr('data-name', players[i]);

            // Providing the button's text with a value of the movie at index i
            a
                .text((i + 1) + '. ' + players[i])
                .css('color', 'green')
                .css('background-color', 'black')
                .css('font-size', '25px');


            // Adding the button to the HTML
            $('#players-view').append(a);

            // Will add the below to the HTML
            // <button class="player" data-name="Wilt Chamberlain" style="color: green; background-color: black; font-size: 25px;">Wilt Chamberlain</button>

            // Need to Add 
            // data-state="still"
        }
    }

    // This function handles events where one button is clicked
    $('#add-player').on('click', function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var player = $('#player-input')
            .val()
            .trim();
        // The movie from the textbox is then added to our array
        players.push(player);

        // calling renderButtons which handles the processing of our player array
        renderButtons();
    });

    renderButtons();
    // This function handles events where a movie button is clicked
    $('#add-player').on('click', function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newPlayer = $('#player-input')
            .val()
            .trim();

        // Adding a player from the textbox to our array
        players.push(newPlayer);

        // Calling renderButtons which handles the processing of our players array
        //renderButtons();
    });
    // Adding a click event listener to all elements with a class of "movie"
    //$(document).on("click", ".movie", displayMovieInfo);

    // Calling the renderButtons function to display the intial buttons
    //renderButtons();

    // This function handles events where one button is clicked
    $('button').on('click', function() {
        var person = $(this).attr('data-name');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + person + '&api_key=SrsCEPVeiqgySRa6p1rVSatJAA8qOBGD&limit=10';

        $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $('<p>').text('Rating: ' + rating);

                var personImage = $('<img>');
                personImage.attr('src', results[i].images.fixed_height.url);
                //personImage.attr('data-state', 'still');

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $('#gifs-appear-here').prepend(gifDiv);
            }
        });
    });
});