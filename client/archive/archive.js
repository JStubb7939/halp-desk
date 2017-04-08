angular.module('halp-desk.archive', [])

.controller('ArchiveController', function ($scope, $location, $route, Tickets) {
  $scope.data = {};

  $scope.getTickets = function() {
    Tickets.getArchive()
    .then(function(archivedTickets) {
      $scope.data.tickets = archivedTickets;
    })
    .catch(function(error) {
      console.error(error);
    });
  };


  $scope.getTickets();

  $scope.openTicket = function(ticket) {
    Tickets.updateTicket(ticket)
      .then(function() {
        $route.reload();
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.deleteTicket = function(ticket) {
    Tickets.deleteTicket(ticket)
      .then(function() {
        $route.reload();
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.name = 'ArchiveController';
});
