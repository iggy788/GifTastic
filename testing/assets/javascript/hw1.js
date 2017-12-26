$('document').ready(function() {

    var players = ['Michael Jordan', 'Magic Johnson', 'LeBron James', 'Larry Bird', 'Kobe Bryant', 'Kareem Abdul-Jabbar', 'Wilt Chamberlain', 'Bill Russell', "Shaquille O'Neal", 'Oscar Robertson'];

    // Function for displaying movie data
    function renderButtons() {
        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $('#players-view').empty();

        // Looping through the array of movies
        for (var i = 0; i < players.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $('<button>');
            // Adding a class
            a.addClass('player');
            // Adding a data-attribute with a value of the movie at index i
            a.attr('data-name', players[i]);
            // Providing the button's text with a value of the movie at index i
            a
                .text(players[i])
                .css('color', 'green').css('background-color', 'black');


            // Adding the button to the HTML
            $('#players-view').append(a);
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

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    $(document).on('click', '.player', displayMovieInfo);
    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();

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

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $('#gifs-appear-here').prepend(gifDiv);
            }
        });
    });
});