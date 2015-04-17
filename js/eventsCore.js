// $jQ is now an alias to the jQuery function; creating the new alias is optional.
var $jQ = jQuery.noConflict();

var AppOperations = {

    // Change active class of header action
    changeClass: function(elmnt) {
        // Remove active class from all other header actions
        $jQ('.action-active').removeClass("action-active");

        // Add active class to this
        $jQ(elmnt).addClass("action-active");
    }
};