angular.module('starter.controllers', [])

.controller('FormularioCtrl', function($scope,$state,$rootScope,$q,$timeout,$ionicLoading,$ionicPopup) {  
  
  $scope.voltar = function(){
      $state.go("inicial");
  };
  
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

.controller('PagamentoEfetuadoCtrl', function($scope,$state,$timeout){
    $scope.voltar = function(){
      $state.go("formulario");
    };

    $scope.$on( "$ionicView.enter", function( scopes, states ) {
        var now             = new Date().getTime(),
            // 5 segs a mais

        cordova.plugins.notification.local.schedule({
            title: "Areus"

            text: "Você recebeu seu cashback",
            at:   new Date(now + 5*1000),
            led: "FF0000",
            sound: null
        });
    });
})

.controller('InicialCtrl', function($scope,$state,$rootScope,$ionicLoading,$q,$timeout) {
  $scope.initQR = function(){
     $rootScope.scanQR().then(function(){
        $state.go("formulario");
     },function(){
        
     });
  }

  $rootScope.scanQR = function(){
     $ionicLoading.show();

     var defer = $q.defer();
     if(window.cordova){
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
            showTorchButton : false, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: false, // Android, save scan history (default false)
            prompt : "Coloque o QR para ser lido", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
        
        });
       
     }else{
       $ionicLoading.hide();
       defer.resolve(true);
     }
     return defer.promise;
    
  }


})