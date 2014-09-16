angular.module('ticket.services', ['ticket.config'])
// DB wrapper
/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('localTicketFactory', function() {
  return {
    all: function() {
      var ticketString = window.localStorage['tickets'];
      if(ticketString) {
        tickets = angular.fromJson(ticketString);
        tickets.sort(function(a, b){return b-a});
        return tickets;
      }
      return [];
    },
    save: function(tickets) {
      window.localStorage['tickets'] = angular.toJson(tickets);
    },
    add: function(ticket) {
      t = this.all();
      i = t.indexOf(ticket);
      if (i > -1){
          alert("ticket già segnato");
      } else {
         t.push(ticket);
      }
      this.save(t);
    },
    remove: function(ticket) {
      t = this.all();
      i = t.indexOf(ticket);
      if (i > -1) {
          t.splice(i, 1);
      }
      this.save(t);

    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    }/*,
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }*/
  }
}) 

.factory('Util', function(){
  return{

    formatDateForDB: function (day, month, year){
      var dayFormatted = '';
      var dd='';
      var mm='';
      var yyyy=year;
      if (day < 10){
        dd = '0'+day;
      } else {
        dd = day;
      }

      if ( (month) < 10){
        mm='0'+(month);

      } else {
        mm=month;
      }

      dayFormatted = yyyy+''+mm+''+dd;
      return dayFormatted;
    },

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
            var lastDayOfMonth = new Date(year, month , 0);
            
            for (i = 0; i < lastDayOfMonth.getDate(); i++){

              var date = new Date(year,month,(i+1));
              var jsonDate = this.renderDay(date);
              monthSlides.push(jsonDate);


            }
            return monthSlides;


   },

   toYYYYMMDD: function(ticket){
      var year = ticket.yyyy;

      var month = ''; month = ticket.mm;
      var day = ''; day = ticket.dd;
      if (month < 10) {month='0'+month} ;
      
      if (day < 10) {day='0'+day} ;
      
      var data = year+''+month+''+day;

      return data;
   },

   toDate : function(yyyymmdd){
      var year = yyyymmdd.substring(0,4);
      var month = yyyymmdd.substring(4,6);
      if (month.substring(0,1) == '0') {month = month.substring(1,2)}
      var day = yyyymmdd.substring(6,8);
      if (day.substring(0,1) == '0') {day = day.substring(1,2)}

      var data = new Date(year, (month-1), day);
      return data;
   },

   renderDay : function(day){

      var todayName   = this.getDayName(day.getDay());
      var todayMonth  = this.getMonthName(day.getMonth());
      var todayNumber = day.getDate();
      var vdd = day.getDate();
      var vmm = (day.getMonth()+1);
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
});