angular.module('dashboard.controller', [])

.controller('DashboardCtrl', function($scope,$ionicLoading,$q,$ionicModal) {
  $scope.bookings = [
    { name: 'Reggae', id: 1 },
    { name: 'Chill', id: 2 },
    { name: 'Dubstep', id: 3 },
    { name: 'Indie', id: 4 },
    { name: 'Rap', id: 5 },
    { name: 'Cowbell', id: 6 }
  ];

  $scope.currentTime = moment().format("Do MMMM YYYY, h:mm:ss a");

  $scope.shouldShowDelete = true;

  $scope.createNewBooking = function(booking)
  {
    //call modal 
    $scope.bookings.push({name:booking.name});
    $scope.showLoading();
  }

  $scope.edit = function(index)
  {
    // $scope.bookings.splice(booking.id, 1)
    alert(index);
  }

  $scope.onHold = function()
  {
    alert("onHold")
  }

  $scope.doRefresh = function() {
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