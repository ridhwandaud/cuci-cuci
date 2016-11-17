angular.module('dashboard.controller', [])

.controller('DashboardCtrl', function($scope,$ionicLoading,$q,$ionicModal,$http,SERVER_CONFIG) {

  $scope.createNewBooking = function(booking)
  {
     // $http.post("http://localhost:8000/cards/store&title="+booking.name).then(function(data)
    $http.post(SERVER_CONFIG.api_path+"/create/booking",booking).then(function(data)
     {
        //refresh list
        $scope.doRefresh();
        $scope.closeModal();
     })
    // $scope.bookings.push({name:booking.name});
    // $scope.showLoading();
  }

  $scope.edit = function(index)
  {
    // $scope.bookings.splice(booking.id, 1)
    // alert(index);
  }

  $scope.doRefresh = function() {
    $http.get(SERVER_CONFIG.api_path+"/show/booking").then(function(data)
    {
      console.log(data);
      $scope.bookings = data.data;
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

  $scope.doRefresh();



  // Modal booking 
  $ionicModal.fromTemplateUrl('booking-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModalBooking = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  //End modal booking

})

// angular.module("token").constant("CSRF_TOKEN", '{{ csrf_token() }}');     