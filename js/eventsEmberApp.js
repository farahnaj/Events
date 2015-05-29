Events = Ember.Application.create();

Events.Router.map(function() {
  this.resource('gridview');
  this.resource('listview');
});

Events.GridviewRoute = Ember.Route.extend({
  model: function() {
    return eventsJSON;
  }
});

Events.ListviewRoute = Ember.Route.extend({
  model: function() {
    return eventsJSON;
  }
});

