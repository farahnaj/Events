 var eventsApp = angular.module("eventsApp", ['ngRoute']);

 eventsApp.config(['$routeProvider',
     function($routeProvider) {
         $routeProvider.
         when('/gridView', {
             templateUrl: 'gridView.htm',
             controller: 'GridViewController'
         }).
         when('/listView', {
             templateUrl: 'listView.htm',
             controller: 'ListViewController'
         }).
         when('/calendarView', {
             templateUrl: 'calendarView.htm',
             controller: 'EventController'
         }).
         when('/eventView/:eventId', {
             templateUrl: 'eventView.htm',
             controller: 'EventViewController'
         }).
         when('/formView/:eventId', {
             templateUrl: 'formView.htm',
             controller: 'FormViewController'
         }).
         otherwise({
             redirectTo: '/gridView'
         });
     }
 ]);

 eventsApp.run(function($rootScope, $interval) {
     $rootScope.AssignedDate = Date; // 'Date' on home page in nav bar
     $rootScope.MainHeading = "Upcoming Events"; // Heading of main content

     $interval(function() {
         // nothing is required here, interval triggers digest automaticaly
     }, 1000)
 });

 // Global action like add event, display profile name
 eventsApp.controller('EventController', function($rootScope, $scope) {
     $scope.events = {};
     $scope.events.name = "FarahnajI";
     $scope.events.eventsList = eventsJSON;

     // Changes main content heading
     $rootScope.MainHeading = "Upcoming Events";

     // Change active class of header action
     AppOperations.changeClass("#show-calendar");

     // Click event for displying empty form with next id in url
     $scope.addEvent = function() {
         // Changes main content heading
         $rootScope.MainHeading = "New Event"

         // Gets next id
         var id = parseInt(eventsJSON[eventsJSON.length - 1].id);
         var newId = id + 1

         // Shows empty form
         window.location = '#/formView/' + newId;
     };
 });

 // Displays events in Grid view
 eventsApp.controller('GridViewController', function($rootScope, $scope) {
     // Get data
     $scope.events = {};
     $scope.events.eventsList = eventsJSON;

     // Changes main content heading
     $rootScope.MainHeading = "Upcoming Events";

     // To display single event by selected id
     $scope.showEvent = function(selectedEventID) {
         window.location = '#/eventView/' + selectedEventID;
     };

     // Change active class of header action
     AppOperations.changeClass("#show-grid");
 });

// Displays events in List view
 eventsApp.controller('ListViewController', function($rootScope, $scope) {
     // Get data
     $scope.events = {};
     $scope.events.eventsList = eventsJSON;
     $scope.predicate = '-id';

     // Changes main content heading
     $rootScope.MainHeading = "Upcoming Events";

     // To display single event by selected id
     $scope.showEvent = function(selectedEventID) {
         window.location = '#/eventView/' + selectedEventID;
     };

     // Change active class of header action
     AppOperations.changeClass("#show-list");
 });

// Displays single selected event in event view
 eventsApp.controller('EventViewController', function($rootScope, $scope, $location, $routeParams) {
     // Gets id of event from route
     $scope.eventId = $routeParams.eventId;

     // Gets event from events json array by id
     $scope.event = AppOperations.getEvent($scope.eventId);

     // Changes main content heading
     $rootScope.MainHeading = "Event";

     // Remove active class from all other header actions
     $jQ('.action-active').removeClass("action-active");

    // Deletes event
     $scope.event.deleteEvent = function() {
         console.log($scope.event);

         // hide modal from display
         $jQ("#confirmModal").modal('hide');

         // remove modal backdrop from display
         $jQ(".modal-backdrop").remove();

         // Remove current event from global json array of event
         eventsJSON = $jQ.grep(eventsJSON, function(e) {
             return e.id !== $scope.event.id
         });

         // Go to list view after delete
         window.location = '#/listView';
     };

     // To display single event by selected id for editing in form
     $scope.event.editEvent = function() {
         console.log($scope.event);

         // Changes main content heading
         $rootScope.MainHeading = "Edit Event";
         
         // Display form with event details
         window.location = '#/formView/' + $scope.eventId;
     };
 });

 // Displays form with details of selected event or empty for new event
 eventsApp.controller('FormViewController', function($scope, $location, $routeParams) {
     // Gets event's id from route
     $scope.eventId = $routeParams.eventId;
     console.log("form view");
     console.log($scope.eventId);

     // Get selected event by id
     var currentEvent = AppOperations.getEvent($scope.eventId);

     // If event not found means new event
     if (!currentEvent) {
         // Create empty event
         currentEvent = {};

         // Heading for panel
         currentEvent.status = "New";

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
     } else
         currentEvent.status = "Edit";

     // Current event may be selected event or new event
     $scope.event = currentEvent;
     console.log($scope.event);
     console.log($scope.eventId);

    // After modifications or filling new details will save event
     $scope.save = function(event, isValid) {
         console.log(event);
         console.log(isValid);

         // check to make sure the form is completely valid
         if (!isValid) {
             alert("Fill proper details.");
             return;
         }

         // Event with id means event updated
         if (event.id) {
             var i = 0;

             // Search event in events json and update it with new values
             for (i = 0; i < eventsJSON.length; i++) {
                 if (eventsJSON[i].id === event.id) {
                     eventsJSON[i] = event;
                     break;
                 }
             }
         } else {
             // Assign new id to new event
             event.id = parseInt(eventsJSON[eventsJSON.length - 1].id) + 1;
             
             // Add new event in events json array
             eventsJSON[eventsJSON.length] = event;
         }

         // Show event in event view
         window.location = '#/eventView/' + $scope.eventId;
     };
 });