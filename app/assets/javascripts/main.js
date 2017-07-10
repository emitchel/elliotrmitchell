function Main() {

	this.startGame = function() {
		//hide bracket
		$("#bracket").css("visibility", "hidden");

		//hide tourney play
		$(".tourneyOp").css("visibility", "hidden");
		
		//hide op stats for tourney play
		$(".opStatsTable").css("visibility", "hidden");

		

		//this function is called once
		//it will initiate all tthe global variables

		

		//<<<TYPING>>>\\
		//used for easter egg
		typing = new Typing();

		//<<<NAMES>>>\\
		//used for random names generation
		names = new Names();

		//<<<CAR & DRIVER>>>\\
		//user's car
		car = new Car("car name", 0, 10, "carpic1");
		driver = car.getDriver(0);
		//iq of zero at start
		car.statsOut(car.bot, car.top, driver.iq);

		//<<<DRAGSTRIP>>>\\
		dragstrip = new DragStrip();

		//<<<SHOP>>>\\
		shop = new Shop();
		shop.updatePrices();
		shop.updateIncrements();

		//<<<RACE>>>\\
		race = new Race();

		//<<<RANDOM>>>\\
		random = new Random();

		//<<<OPPONENT>>>\\
		opponent = new Opponent(car, driver.iq);
		opponent.showStats();
		
		//<<<TOURNEY>>>\\
		tourney = new Tournament();

		//<<<MONEY>>>\\
		money = new Money();
		money.startBankroll(1000);
		//Initiate cash flow 1sec/1$

		this.clearLocalStorage();

		localStorage.setItem("racing", 0);
		//we aren't currently racing
		localStorage.setItem("typedLetters", "");
		//not current letters have been typed
		
		localStorage.setItem("inTourney",0);
		
		localStorage.setItem("justFinishedTourney",0);
	}

	this.clearLocalStorage = function() {
		localStorage.clear();
		
	}
}
