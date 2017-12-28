/*
My API Key: SrsCEPVeiqgySRa6p1rVSatJAA8qOBGD
q: string
    • Search query term or prhase.
limit: integer (int32)
    • The maximum number of records to return. (Default: 25 & Maximum is 100)
rating: string
    • Filters results by specified rating.
Example queryURL ='https://api.giphy.com/v1/gifs/search?q=michael+jordan&api_key=SrsCEPVeiqgySRa6p1rVSatJAA8qOBGD&limit=10';

*/

$('document').ready(function() {
    var players = [
        'Michael Jordan',
        'Ervin Magic Johnson',
        'LeBron James',
        'Larry Bird',
        'Kobe Bryant',
        'Kareem Abdul Jabbar',
        'Wilt Chamberlain',
        'Bill Russell',
        "Shaquille O'Neal",
        'Oscar Robertson',
    ];

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
                .text(i + 1 + '. ' + players[i])
                .css('color', 'green')
                .css('background-color', 'black')
                .css('font-size', '25px');

            // Adding the button to the HTML
            $('#players-view').append(a);
        }
    }
    /* ADDING PLAYER BUTTONS WHEN NEW ONES ARE ENTERED IN TEXT BOX */
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

    /* ADDING PLAYER BUTTONS WHEN NEW ONES ARE ENTERED IN TEXT BOX */
    renderButtons();
    // This function handles events when the Add Player button is clicked
    $('#add-player').on('click', function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newPlayer = $('#player-input')
            .val()
            .trim();

        // Adding a player from the textbox to our array
        players.push(newPlayer);

        // (this is necessary otherwise we will have repeat buttons)
        $('#players-view').empty();
        // Calling renderButtons which handles the processing of our players array
        //renderButtons();
    });

    /* AJAX REQUEST TO GET GIFS OF PEOPLE WHEN BUTTONS ARE CLICKED */
    // This function handles events where one button is clicked
    function displayGreatestPlayers() {
        var person = $(this).attr('data-name');
        var queryURL =
            'https://api.giphy.com/v1/gifs/search?q=' +
            person +
            '&api_key=SrsCEPVeiqgySRa6p1rVSatJAA8qOBGD&limit=10';

        $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $('<p>').text('Rating: ' + rating);

                var personImage = $('<img>').addClass('gif');
                personImage.attr('src', results[i].images.fixed_height_still.url);
                personImage.attr('data-still', results[i].images.fixed_height_still.url);
                personImage.attr('data-animate', results[i].images.fixed_height.url);
                //personImage.attr('data-state', "still");
                //personImage.addClass('gif');

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $('#gifs-appear-here').prepend(gifDiv);
            }

            /* PAUSING AND UNPAUSING GIFS */
            $('.gif').on('click', function() {
                //$('#gifs-appear-here').on('click', function() {
                alert("You've Clicked a Gif");
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr('data-state');
                console.log(state);

                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === 'still') {
                    $(this).attr('src', $(this).attr('data-animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).attr('data-still'));
                    $(this).attr('data-state', 'still');
                }
                /*if (state === 'still') {
                  $(personImage).attr('src', $(personImage).attr('data-animate'));
                  $(personImage).attr('data-state', 'animate');
                } else {
                  $(personImage).attr('src', $(personImage).attr('data-still'));
                  $(personImage).attr('data-state', 'still');
                }*/
            });

        });

    };
    $(document).on('click', 'button', displayGreatestPlayers);

});