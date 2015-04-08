/* This code is with basic javascript,jquery,bootstrap, handlebar.js and backbone.js*/
var AppOperations = {

/** 
 * As per selection , update display.
 */
showView : function (viewIs)
{
  console.log("In showView " + viewIs);

  // Add loading img to show its loading
  $("#content").html('<img src="images/ajax-spinner.gif"></img>');

  if(viewIs === "show-list")
     this.displayList();    
  else if(viewIs === "show-grid")
     this.displayGrid();  
},

/** 
 * Display events in list.
 */
displayList : function ()
{
  console.log("In displayList");

  // Update display
  App.createView($("#events-list-template").html(), App.eventsForCollection.toJSON());
},

/**
 * Display events in grid
 */
displayGrid : function ()
{
  console.log("In displayGrid");

  // Update display
  App.createView($("#events-grid-template").html(), App.eventsForCollection.toJSON());
},

// Show specific given event
showEvent : function (eventId)
{
  console.log("In showEvent :"+eventId);

  // Remove active class from all other header actions
  $('.action-active').removeClass("action-active");

  // Add loading img to show its loading
  $("#content").html('<img src="images/ajax-spinner.gif"></img>');

  // Get event from collection by id
  var evnt = App.eventsForCollection.get(eventId).toJSON();

  console.log(evnt);

  // Update display
  App.createView($("#event-template").html(), evnt);  
},

/**
 * Gets template, comile it and fills data. Updates display.
 */
getTemplate : function (tmplt,data)
{
  //Compile the template​
  var theTemplate = Handlebars.compile (tmplt);     

  // Return compiled tmplt with data
  return theTemplate(data); 
}
};