function Race() {

	//global private variables
	var _distance;
	var _runAnimation = true;
	var TIMER1;
	var raceFinished = false;
	var finishedText = "";
	localStorage.setItem("ttlCarsFinished", 0);

	var userCar;
	var userDriver;
	var userDriverIq;

	var opCar;
	var opDriver;
	var opDriverIq;

	this.start = function(car, opponent) {
		//clear previous results
		$(".result").html("");
		//charge amount
		
		localStorage.setItem("justFinishedTourney",0);
		
		if(localStorage.getItem("inTourney")==0){
			money.decrementMoney(opponent.buyin);
		}
		

		//setglobal variable racing to true
		localStorage.setItem("racing", 1);

		//disable all buttons in race
		shop.activateItems(money.moneyOwned);

		tourney.activateItems(money.moneyOwned);

		userCar = car;
		userDriver = driver;
		userDriverIq = driver.iq;

		opCar = opponent.getOpponentCar();
		opDriver = opCar.getDriver(opponent.iq);
		opDriverIq = opDriver.iq;

		_distance = getDistance(car);
		createTrack(_distance);
		race(userCar, opCar);

	}
	function getDistance(car) {
		var level = car.getLevel();
		if ((100 + (level * 100)) > 1000) {
			return 1000;
		} else {
			return (100 + (level * 100));
		}
	}


	this.postRaceActions = function() {
		//output result text
		$(".result").html(finishedText).effect("highlight", 500);
		localStorage.setItem("ttlCarsFinished", 0);
		
		
		
		if (localStorage.getItem("inTourney") != 1) {
			
			//if car won, upgrade
			if (car.wonRace == true) {
				car.didWinRace();
			} else {
				car.lostRace();
			}
		

		//get new opponent
		opponent = new Opponent(car, driver.iq);
		opponent.showStats();

		

		
		
		} else {
			if (car.wonRace == true) {
				tourney.didWinRace();
			} else {
				tourney.lostRace();
			}
		}
		
		//clear previous results
		userCar.clearNumbers();
		opCar.clearNumbers();
		
		//let global system know that racing is done
		localStorage.setItem("racing", 0);

		//let global system know that boost has been used
		localStorage.setItem("boost", 0);

		//hide boost message
		$("#hideme").hide("slow");

		//run button enablement
		money.doRepeatedActions();
	}
	this.outputResults = function() {
		var totalCarsFinished = 0;

		if (Number(localStorage.getItem("ttlCarsFinished")) == 0) {

			localStorage.setItem("ttlCarsFinished", 1);

		} else {

			totalCarsFinished = Number(localStorage.getItem("ttlCarsFinished"))
			totalCarsFinished += 1;
			localStorage.setItem("ttlCarsFinished", totalCarsFinished);

		}

		if (Number(totalCarsFinished) == 2) {
			//both cars finished, move to post race stuffz
			this.postRaceActions();

		}

	}
	function runAnimation() {

		userCar.startAnimation();
		opCar.startAnimation();
	}

	function NEWrunAnimation() {
		userCar.NEWstartAnimation();
		opCar.NEWstartAnimation();
	}

	function raceOver(winner) {
		var leftWins = 0;
		var rightWins = 0;
		var tieWins = 0;

		userCar.lastDistanceAtFinishLine = (userCar.wonRace ? _distance : userCar.disTrav);
		opCar.lastDistanceAtFinishLine = (opCar.wonRace ? _distance : opCar.disTrav);

		if (winner.name == userCar.name) {

			finishedText = userCar.getCarName() + " won the race by " + (userCar.lastDistanceAtFinishLine - opCar.lastDistanceAtFinishLine).toFixed(2) + " steps";

		} else if (winner.name == opCar.name) {

			finishedText = opCar.name + " won the race by " + (opCar.lastDistanceAtFinishLine - userCar.lastDistanceAtFinishLine).toFixed(2) + " steps";

		} else {

			finishedText = "It was a tie (go buy a lottery ticket)";

		}

		if (_runAnimation) {
			runAnimation();
		} else {
			//NEWrunAnimation();
		}

	}

	//moves car forward, if the next step puts them over the finish line
	//set car.isFinished to true, otherwise increment total distance by
	//the previous step
	function moveCars(car1, car2) {

		car1.setLastStep();

		//account for IQ of driver
		car1.lastStep += random.getRandomNumber(userDriverIq, 0)

		//add on boost if any
		car1.lastStep += car1.boostValue;
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

		//account for IQ of driver
		car2.lastStep += random.getRandomNumber(opDriverIq, 0);

		//tack on boost value if any
		car2.lastStep += car2.boostValue;
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
	function race(userCar, opCar) {

		var winner;

		while (1) {

			moveCars(userCar, opCar)

			//if both cars finished in last step increment, study that
			//that last step to see who won
			if (userCar.isFinished && opCar.isFinished) {

				winner = figureOutWhoWon(userCar, opCar);

				break;

				//only this car finished, so we know it won
			} else if (userCar.isFinished) {

				//set dis to total distance
				//userCar.disTrav = _distance;

				//winner = userCar;

				//uncomment parts above and remove below, all testing
				opCar.disTrav -= opCar.lastStep;
				winner = figureOutWhoWon(userCar, opCar)

				break;

				//only this car finished, so we know it won
			} else if (opCar.isFinished) {

				//set dis to total distance
				//opCar.disTrav = _distance;

				//winner = opCar;

				//uncomment parts above and remove below, all testing
				userCar.disTrav -= userCar.lastStep;
				winner = figureOutWhoWon(userCar, opCar)

				break;

			}

		}

		winner.wonRace = true;
		raceOver(winner);

	}

	//this function determines who won in the last step
	//it takes the bigger increment of the two, and create a ratio
	//so if car1 moves 50 and car2 moves 25, that means
	//car1 took 2 (50/25) steps for every one step car2 took
	//this function will then send the ratio of the two steps and
	//the two cars to studyLastStep(...) to see who won in the last step
	function figureOutWhoWon(userCar, opCar) {

		var leftLastStep = userCar.lastStep;
		var rightLastStep = opCar.lastStep;

		var ratio = 0;

		if (leftLastStep > rightLastStep) {

			ratio = (leftLastStep / rightLastStep).toFixed(2);

			return (studyLastStep(userCar, opCar, ratio));

		} else if (rightLastStep > leftLastStep) {

			ratio = (rightLastStep / leftLastStep).toFixed(2);

			return (studyLastStep(opCar, userCar, ratio));

		} else if (userCar.disTrav == opCar.disTrav) {

			//this means, they've traveled the same distance and their last step was the same, return null, because it was a legit tie
			return null

		} else {

			//this means they haven't traveled the same distance, but they're steps were the same
			//return whoever traveled farther
			return ((userCar.disTrav > opCar.disTrav) ? userCar : opCar);

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

	function createTrack(distance) {

		var tableOut = "<div class='track'><img  id='carpic1' class='carPic' src='https://cdn0.iconfinder.com/data/icons/classic-cars-by-cemagraphics/512/camaro_512.png'/>"
		tableOut += "<br><br><br><img  id='carpic2' class='carPic' src='https://cdn4.iconfinder.com/data/icons/car-silhouettes/1000/sedan-512.png'/></div>"
		$("#tableOut").html(tableOut);
		$(".track").css("width", distance + 50);
	}

}
