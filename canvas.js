window.app = angular.module('makeItSnappy',[]);

Array.prototype.randomElement =	function(){
	return this[Math.floor(Math.random()*this.length)]
}

app.controller('mainCtrl', function($scope, $window, sound) {
	$scope.marble = document.getElementById('marble');
	$scope.goal = document.getElementById('goal');

	  $scope.recording = new sound.Recording(function(data){
      	if(sound.detectClap(data)){
        		angular.element('#canvas').trigger('click');
      	 }
      });

	$scope.score = 0;
	$scope.done = false;
	var rateArr = [4,7,5,6,3];
	var rate;
	var colorArr = ["blue", "red", "green", "orange"];
	var color;
	var fireArr = [30,50,80,65];
	var fire;

	$scope.clickCoords = function() {
		 var coordinates = [];
		 var targetCoords = [];
			

		 coordinates.push(
	     	$scope.marble.offsetLeft, $scope.marble.offsetTop
	     )
	     
	       
	     targetCoords.push(
	     	$scope.goal.offsetLeft, $scope.goal.offsetTop
	     )

		 if(coordinates[0] < targetCoords[0] + 20 
		 	&& coordinates[0] > targetCoords[0] - 20
		 	&& coordinates[1] < targetCoords[1] + 20
			&& coordinates[1] > targetCoords[1] - 20) {
		 	$scope.score += 10;
		 } else {
		 	$scope.score -= 10;
		 }

		 if ($scope.score < -20) {
		 	$scope.marble.className = "marbleDone";
		 	$scope.done = true;
		 }
	
	};
	

		 $scope.marble.addEventListener('webkitAnimationIteration', function(){;
		 		
		 		rate = rateArr.randomElement();
		 		color = colorArr.randomElement();
		 		fire = fireArr.randomElement();

		 		$scope.goal.style.borderColor = color;
		 		$scope.goal.style.right = fire + "%";

		 		$scope.marble.style.webkitAnimationDuration = rate + "s"
		 		$scope.marble.style.right = fire + "%";
		 		$scope.marble.style.backgroundColor = color;

		 })

	$scope.reloadMe = function(){ 
		$window.location.reload();
	}

});


