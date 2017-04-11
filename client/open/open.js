angular.module('halp-desk.open', [])

.controller('OpenController', function ($scope, $location, $route, Tickets) {
  $scope.data = {};

  $scope.getTickets = function() {
    Tickets.getOpen()
      .then(function(openTickets) {
        $scope.data.tickets = openTickets;
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.getTickets();

  $scope.submitTicket = function(ticket) {
    $scope.loading = true;
    Tickets.submitTicket({
      author: ticket.author,
      subject: ticket.subject,
      issue: ticket.issue,
      chatUrl: ticket.chatUrl,
      archive: false,
      createdAt: new Date(),
      status: true
    })
      .then(function() {
        $scope.loading = false;
        $route.reload();
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.archiveTicket = function(ticket) {
    Tickets.updateTicket(ticket)
      .then(function() {
        $route.reload();
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.deleteTicket = function(ticket) {
    console.dir(ticket);
    Tickets.deleteTicket(ticket)
      .then(function() {
        $route.reload();
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.name = 'OpenController';
});
