angular.module('ticket.navigation', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
      .state('ticket', {
        url: '/uno:year?month?day',
        templateUrl : 'ticket.html',
        controller : "ticketCtrl" 
      })
      .state('listaTicket', {
        url: '/due',
        templateUrl: 'listaTicket.html',
        controller : "listaTicketCtrl" 
      })
      .state('calendario', {
        url: '/tre',
        templateUrl: 'calendario.html',
        controller : "CalendarCtrl"
      })
  
  $urlRouterProvider.otherwise("/uno");
})