function Opponent(userCar, userIq) {
	//this class strictly handles getting the stats
	//for the opponent car.

	//call get getOpponentCar(); to recieve opponent car object
	var parent = this;

	this.top = 0;
	this.bot = 0;
	this.iq = 0;
	this.buyin=0;
	this.payout=0;

	setVariables();

	this.name = getName();
	
	this.showStats = function(){
	
		$("#opName").html(this.name);
		
		
		$("#opStats").html(this.top + " / " + this.bot + " / " + this.iq);
		
		
		
	
		$("#racePayout").html(this.payout);
		
	
		
	
		$("#racePrice").html(this.buyin);
		
		
		
	}
	
	this.activateItems = function(moneyOwned){
		if((moneyOwned>this.buyin)&&(localStorage.getItem("racing")==0)){
			
			$("#btnRace").attr("disabled",false);
					
		} else {
			$("#btnRace").attr("disabled",true);
		}
	}
	
	this.getOpponentCar = function() {
		var opCar = new Car(this.name, this.bot, this.top, "carpic2");
		return opCar;
	}
	
	function setVariables() {
		var userLevel = userCar.getLevel();
		parent.top = getTop(userCar.top);
		parent.bot = getBot(userCar.bot);
		parent.iq = getIq(userIq);
		
		//to ensure the op's top is more than it's bottom
		while(parent.top<=parent.bot){
			parent.top = getTop(userCar.top);
			parent.bot = getBot(userCar.bot);
		}
		
		//make sure iq isn't negative
		while(parent.iq<0){
			parent.iq=getIq(userIq);
		}
		parent.buyin=userCar.getLevel()*40;
		parent.payout=userCar.getLevel()*100;

		function getTop(userTop) {
			return random.getRandomNumber(userTop + (random.getRandomNumber(2,0) * userCar.getLevel()), userTop - (random.getRandomNumber(5,0)))
		}

		function getBot(userBot) {
			return random.getRandomNumber(userBot + userCar.getLevel(), random.getRandomNumber(parent.top-5,0));
		}

		function getIq(userIq) {
			return random.getRandomNumber(driver.iq+3,driver.iq-5);
		}

	}

	function getName() {
		return names.getName();
	}
		

}
