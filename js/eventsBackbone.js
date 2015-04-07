var App = {};

$(function () {

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

});


// Create view and display it
function createView(tmplt, data)
{
App.EventListView = Backbone.View.extend({
    el: '#content',
 
    initialize:function(){
        this.render();
    },
    render: function () {       
        var html = updateDisplay(tmplt,data);
        this.$el.html(html);
    }
});
 
App.eventsListView = new App.EventListView();
}