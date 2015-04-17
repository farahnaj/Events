/**
 * jQuery no conflict resolution by one more way
 */
jQuery(function($) {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        console.log("menu-toggle");
        $("#wrapper").toggleClass("toggled");
    });
});