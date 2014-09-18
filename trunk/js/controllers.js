angular.module('ticket.controllers', ['ticket.services'])

.controller('listaTicketCtrl', function($scope,  Util, localTicketFactory) {


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



.controller('ticketCtrl', function($scope,  Util, localTicketFactory,$ionicSlideBoxDelegate,$timeout,$state, $stateParams ) {



  console.log($stateParams.giorno);
  console.log($stateParams.mese);
  console.log($stateParams.anno);

  var giornoSelezionato;

  if ($stateParams.giorno == ''){
      giornoSelezionato = new Date();
  } else {
      giornoSelezionato = new Date($stateParams.giorno,$stateParams.mese,$stateParams.anno);
  }

  if(typeof $scope.slides == 'undefined'){
    $scope.slides=[];
    
    $scope.oggi = Util.today();
    mese = ($scope.oggi.mm - 1);
    $scope.slides = Util.createMonth( mese  , $scope.oggi.yyyy);
    $currentSlideIndex = ($scope.oggi.dd - 1);

  }




  $scope.insertTicket = function() {

      var giornoDaInserire = $scope.slides[$currentSlideIndex];
      var stringaDaInserire = Util.formatDateForDB (giornoDaInserire.dd,giornoDaInserire.mm,giornoDaInserire.yyyy);

      localTicketFactory.add(stringaDaInserire);
      $state.transitionTo("listaTicket");
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



})





.controller('CalendarCtrl', function($scope, Util) {

    // these are labels for the days of the week
    // these are labels for the days of the week
    cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // these are human-readable month name labels, in order
    cal_months_labels = ['January', 'February', 'March', 'April',
                         'May', 'June', 'July', 'August', 'September',
                         'October', 'November', 'December'];

    // these are the days of the week for each month, in order
    cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    $scope.calendario = {
             anno : ''
           , mese : ''
           , meseNN : 0
           , giorni : []

    };

    
// this is the current date
    cal_current_date = new Date(); 

    var month ;
    var year;

    month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
    year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;


    $scope.calendario = Util.getCalendar(year,month);
    
    $scope.nextMonth = function() {

      var anno = $scope.calendario.anno;
      var mese = $scope.calendario.meseNN;

      var now = new Date(anno, mese, 1);

      

      if (now.getMonth() == 11) {
          var current = new Date(now.getFullYear() + 1, 0, 1);
      } else {
          var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      }

      var year = current.getFullYear();
      var month = current.getMonth();

      $scope.calendario = Util.getCalendar(year,month);

      


    }; 

    $scope.prevMonth = function() {

      var anno = $scope.calendario.anno;
      var mese = $scope.calendario.meseNN;

      var now = new Date(anno, mese, 1);

      

      if (now.getMonth() == 0) {
          var current = new Date(now.getFullYear() - 1, 11, 1);
      } else {
          var current = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      }

      var year = current.getFullYear();
      var month = current.getMonth();

      $scope.calendario = Util.getCalendar(year,month);


    };  

    
});

