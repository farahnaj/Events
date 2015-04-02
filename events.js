$(function () {

    $.getJSON( "events.json", function( data ) {
        // Get data about our events from events.json.
        console.log(data);
    });



    $('.header-action').click(function (e) {
        // Remove active class from all other header actions
        $('.action-active').removeClass("action-active");

        // Add active class to this
        $(this).addClass("action-active");

        // Show selected display view
        showView(this.id);
    });
});

// As per selection , update display
function showView(viewIs)
{
  console.log("In showView " + viewIs);
} 