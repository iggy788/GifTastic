$('document').ready(function() {
    var players = ['Michael Jordan', 'Ervin Magic Johnson', 'LeBron James', 'Larry Bird', 'Kobe Bryant', 'Kareem Abdul Jabbar', 'Wilt Chamberlain', 'Bill Russell', "Shaquille O'Neal", 'Oscar Robertson'];

    /* THE FUNCTION renderButtons(); WILL CREATE NEW BUTTONS FOR EVERY PLATER IN THE ABOVE ARRAY */

    function renderButtons() {
        // Deleting the player buttons prior to adding new player buttons

        $('#players-view').empty();

        for (var i = 0; i < players.length; i++) {
            var a = $('<button>')
                .addClass('player')
                .attr('data-name', players[i])
                .text(i + 1 + '. ' + players[i])
                .css({
                    padding: '5px',
                    'margin-right': '20px',
                    'margin-left': '20px',
                    'margin-top': '20px',
                    width: '170px',
                    border: 'none',
                    color: 'gold',
                    background: 'black',
                    'font-size': '20px',
                });
            $('#players-view').append(a);
        }
    }

    /* CALLING renderButtons(); HERE WILL MAKE SURE THE PLAYER'S IN THE ARRAY HAVE BUTTONS CREATED */

    renderButtons();

    /* ADDING PLAYER BUTTONS WHEN NEW ONES ARE ENTERED IN TEXT BOX */

    $('#add-player').on(
        'click',
        function(
            event
        ) {
            event.preventDefault();

            var player = $('#player-input')
                .val()
                .trim();

            players.push(player);

            /* CALLING renderButtons(); HERE WILL MAKE SURE THE NEW PLAYER'S BUTTON HAS BEEN CREATED */

            renderButtons();
        }
    );

    /* AJAX REQUEST TO GET GIFS OF PEOPLE WHEN BUTTONS ARE CLICKED */

    function displayGreatestPlayers() {
        var person = $(this).attr('data-name');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + person + '&api_key=SrsCEPVeiqgySRa6p1rVSatJAA8qOBGD&limit=10';

        $.ajax({
            url: queryURL,
            method: 'GET',
        }).done(
            function(
                response
            ) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div class='item' id='wrapper'>");
                    gifDiv.css({
                        width: 'auto',
                        margin: '0px auto',
                        background: 'black',
                        padding: '10px',
                        'text-align': 'center',
                    });

                    var rating = results[i].rating;

                    var title = results[i].title;

                    var personImage = $('<img>').addClass('gif');
                    personImage.attr('src', results[i].images.fixed_height_still.url);
                    personImage.attr('data-still', results[i].images.fixed_height_still.url);
                    personImage.attr('data-animate', results[i].images.fixed_height.url);
                    personImage.css({
                        padding: '5px',
                        margin: '0px auto',
                        width: '30%',
                    });

                    var p = $('<p>').text('GIF Title: ' + title + ' & Rating: ' + rating);
                    p.css({
                        padding: '5px',
                        margin: '0px, auto',
                        width: '100%',
                        color: 'white',
                        'font-size': '20px',
                    });




                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);

                    $('#gifs-appear-here').prepend(gifDiv);
                }

                /* PAUSING AND UNPAUSING GIFS */
                $('.gif').on('click', function() {
                    var state = $(this).attr('data-state');
                    //console.log(state);

                    if (state === 'still') {
                        $(this).attr('src', $(this).attr('data-animate'));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).attr('data-still'));
                        $(this).attr('data-state', 'still');
                    }
                });
            }
        );
    }

    $(document).on('click', 'button', displayGreatestPlayers);

});