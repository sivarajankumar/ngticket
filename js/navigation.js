angular.module('ticket.navigation', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
      .state('ticket', {
        url: '/uno:year?month?day',
        templateUrl : 'partials/ticket.html',
        controller : "ticketCtrl" 
      })
      .state('listaTicket', {
        url: '/due',
        templateUrl: 'partials/listaTicket.html',
        controller : "listaTicketCtrl" 
      })
      .state('calendario', {
        url: '/tre',
        templateUrl: 'partials/calendario.html',
        controller : "CalendarCtrl"
      })
  
  $urlRouterProvider.otherwise("/uno");
})