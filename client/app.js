angular.module('halp-desk', [
  'halp-desk.factories',
  'halp-desk.open',
  'halp-desk.archive',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './open/open.html',
    controller: 'OpenController'
  })
  .when('/open', {
    templateUrl: './open/open.html',
    controller: 'OpenController'
  })
  .when('/archive', {
    templateUrl: './archive/archive.html',
    controller: 'ArchiveController'
  })
  .otherwise({
    redirectTo: '/open'
  });
});
