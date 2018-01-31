angular.module('starter.controllers', [])

.controller('FormularioCtrl', function($scope,$state) {
  $scope.enviarPagamento = function(){
    $state.go("pagamentoefetuado");
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
