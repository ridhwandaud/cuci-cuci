angular.module('dashboard.controller', [])

.controller('DashboardCtrl', function($scope,$ionicLoading,$q,$ionicModal,$http,SERVER_CONFIG,$state) {

  $scope.createNewTask = function(task)
  {
    $http.post(SERVER_CONFIG.api_path+"/task",task).then(function(data)
     {
        //refresh list
        $scope.task = "";
        $scope.doRefresh();
        $scope.closeModal();
     })
  }

  $scope.doRefresh = function() {
    $http.get(SERVER_CONFIG.api_path).then(function(data)
    {
      $scope.tasks = data.data;
    })

    $scope.currentTime = moment().format("Do MMMM YYYY, h:mm:ss a");
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.showLoading = function() {
    $ionicLoading.show({
      template: 'Loading...',
      duration: 1000
    }).then(function(){
       console.log("The loading indicator is now displayed");
       $scope.closeModal();
    });
  };
  $scope.hideLoading = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
  };

   // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
  	console.log('hide');
    $scope.task = [];
  });

  $scope.onHold = function(){
  	alert("testing");	
  }

  $scope.edit = function(id){
    $state.go('app.details',{token:id});
  }

  $scope.doRefresh();



  // Modal booking 
  $ionicModal.fromTemplateUrl('task-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
  	$scope.task = '';
    $scope.modal = modal;
  });

  $scope.openModalTask = function() {
  	$scope.modal.show();
  };

  $scope.closeModal = function() {
  	$scope.modal.hide();
  };

})

// angular.module("token").constant("CSRF_TOKEN", '{{ csrf_token() }}');     