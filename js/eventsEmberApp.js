Events = Ember.Application.create();

Events.Router.map(function() {
    this.resource('gridview');
    this.resource('listview');
    this.resource('edit', {
        path: ':edit_id'
    });
    this.resource('event', {
        path: ':event_id'
    });
    this.resource('newevent');
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

Events.EventRoute = Ember.Route.extend({
    model: function(params) {
        console.log(params);
        return eventsJSON.findBy('id', parseInt(params.event_id));
    }
});

Events.EventController = Ember.ObjectController.extend({
    actions: {
        delete: function() {
            console.log("delete me");
            console.log(this);
            console.log(this.id);
            console.log(this.get('id'));
            var id = this.get('id');

            // hide modal from display
            $jQ("#confirmModal").modal('hide');

            // remove modal backdrop from display
            $jQ(".modal-backdrop").remove();

            // Remove current event from global json array of event
            eventsJSON = $jQ.grep(eventsJSON, function(e) {
                return e.id !== id;
            });

            // Go to list view after delete
            window.location = '#/listview';
        }
    }
});

Events.EditRoute = Ember.Route.extend({
    model: function(params) {
        console.log(params);
        return eventsJSON.findBy('id', parseInt(params.edit_id));
    }
});

Events.EditController = Ember.ObjectController.extend({
    actions: {
        save: function() {
            console.log("save me");
            console.log(this);
            console.log(this.id);
            console.log(this.get('id'));
            var id = this.get('id');

            if (id)
                window.location = '#/listview';
            else {
                // Add event
                window.location = '#/listview';
            }
        }
    }
});

Events.NeweventRoute = Ember.Route.extend({
    model: function(params) {
        console.log(params);

        // Create empty event
        currentEvent = {};

        // Default img for new event
        currentEvent.image = "images/na.png";

        // Set current date
        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        currentEvent.date = year + '-' + ((monthIndex < 10) ? ("0" + monthIndex) : monthIndex) + '-' + ((day < 10) ? ("0" + day) : day);

        // Set current time
        var hr = date.getHours();
        var min = date.getMinutes();
        currentEvent.time = ((hr < 10) ? ("0" + hr) : hr) + ':' + ((min < 10) ? ("0" + min) : min);
        return currentEvent;
    }
});

Events.NeweventController = Ember.ObjectController.extend({
    actions: {
        save: function() {
            console.log("save me");
            console.log(this);
            console.log(this.id);
            console.log(this.get('id'));
            var id = this.get('id');

            // Assign new id to new event
            this.id = parseInt(eventsJSON[eventsJSON.length - 1].id) + 1;

            // Add new event in events json array
            eventsJSON[eventsJSON.length] = this;

            // Show event in event view
            window.location = '#/listview';
        }
    }
});