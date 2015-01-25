angular.module('ticket.controllers', ['ticket.services'])

.controller('listaTicketCtrl', function($scope ,  Util, localTicketFactory) {


  function refresh () { 

    $scope.tickets = [''];

    $scope.groups = [''];

    tickets = localTicketFactory.all();

    var currentYearMonth = '';
    
    iGroup = -1;

    for (i = 0; i < tickets.length; i++){

        var dataTicket = Util.toDate(tickets[i]);
        var ticket = Util.renderDay(dataTicket);

        if (ticket.yyyy+''+ticket.mm != currentYearMonth ){ // primo gruppo
          iGroup++;
          $scope.groups[iGroup]={
              yearMonth : ticket.yyyy+''+ticket.mm,
              yyyy : ticket.yyyy,
              month : ticket.nomeMese, 
              items: []
          };

          currentYearMonth = ticket.yyyy+''+ticket.mm;
        }

        $scope.groups[iGroup].items.push(ticket);

        //$scope.tickets.push(ticket);    
    }
        
        
      
  };
  
  refresh();



  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $scope.remove = function(ticket) {
      var ticketDaCancellare = Util.toYYYYMMDD(ticket);
      confirm('cancello ticket per '+ticket.nomeGiorno+ ' '+ticket.numeroGiorno+' ?');      
      localTicketFactory.remove(ticketDaCancellare);
      refresh();
  };

  

})



.controller('ticketCtrl', function($scope, $stateParams,  Util, localTicketFactory,$ionicSlideBoxDelegate,$timeout,$state,HardwareBackButtonManager) {

  var year = $stateParams.year; //getting fooVal
  var month = $stateParams.month; //getting barVal
  var day = $stateParams.day; //getting barVal
  //..
  $scope.state = $state.current
  $scope.params = $stateParams; 

  console.log(year);
  console.log(month);
  console.log(day);

  if (day == null){
       $scope.oggi = Util.today();
  } else {
       $scope.oggi = Util.getDayForTicket(year,month,day);
  }

  $scope.hasTicket = function(){

       mese = ($scope.oggi.mm<10)?'0'+$scope.oggi.mm:$scope.oggi.mm;
       giorno = ($scope.oggi.dd<10)?'0'+$scope.oggi.dd:$scope.oggi.dd+'';

       tickets =  localTicketFactory.ticketDays($scope.oggi.yyyy+''+mese);
       if (tickets.indexOf(giorno) > -1){
           return true;
       }
       return false;

  }

  $scope.insertTicket = function() {

      var giornoDaInserire = $scope.oggi;
      var stringaDaInserire = Util.formatDateForDB (giornoDaInserire.dd,giornoDaInserire.mm,giornoDaInserire.yyyy);

      localTicketFactory.add(stringaDaInserire);

      $state.transitionTo("calendario");
  };

  $scope.removeTicket = function() {

      var giornoDaInserire = $scope.oggi;
      var stringaDaInserire = Util.formatDateForDB (giornoDaInserire.dd,giornoDaInserire.mm,giornoDaInserire.yyyy);

      localTicketFactory.remove(stringaDaInserire);

      $state.transitionTo("calendario");
  };


  HardwareBackButtonManager.disable();



})





.controller('CalendarCtrl', function($scope, $state, $stateParams, Util) {

    cal_current_date = new Date(); 

    var month;
    var year;

    month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
    year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;

    $scope.calendario = Util.getCalendar(year,month);


    $scope.nextMonth = function() {
     

         var firstDay = new Date($scope.calendario.anno, $scope.calendario.month, 1);
         
         if (firstDay.getMonth() == 11) {
              var current = new Date(firstDay.getFullYear() + 1, 0, 1);
         } else {
              var current = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 1);
         }


         var month;
         var year;

         month = (isNaN(month) || month == null) ? current.getMonth() : month;
         year  = (isNaN(year) || year == null) ? current.getFullYear() : year;

         $scope.calendario = Util.getCalendar(year,month);

    };

    $scope.previousMonth = function() {

         var firstDay = new Date($scope.calendario.anno, $scope.calendario.month, 1);
         
         if (firstDay.getMonth() == 0) {
              var current = new Date(firstDay.getFullYear() - 1, 11, 1);
         } else {
              var current = new Date(firstDay.getFullYear(), firstDay.getMonth() - 1, 1);
         }


         var month;
         var year;

         month = (isNaN(month) || month == null) ? current.getMonth() : month;
         year  = (isNaN(year) || year == null) ? current.getFullYear() : year;

         $scope.calendario = Util.getCalendar(year,month);
         
         
    };
  }
  

    
);

