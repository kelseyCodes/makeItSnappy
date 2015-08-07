window.app = angular.module('makeItSnappy',[]);

Array.prototype.randomElement =	function(){
	return this[Math.floor(Math.random()*this.length)]
}

app.controller('mainCtrl', function($scope, $window, sound) {
	$scope.marble = document.getElementById('marble');
	$scope.goal = document.getElementById('goal');
	$scope.score = 0;
	$scope.done = false;

	function setupRecorder(stream, callback) {
		console.log("recorindg stream", stream);
      var AudioContext = window.AudioContext || window.webkitAudioContext;
                        audioContext = new AudioContext();
                        volume = audioContext.createGain(); // creates a gain node
                        audioInput = audioContext.createMediaStreamSource(stream); // creates an audio node from the mic stream
                        audioInput.connect(volume); // connect the stream to the gain node
                        recorder = audioContext.createScriptProcessor(2048, 1, 1);

                        var start = Date.now();

                        recorder.onaudioprocess = function(stream) {
                            // if (!recording) return;
                            //console.log("recording", Date.now() - start);
                            var left = stream.inputBuffer.getChannelData(0);
                            //var right = e.inputBuffer.getChannelData(1);
                            callback(new Float32Array(left));
                        };
                        volume.connect(recorder); // connect the recorder

                        var gainNode = audioContext.createGain();
                        // debugger;
                        gainNode.gain.value = 0;
                        recorder.connect(gainNode);
                        gainNode.connect(audioContext.destination);


	}
	gest.start(setupRecorder, 
		function(data){
      		if(sound.detectClap(data)){
        		angular.element('#canvas').trigger('click');
      		}

      	});

	  // $scope.recording = new sound.Recording(function(data){
   //    	if(sound.detectClap(data)){
   //      		angular.element('#canvas').trigger('click');
   //    	 }
   //    });


	var rateArr = [4,7,5,6,3];
	var rate;
	var colorArr = ["blue", "red", "green", "orange"];
	var color;
	var fireArr = [45, 60, 75];
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

		 if ($scope.score < -40) {
		 	$scope.marble.className = "marbleDone";
		 	$scope.done = true;
		 	$scope.score = -50;
		 }
	
	};

	gest.options.subscribeWithCallback(function(gesture){
		if(gesture.right) $scope.goal.style.right = '45%';
		if(gesture.left) $scope.goal.style.right = '75%';
	})

	$scope.arrows = function($event) {
		if ($event.keyCode === 39) $scope.goal.style.right = '45%';
		if ($event.keyCode === 37) $scope.goal.style.right = '75%';
		if ($event.keyCode === 40) $scope.goal.style.right = '60%';
	}


	

		 $scope.marble.addEventListener('webkitAnimationIteration', function(){;
		 		
		 		rate = rateArr.randomElement();
		 		color = colorArr.randomElement();
		 		fire = fireArr.randomElement();

		 		$scope.goal.style.borderColor = color;
		 		$scope.goal.style.right = "60%";

		 		$scope.marble.style.webkitAnimationDuration = rate + "s"
		 		$scope.marble.style.right = fire + "%";
		 		$scope.marble.style.backgroundColor = color;

		 })

	$scope.reloadMe = function(){ 
		$window.location.reload();
	}

});


