//<![CDATA[
	//drag race

	//Elliot Mitchell

	//Global variables
	var _distance = 1000;
	var _runAnimation = true;
	var results = new Array();
	var globalCounter = 0;
	var leftCar;
	var rightCar;
	var TIMER1;
	var raceFinished = false;
	var finishedText = "";
	
	localStorage.setItem("ttlCarsFinished",0);
	
	//make drag track
	createTrack(_distance);

	//use this to run many test cases

	//change these two numbers to adjust the chances of a car winning
	//so in logic, when a car "gets better" these two numbers will
	//increase and get closer together.
	leftCar = new Car("John",40,"BOTTOM BLAZER", 50, 60, "carpic2");

	rightCar = new Car("Bob",7, "TOP TIER", 30, 80, "carpic1");

	race(leftCar, rightCar);

	//car class\\

	function Car(carName, bot, top, imgId) {
		this.name = carName;
		this.bot = bot;
		this.top = top;
		this.lastMovingSpot = 0;
		this.disTrav = 0;
		this.lastStep = 0;
		this.steps = "";
		this.isFinished = false;
		this.wonRace = false
		this.imgId = imgId;
		this.lastDistanceAtFinishLine = 0;

		

		//driver class
		function Driver(drivername,driverIq) {
			this.name = drivername;
			this.iq = driverIq;

			this.getIqChange = function() {
				var x = Math.floor(Math.random() * (this.iq - 0 + 1)) + 0;
				return x;
			};

		};

		this.addToStepList = function(step) {

			this.steps += String(step) + ",";

		}

		this.startAnimation = function() {

			this.cutLastComma();

			var stepInc = this.steps.split(",");

			this.recurAnimate(stepInc, 0);
		}

		this.recurAnimate = function(arr, place) {

			if ((arr.length - 1) == (place)) {
				//if this is last step in race, set position equal to
				//finish location and NOT the last step it took because
				//that doesn't accurately depict the outcome of the race
				var xPos = this.lastDistanceAtFinishLine;
				$("#" + this.imgId).animate({

					'left' : xPos

				}, 200, 'linear', function() {
					$(this).after(function() {
						outputResults();
					})
				});

			} else if (arr.length !== place) {
				var carEl = this;
				var xPos = Number(this.lastMovingSpot);

				xPos += Number(arr[place]);

				this.lastMovingSpot = xPos;

				$("#" + this.imgId).animate({

					'left' : xPos

				}, 200, 'linear', function() {
					$(this).after(function() {
						carEl.recurAnimate(arr, ++place);
					})
				});
			}
		}

		this.cutLastComma = function() {
			this.steps = this.steps.slice(0, -1);
		}

		this.setLastStep = function() {
			var x = Math.floor(Math.random() * (this.top - this.bot + 1)) + this.bot;
			this.lastStep = x;
		}

		this.incrementDistanceByLastStep = function() {
			this.disTrav += this.lastStep;

		}
	}

	function outputResults(){
		var totalCarsFinished=0;
		
		if(Number(localStorage.getItem("ttlCarsFinished")) == 0){
			
			localStorage.setItem("ttlCarsFinished",1);
		} else {
			
			totalCarsFinished = Number(localStorage.getItem("ttlCarsFinished"))
			totalCarsFinished+=1;
			localStorage.setItem("ttlCarsFinished",totalCarsFinished);
					
		}
		
		if(Number(totalCarsFinished)==2){
			$("#result").html(finishedText);
			localStorage.setItem("ttlCarsFinished",0);
		
		}
		
		
	
	}
	
	function runAnimation() {

		leftCar.startAnimation();
		rightCar.startAnimation();
	}

	function raceOver(winner) {
		var leftWins = 0;
		var rightWins = 0;
		var tieWins = 0;

		leftCar.lastDistanceAtFinishLine = leftCar.disTrav;
		rightCar.lastDistanceAtFinishLine = rightCar.disTrav;

		if (_runAnimation) {
			runAnimation();
		}

		if (winner.name == leftCar.name) {

			finishedText = leftCar.name + " won the race by " + (leftCar.lastDistanceAtFinishLine - rightCar.lastDistanceAtFinishLine).toFixed(2) + " steps";

		} else if (winner.name == rightCar.name) {

			finishedText = rightCar.name + " won the race by " + (rightCar.lastDistanceAtFinishLine - leftCar.lastDistanceAtFinishLine).toFixed(2) + " steps";

		} else {

			finishedText = "It was a tie :/";

		}

	}

	//moves car forward, if the next step puts them over the finish line
	//set car.isFinished to true, otherwise increment total distance by
	//the previous step
	function moveCars(car1, car2) {

		car1.setLastStep();
		if ((car1.lastStep + car1.disTrav) < _distance) {

			car1.incrementDistanceByLastStep();

		} else {

			//don't increment last step because we don't know if the
			//other car finished also
			car1.isFinished = true;
		}

		//build step list for animation
		car1.addToStepList(car1.lastStep);

		car2.setLastStep();
		if ((car2.lastStep + car2.disTrav) < _distance) {

			//don't increment last step because we don't know if the
			//other car finished also
			car2.incrementDistanceByLastStep();

		} else {

			car2.isFinished = true;
		}

		//build step list for animation
		car2.addToStepList(car2.lastStep);
	}

	//begining function of the program
	function race(leftCar, rightCar) {

		var winner;

		while (1) {

			moveCars(leftCar, rightCar)
			
		
			//if both cars finished in last step increment, study that
			//that last step to see who won
			if (leftCar.isFinished && rightCar.isFinished) {

				winner = figureOutWhoWon(leftCar, rightCar);

				break;

				//only this car finished, so we know it won
			} else if (leftCar.isFinished) {

				//set dis to total distance
				leftCar.disTrav = _distance;

				winner = leftCar;

				break;

				//only this car finished, so we know it won
			} else if (rightCar.isFinished) {

				//set dis to total distance
				rightCar.disTrav = _distance;

				winner = rightCar;

				break;

			}

		}

		raceOver(winner);

	}

	//this function determines who won in the last step
	//it takes the bigger increment of the two, and create a ratio
	//so if car1 moves 50 and car2 moves 25, that means
	//car1 took 2 (50/25) steps for every one step car2 took
	//this function will then send the ratio of the two steps and
	//the two cars to studyLastStep(...) to see who won in the last step
	function figureOutWhoWon(leftCar, rightCar) {

		var leftLastStep = leftCar.lastStep;
		var rightLastStep = rightCar.lastStep;

		var ratio = 0;

		if (leftLastStep > rightLastStep) {

			ratio = (leftLastStep / rightLastStep).toFixed(2);

			return (studyLastStep(leftCar, rightCar, ratio));

		} else if (rightLastStep > leftLastStep) {

			ratio = (rightLastStep / leftLastStep).toFixed(2);

			return (studyLastStep(rightCar, leftCar, ratio));

		} else if (leftCar.disTrav == rightCar.disTrav) {

			//this means, they've traveled the same distance and their last step was the same, return null, because it was a legit tie
			return null

		} else {

			//this means they haven't traveled the same distance, but they're steps were the same
			//return whoever traveled farther
			return ((leftCar.disTrav > rightCar.disTrav) ? leftCar : rightCar);

		}

	}

	//this function will loop through the last step,  the car
	//with the larger last increment will increase based off
	//of the ratio and the car with the smaller step will only
	//increment by 1... the car who reaches the _distance first
	//wins, if they both reach the _distance at the same time (rare)
	//then the winner is based off of who traveled farther....
	//if they still have traveled the same distance (dbl rare)
	//then it is a tie roughly a 1/10 000 chance
	function studyLastStep(largerStep_car, smallerStep_car, ratio) {

		var stopLoop = false;

		while (!stopLoop) {

			largerStep_car.disTrav += Number(ratio);

			smallerStep_car.disTrav += 1;

			if ((largerStep_car.disTrav >= _distance) && (smallerStep_car.disTrav >= _distance)) {

				stopLoop = true;

				return tieBreaker(largerStep_car, smallerStep_car);

			} else if (largerStep_car.disTrav >= _distance) {

				stopLoop = true;

				return largerStep_car;

			} else if (smallerStep_car.disTrav >= _distance) {

				stopLoop = true;

				return smallerStep_car;
			}
		}
	}

	//arbitrary tie breaker for the rare cases that they do finish at the exact same distance
	function tieBreaker(car1, car2) {
		if (car1.disTrav > car2.disTrav) {
			return car1;
		} else if (car2.disTrav < car1.disTrav) {
			return car2;
		} else if (car1.disTrav == car2.disTrav) {
			return null;
		}
	}

	function createTrack(distance){
		
		var tableOut = "<div class='track'><img  id='carpic1' class='carPic' src='http://www.archiforge.com/data/jpg/954809089452d17a4f0c709z50550118_1.jpg'/>"
		tableOut += "<br><br><br><img  id='carpic2' class='carPic' src='http://www.archiforge.com/data/jpg/9577671324527b3c2e43b87z57359158_1.jpg'/></div>"
		$("#tableOut").html(tableOut);
		$(".track").css("width",distance+50);
	}

});
//]]>
