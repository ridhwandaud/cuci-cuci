angular.module('details.controller', [])

.controller('DetailsCtrl', function($scope,$stateParams,SERVER_CONFIG,$http) {
  $http.get(SERVER_CONFIG.api_path + '/task/' + $stateParams.token).then(function(data){
  	$scope.task = data.data;
  })
})