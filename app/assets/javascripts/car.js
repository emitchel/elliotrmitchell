function Car(carName, bot, top, imgId) {
	var parent=this;
	
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
	this.boostValue=0;
	this.level=1;
	
	this.getCarName = function(){
		return $("#txtCarName").html();
	}
	
	this.didWinRace = function(){
		this.increaseLevel();
		this.adjustWL("wins");
		money.incrementMoney(opponent.payout);
	}
	
	this.lostRace = function(){
		this.adjustWL("losses");
	}
	
	this.adjustWL = function(wl){
		var winorloss = Number($("#"+wl).html());
		winorloss++;
		$("#"+wl).html(winorloss).effect("highlight",500);
	}
	this.clearNumbers = function(){
		
		this.lastMovingSpot=0;
		this.disTrav=0;
		this.lastStep=0;
		this.steps = "";
		this.isFinished = false;
		this.wonRace=false;
		this.lastDistanceAtFinishLine=0;
		this.boostValue=0;
	}
	
	this.getLevel = function(){
		
		return this.level;
		
	}
	
	this.increaseLevel = function(){
		
		var lvl = Number($("#lvl").html());
		lvl++;
		this.level=lvl;
		$("#lvl").html(lvl).effect("highlight",500);
		
		//check if eligible for tourney race
		checkForTourneyPlay(this.level);
		
	}
	function checkForTourneyPlay(lvl){
		if (lvl%3==0){
			
			tourney.setUpTourney(parent);
		} else {
			tourney.disableTourney();
		}
	}

	function Driver(iq) {
		this.iq = iq;
		
		
	}
	
	this.getDriver = function (iq){
		
		return new Driver(iq)
	}
	
	//this function should get called every time it's stats are updated
	this.statsOut = function(bot,top,iq){
		$("#stats").html(top + " / "+ bot +" / "+iq).effect("highlight",500);
	}

	this.updateBot = function(newBot) {
		this.bot=newBot;
		//referencing global driver
		//this.statsOut(parent.bot,parent.top,driver.iq);
	}

	this.updateTop = function(newTop) {
		this.top=newTop;
		//referencing global driver
		//this.statsOut(parent.bot,parent.top,driver.iq);
	}
	
	this.addToStepList = function(step) {

			this.steps += String(step) + ",";

		}
	
	
	//added for testing purposes
	this.NEWstartAnimation = function(){
		var xPos = this.disTrav;
			$("#" + this.imgId).animate({

				'left' : xPos

			}, 3000, 'easeInQuint', function() {
				$(this).after(function() {
					race.outputResults();
				})
			});
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
					race.outputResults();
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