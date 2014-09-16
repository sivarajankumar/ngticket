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



  if(typeof $scope.slidesYear == 'undefined'){
    $scope.slidesYear=['2010','2011','2012','2010','2010','2010','2010',];
    
    $scope.oggi = Util.today();
    mese = ($scope.oggi.mm - 1);
    $scope.slides = Util.createMonth( mese  , $scope.oggi.yyyy);
    $currentSlideIndex = $scope.oggi.dd

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



});


/*



.controller('DocumentCtrl', function($scope, Document) {
    $scope.documents = [];
    $scope.document = null;
    // Get all the documents
    Document.all().then(function(documents){
        $scope.documents = documents;
    });
    // Get one document, example with id = 2
    Document.getById(2).then(function(document) {
        $scope.document = document;
    });
});

*/