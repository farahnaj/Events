var App = {};

(function () {

// Model defined
App.EventModel = Backbone.Model.extend({
 
    defaults:{
    "id": eventsJSON.length+1,
    "title": "Basic Event",
    "venue": "Panjagutta, Hyderabad",
    "date": "31 Dec 2015",
    "time": "10:00 AM",
    "description": "Not avilable...",    
    "image": "images/na.jpg"
    },
 
    initialize: function() {
        console.log('New event created...');
    }
 
});

// Collection declare
App.EventCollection = Backbone.Collection.extend({
 
    model: App.EventModel,
 
    initialize: function() {
        console.log('New collection initialized...');
    }
});  

// Assign event array to collection
App.eventsForCollection = new App.EventCollection(eventsJSON); 

// Create View
//createView($('#events-grid-template').html() , App.eventsForCollection.toJSON())

})(jQuery);


// Create view and display it
App.createView = function (tmplt, data)
{
  App.EventListView = Backbone.View.extend({
    el: '#content',
 
    initialize:function(){
        this.render();
    },
    events: {
        "click .event": "clicked",
        "click .event-overlay": "clicked"
    },
    clicked: function(e){
        e.stopPropagation();
        e.preventDefault();

        var id = $(e.currentTarget).data("id");
        AppOperations.showEvent(id);
    },
    render: function () {       
        var html = AppOperations.getTemplate(tmplt,data);
        this.$el.html(html);
    }
  });
 App.eventsListView = new App.EventListView();
}