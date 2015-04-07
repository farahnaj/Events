/* This code is with basic javascript,jquery,bootstrap, handlebar.js and backbone.js*/
/** 
 * As per selection , update display.
 */
function showView(viewIs)
{
  console.log("In showView " + viewIs);

  // Add loading img to show its loading
  $("#content").html('<img src="images/ajax-spinner.gif"></img>');

  if(viewIs == "show-list")
     displayList();    
  else if(viewIs == "show-grid")
     displayGrid();  
} 

/** 
 * Display events in list.
 */
function displayList()
{
  console.log("In displayList");

  // Update display
  createView($("#events-list-template").html(), App.eventsForCollection.toJSON());

  // Activate click event of Event
  assignClickEvent();
}

/**
 * Display events in grid
 */
function displayGrid()
{
  console.log("In displayGrid");

  // Update display
  createView($("#events-grid-template").html(), App.eventsForCollection.toJSON());

  // Activate popover
  $('.popoverData').popover();

  // Activate click event of Event
  assignClickEvent();
}

// Event for event
function assignClickEvent()
{
 $('.event').on("click", function(e){
        e.preventDefault();
       console.log("In event click");
       console.log($(this).attr("id"));


      // Remove active class from all other header actions
      $('.action-active').removeClass("action-active");

       // Display idividual event
       showEvent($(this).attr("id"));
    });  
}

// Show specific given event
function showEvent(eventId)
{
  console.log("In showEvent :"+eventId);

  // Add loading img to show its loading
  $("#content").html('<img src="images/ajax-spinner.gif"></img>');

  // Get event from collection by id
  var evnt = App.eventsForCollection.get(eventId).toJSON();

  console.log(evnt);

  // Update display
  createView($("#event-template").html(), evnt);  
}

/**
 * Gets template, comile it and fills data. Updates display.
 */
function updateDisplay(tmplt,data)
{
  //Compile the template​
  var theTemplate = Handlebars.compile (tmplt);     

  // Return compiled tmplt with data
  return theTemplate(data); 
}