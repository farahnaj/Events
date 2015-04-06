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

  // Set table
  var tmplt = '<div class="table-responsive"><table class="table table-striped"><thead><tr><th>#</th><th>Event</th><th>Title</th><th>Date</th><th>Time</th><th>Venue</th></tr></thead><tbody>';

  // Fill table
  for (var i in eventsJSON) {
    var e = '<tr class="event c-p" title="'+eventsJSON[i].description+'" id="'+eventsJSON[i].id+'"><td>'+eventsJSON[i].id+'</td><td><img class="small-img" src="'+eventsJSON[i].image+'"></img></td><td>'+eventsJSON[i].title+'</td><td>'+eventsJSON[i].date+'</td><td>'+eventsJSON[i].time+'</td><td>'+eventsJSON[i].venue+'</td></tr>';
    tmplt += e;
   }

  // Set table end
  tmplt +='</tbody></table></div>';

  // Add to content
  $("#content").html(tmplt);

  // Activate click event of Event
  assignClickEvent();
}

/**
 * Display events in grid
 */
function displayGrid()
{
  console.log("In displayGrid");

  // Set grid
  var tmplt = '<div class="row">';

  // Fill grid
  for (var i in eventsJSON) {
    var e = '<div class="col-xs-6 col-lg-4"><a class="popoverData" href="#" data-content="'+eventsJSON[i].description+' at '+eventsJSON[i].venue+' on '+ eventsJSON[i].date+','+eventsJSON[i].time+'." rel="popover" data-placement="bottom" data-original-title="'+eventsJSON[i].title+'" data-trigger="hover"><img class="large-img event" id="'+eventsJSON[i].id+'" src="'+eventsJSON[i].image+'"></img></a></div>';
    tmplt += e;
   }

  // Set grid end
  tmplt +='</div>';

  // Add to content
  $("#content").html(tmplt);

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

  // Set event div
  var tmplt = '<div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">'+evnt.title+'</h3></div><div class="panel-body"><img class="large-img" src="'+evnt.image+'"></img><br><b>Description: </b>'+evnt.description+'<br><b>Date: </b>'+evnt.date+'<br><b>Time: </b>'+evnt.time+'<br><b>Venue: </b>'+evnt.venue+'</div></div>';

  // Add to content
  $("#content").html(tmplt);
}