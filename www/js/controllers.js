angular.module('starter.controllers', [])

.controller('FormularioCtrl', function($scope,$state,$rootScope,$q,$timeout,$ionicLoading,$ionicPopup) {
  
  $rootScope.scanQR = function(){
     $scope.carregandoQR = false;
     $ionicLoading.show();

     var defer = $q.defer();
     if(window.cordova){
        $timeout(function() {
            cordova.plugins.barcodeScanner.scan(
              function (result) {
                  if(result.text == ""){
                    $ionicLoading.hide();
                    defer.reject(true);
                  }

                  $rootScope.qr = result.text;
                  $rootScope.qr = result.format;
                  
                  console.log("We got a barcode\n" +
                          "Result: " + result.text + "\n" +
                          "Format: " + result.format + "\n" +
                          "Cancelled: " + result.cancelled);
                   $scope.carregandoQR = true;
                   $ionicLoading.hide();
                   defer.resolve(true);
              },
              function (error) {
                  console.log("Scanning failed: " + error);
                  $ionicLoading.hide();
                  defer.reject(true);
              },
              {
                  preferFrontCamera : false, // iOS and Android
                  showFlipCameraButton : false, // iOS and Android
                  showTorchButton : true, // iOS and Android
                  torchOn: true, // Android, launch with the torch switched on (if available)
                  saveHistory: false, // Android, save scan history (default false)
                  prompt : "Coloque o QR para ser lido", // Android
                  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                  formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
                  orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                  disableAnimations : true, // iOS
                  disableSuccessBeep: false // iOS and Android
              }       );
        },1000,true);
         

     }else{
       $scope.carregandoQR = true;
       $ionicLoading.hide();
       defer.resolve(true);
     }
     return defer.promise;
    
  }

  $scope.initQR = function(){
     $rootScope.scanQR().then(function(){
      
     },function(){
      //se der error refaz
          $scope.initQR();
     });
  }

 
  $scope.enviarPagamento = function(){
    $scope.valor = document.querySelector("input").value;
    if($scope.valor != "" && $scope.valor != 0 && $scope.valor > 0){
      $state.go("pagamentoefetuado");
    }else{
      $ionicPopup.alert({
          title:  'O valor deve ser maior que zero.',
          buttons: [{ text: "Ok"}]
      });
    }
  }

})

.controller('PagamentoEfetuadoCtrl', function($scope) {
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
