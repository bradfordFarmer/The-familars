app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

app.controller('handCtrl', function($scope, socket) { 
    $scope.resources=[
        {
        name : 'resource1' , 
        quantity: 2,
        }
    ]
    $scope.cards = [ 
        {
            name: "card 1"
        }
        
    ];
     $scope.playedCards =[
         
         
     ];
    $scope.slots = [
        { name: "slot 2"} ,
         { name: "slot 1"} 
            
            
    ]

    socket.on('init', function (data) {
        $scope.name = data.name;
        $scope.users = data.users;
    });
    
    socket.on('updateHand', function (data) {
        $scope.cards = data.cards;
        $scope.slots = data.slots;
        $scope.resources = data.resources;
    });
    
    $scope.validateTurn = function () {
        socket.emit('validate:turn', {
            cards: $scope.playedCards
    });
            
    $scope.playCard = function(){
            
            
    }
    
    $scope.unDuePlay = function (){
        
        
    }
}