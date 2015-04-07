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
  updateDisplay($("#events-list-template").html(), eventsJSON);

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
  updateDisplay($("#events-grid-template").html(), eventsJSON);

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

  var evnt = eventsJSON[eventId-1];

  console.log(evnt);

  // Update display
  updateDisplay($("#event-template").html(), evnt);  
}

/**
 * Gets template, comile it and fills data. Updates display.
 */
function updateDisplay(tmplt,data)
{
  //Compile the template​
  var theTemplate = Handlebars.compile (tmplt);     

  // Add to content
  $("#content").html(theTemplate(data)); 
}