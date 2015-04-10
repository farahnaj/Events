/* This code is with basic javascript,jquery,bootstrap, handlebar.js and backbone.js*/
var AppOperations = {

// Change active class of header action
changeClass : function (elmnt)
{
  // Remove active class from all other header actions
  $('.action-active').removeClass("action-active");

  // Add active class to this
  $(elmnt).addClass("action-active");
}
};