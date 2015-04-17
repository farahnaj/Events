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
         when('/eventView/:eventIndex', {
             templateUrl: 'eventView.htm',
             controller: 'EventViewController'
         }).
         when('/formView/:eventIndex', {
             templateUrl: 'formView.htm',
             controller: 'FormViewController'
         }).
         otherwise({
             redirectTo: '/gridView'
         });
     }
 ]);

eventsApp.run(function($rootScope,$interval){
    $rootScope.AssignedDate = Date; // 'Date' could be assigned too of course:)
    
    $interval(function(){
        // nothing is required here, interval triggers digest automaticaly
    },1000)
});

 eventsApp.controller('EventController', function($scope) {
     $scope.events = {};
     $scope.events.name = "FarahnajI";
     $scope.events.eventsList = eventsJSON;

     // Change active class of header action
     AppOperations.changeClass("#show-calendar");

     $scope.addEvent = function() {
        var id = parseInt(eventsJSON[eventsJSON.length - 1].id);
        var index = id + 1
        window.location = '#/formView/' + index;
     };
 });

 eventsApp.controller('GridViewController', function($scope) {
     $scope.events = {};
     $scope.events.eventsList = eventsJSON;
     $scope.showEvent = function(selectedEvent) {
         var selectedEventIndex = eventsJSON.indexOf(selectedEvent);
         window.location = '#/eventView/' + selectedEventIndex;
     };

     // Change active class of header action
     AppOperations.changeClass("#show-grid");
 });

 eventsApp.controller('ListViewController', function($scope) {
     $scope.events = {};
     $scope.events.eventsList = eventsJSON;
     $scope.showEvent = function(selectedEvent) {
         var selectedEventIndex = eventsJSON.indexOf(selectedEvent);
         window.location = '#/eventView/' + selectedEventIndex;
     };

     // Change active class of header action
     AppOperations.changeClass("#show-list");
 });

 eventsApp.controller('EventViewController', function($scope, $location, $routeParams) {
     $scope.eventIndex = $routeParams.eventIndex;
     $scope.event = eventsJSON[$scope.eventIndex];

     // Remove active class from all other header actions
     $('.action-active').removeClass("action-active");

     $scope.event.deleteEvent = function() {
         console.log($scope.event);
         
         // Remove current event from global json array of event
         eventsJSON = $.grep(eventsJSON, function(e) {
             return e.id != $scope.event.id
         });

         // Go to list view after delete
         window.location = '#/listView';

         // remove modal backdrop from display
         $(".modal-backdrop").remove();
     };

     $scope.event.editEvent = function() {
         console.log($scope.event);
         window.location = '#/formView/' + $scope.eventIndex;
     };
 });

 eventsApp.controller('FormViewController', function($scope, $location, $routeParams) {
     $scope.eventIndex = $routeParams.eventIndex;
     console.log("form view");
     console.log($scope.eventIndex);
     var currentEvent =  eventsJSON[$scope.eventIndex];
     if(!currentEvent)
       {
        currentEvent = {};
        $scope.eventIndex--;
        currentEvent.status = "New";
        currentEvent.image = "images/na.png";
        
        // Set current date
        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        currentEvent.date = year+'-'+((monthIndex <10) ? ("0"+monthIndex) : monthIndex )+'-'+((day <10) ? ("0"+day) : day );

        // Set current time
        var hr = date.getHours();
        var min = date.getMinutes();
        currentEvent.time = ((hr <10) ? ("0"+hr) : hr )+':'+((min <10) ? ("0"+min) : min );
       }
     else
        currentEvent.status = "Edit";
     $scope.event = currentEvent;
     console.log($scope.event);
     console.log($scope.eventIndex);

     $scope.save = function(event,isValid) {
         console.log(event);
         console.log(isValid);
     
         // check to make sure the form is completely valid
         if(!isValid)
         {
            alert("Fill proper details.");
            return;
         }

         if (event.id) {
             var i = 0;
             for (i = 0; i < eventsJSON.length; i++) {
                 if (eventsJSON[i].id === event.id) {
                     eventsJSON[i] = event;
                     break;
                 }
             }
         } else {
             event.id = parseInt(eventsJSON[eventsJSON.length - 1].id) + 1;
             eventsJSON[eventsJSON.length] = event;
         }

          window.location = '#/eventView/' + $scope.eventIndex;
     };
 });