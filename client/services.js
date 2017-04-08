angular.module('halp-desk.factories', [])

.factory('Tickets', function ($http) {

  var getOpen = function() {
    return $http({
      method: 'GET',
      url: '/api/open'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var getArchive = function() {
    return $http({
      method: 'GET',
      url: '/api/archive'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var submitTicket = function(ticket) {
    return $http({
      method: 'POST',
      url: '/api/ticket',
      data: ticket
    });
  };

  var updateTicket = function(data) {
    return $http({
      method: 'PUT',
      url: '/api/ticket',
      data: data
    });
  };

  var deleteTicket = function(ticket) {
    return $http({
      method: 'POST',
      url: '/api/delete',
      data: ticket
    });
  };

  return {
    getOpen: getOpen,
    getArchive: getArchive,
    submitTicket: submitTicket,
    updateTicket: updateTicket,
    deleteTicket: deleteTicket
  };
});
