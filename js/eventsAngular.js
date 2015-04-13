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
         }]);

         eventsApp.controller('EventController', function($scope) {
            $scope.events = {};
            $scope.events.name = "FarahnajI";
            $scope.events.eventsList = eventsJSON;

            // Change active class of header action
            AppOperations.changeClass("#show-calendar");
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
            $scope.event =  eventsJSON[$scope.eventIndex];

            // Remove active class from all other header actions
            $('.action-active').removeClass("action-active");

            $scope.event.deleteEvent = function() {
               console.log($scope.event);
               if (!confirm("Are you sure you want to delete event?"))
                   return;
               eventsJSON = $.grep(eventsJSON, function(e) { return e.id !=  $scope.event.id });
               window.location = '#/listView'; 
            };

            $scope.event.editEvent = function() {
               console.log($scope.event);
               window.location = '#/formView/'+ $scope.eventIndex; 
            };
         });

         eventsApp.controller('FormViewController', function($scope, $location, $routeParams) {
           $scope.eventIndex = $routeParams.eventIndex;
           $scope.event =  eventsJSON[$scope.eventIndex];
           console.log($scope.event);

           $scope.event.save = function(event,isValid) {
               console.log(event);

               // check to make sure the form is completely valid
            if (isValid) {
                alert('our form is amazing');
            }
            else
               return;

               if(event.id)
               {
                  var i = 0;
                   for(i=0;i<eventsJSON.length;i++)
                   {
                     if(eventsJSON[i].id == event.id)
                        {
                           eventsJSON[i] = event;
                           break;
                        }
                   }
               }
               else
                  {
                     event.id = eventsJSON[eventsJSON.length -1].id +1;
                     eventsJSON[eventsJSON.length] = event;
                  }             
            };
         });