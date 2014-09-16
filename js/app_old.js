// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ticket', ['ionic'])

.config(function ($compileProvider){
  // Set the whitelist for certain URLs just to be safe
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('page1', {
    url: '/1',
    templateUrl : 'giorno.html',
    controller : 'ticketCtrl' 
  })
  .state('page2', {
    url: '/2',
    templateUrl: 'listaTicket.html',
    controller : 'listaTicketCtrl' 
  })

  
  $urlRouterProvider.otherwise("/1");
})

.controller('Page3Ctrl', function($scope) {
  
})

.factory('ticketFactory', function() {
  return {

    all: function() {
      var ticketString = window.localStorage['tickets'];
      
      if(typeof ticketString != 'undefined') {
        return angular.fromJson(ticketString);
      }
      
      return [];

    },

    add : function(ticket){
      var tickets = this.all();
      tickets.push(ticket);
      this.save(tickets); 
    },

    save: function(tickets) {
      window.localStorage['tickets'] = angular.toJson(tickets);
    }

  }
})

.factory('Util', function(){
  return{


    getDayName: function (dayNo){
      var dayName = '';
      var dayNames = ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato','domenica'];
      return dayNames[dayNo];
    },


   getMonthName: function (monthNo){
      var monthName = '';
      var monthNames = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
      return monthNames[monthNo];
   }, 

   today: function() {
      var vtoday = new Date();

      return this.renderDay(vtoday);

   },
  
   yesterday: function(today) {
      var day = new Date(today.yyyy,today.mm,today.dd);

      day.setDate(day.getDate()-1);
      return this.renderDay(day);

   },
  
   tomorrow: function(today) {
      var day = new Date(today.yyyy,today.mm,today.dd);
      day.setDate(day.getDate()+1);
      return this.renderDay(day);


   },

   createMonth : function(month, year){
            var monthSlides = [];
            var lastDayOfMonth = new Date(year, month + 1, 0);
            
            for (i = 0; i < lastDayOfMonth.getDate(); i++){

              var date = new Date(year,month,(i+1));
              var jsonDate = this.renderDay(date);
              monthSlides.push(jsonDate);


            }
            return monthSlides;


   },

   renderDay : function(day){

      var todayName   = this.getDayName(day.getDay());
      var todayMonth  = this.getMonthName(day.getMonth());
      var todayNumber = day.getDate();
      var vdd = day.getDate();
      var vmm = day.getMonth();
      var vyyyy = day.getFullYear();
      var todayYYYYMMDD = day.getFullYear+day.getMonth+day.getDay;

      return {  dd : vdd
              , mm : vmm
              , yyyy : vyyyy 
              , nomeMese : todayMonth
              , nomeGiorno : todayName
              , numeroGiorno : todayNumber } ;
   }




  }
})

.controller('listaTicketCtrl', function($scope,  Util, ticketFactory) {

  $scope.listaTicket = ticketFactory.all();


})

.controller('ticketCtrl', function($scope,  Util, ticketFactory,$ionicSlideBoxDelegate,$timeout) {

  if(typeof $scope.slides == 'undefined'){
    $scope.slides=[];
    
    $scope.oggi = Util.today();
    $scope.slides = Util.createMonth($scope.oggi.mm, $scope.oggi.yyyy);
    $currentSlideIndex = 0;
  }

  $scope.insertTicket = function() {
      ticketFactory.add($scope.slides[$currentSlideIndex]);
  };

  $scope.incrementDate = function() {

      var dd1 = new Date($scope.oggi.yyyy,$scope.oggi.mm,$scope.oggi.dd);
      var nextDay = new Date(dd1);
      nextDay.setDate(nextDay.getDate()+1);      
      $scope.oggi = Util.renderDay(nextDay);
  };

  $scope.decrementDate = function() {

      var dd1 = new Date($scope.oggi.yyyy,$scope.oggi.mm,$scope.oggi.dd);
      var nextDay = new Date(dd1);
      nextDay.setDate(nextDay.getDate()-1);
      $scope.oggi = Util.renderDay(nextDay);

  };


 
  $scope.slideChanged = function(index) {
      $currentSlideIndex = index;

  } 
    /*
  $timeout(function() {
     
      $ionicSlideBoxDelegate.slide(9,1000);
      $ionicSlideBoxDelegate.update();
  },1000)
*/


});







