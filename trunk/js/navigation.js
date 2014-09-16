angular.module('ticket.navigation', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
      .state('ticket', {
        url: '/uno',
        templateUrl : 'ticket.html',
        controller : "ticketCtrl" 
      })
      .state('listaTicket', {
        url: '/due',
        templateUrl: 'listaTicket.html',
        controller : "listaTicketCtrl" 
      })
  
  $urlRouterProvider.otherwise("/uno");
})