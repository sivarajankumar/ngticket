angular.module('ticket.config', [])
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
            name: 'ticket',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'data', type: 'text'}
            ]
        }
    ]
});