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
            var eventIndex = $routeParams.eventIndex;
            $scope.event =  eventsJSON[eventIndex];

            // Remove active class from all other header actions
            $('.action-active').removeClass("action-active");
         });