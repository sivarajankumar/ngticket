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



.controller('ticketCtrl', function($scope,  Util, localTicketFactory,$ionicSlideBoxDelegate,$timeout,$state) {



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





.controller('CalendarCtrl', function($scope) {

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
           , giorni : []

    };

// this is the current date
    cal_current_date = new Date(); 

    var month ;
    var year;

    month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
   year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;



  // get first day of month
  var firstDay = new Date(year, month, 1);
  var startingDay = firstDay.getDay();
  
  // find number of days in month
  var monthLength = cal_days_in_month[month];
  
  // compensate for leap year
  if (month == 1) { // February only!
    if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
      monthLength = 29;
    }
  }
  
  // do the header
  var monthName = cal_months_labels[month]
  
  
  $scope.calendario.anno = year;
  $scope.calendario.mese = monthName;
  
  
  // fill in the days
  var day = 1;
  // this loop is for is weeks (rows)
  for (var i = 0; i < 9; i++) {
    // this loop is for weekdays (cells)
    for (var j = 0; j <= 6; j++) { 
      
      if (day <= monthLength && (i > 0 || j >= startingDay)) {
        $scope.calendario.giorni.push(''+day+'');
        day++;
      } else {
        $scope.calendario.giorni.push('');
      }
      
    }
    // stop making rows if we've run out of days
    if (day > monthLength) {
      break;
    } 
  }
  


    
});

