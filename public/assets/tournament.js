function Tournament() {
	parent = this;

	this.buyIn = 0;
	this.payOut = 0;
	this.secondRoundSpot = 0;
	this.thirdRoundSpot = 0;
	this.round = 1;
	this.opName = "";
	this.opPos
	this.pos
	this.lastPos
	var firstOpponent = new Opponent(car, driver.iq);
	var secondOpponent = new Opponent(car, driver.iq);
	var thirdOpponent = new Opponent(car, driver.iq);

	this.didWinRace = function() {
		//add a W or L
		car.adjustWL("wins");

		//increase local round
		this.round++;

		//remove button
		$("#inTrnyBtn").remove();

		//move to next round
		nextRound(this.round);
	}
	function nextRound(round) {
		//TODO:
		var temp;
		if (round == 4) {

			wonTourney();
			return;
		} else if (round == 3) {
			//TODO: finals stuff
			parent.pos=parent.thirdRoundSpot;
			
			makeBracketRndThree();

			$("#2-" + parent.thirdRoundSpot).html(car.getCarName());
			
			thirdOpponent.name=parent.opName;
			
			setStats(thirdOpponent,3);
			
			opponent=thirdOpponent;
			
			updateOpp(opponent);
		} else if (round == 2) {
			parent.pos=parent.secondRoundSpot;
			

			makeBracketRndTwo();
			
			$("#4-" + parent.secondRoundSpot).html(car.getCarName());
			//var temp = $("#4-" + this.secondRoundSpot).html();

			secondOpponent.name=parent.opName;
			
			//set stats top, bot
			setStats(secondOpponent, 2);

			//set global opponent to the one for the round
			opponent = secondOpponent;
			
			updateOpp(opponent);
			

		}

	}
	function updateOpp(opponent){
		$("#tourneyOpName").html(opponent.name);
		$("#tourneyOpStats").html(opponent.top + " / " + opponent.bot + " / " + opponent.iq);
	}

	function wonTourney() {
		//payout winnings
		money.incrementMoney(parent.payOut);
		
		//set global system to not in tourney
		localStorage.setItem("inTourney", 0);
		
		//clear data
		clearNumbers();
		
		//increase car level
		car.increaseLevel();
		
		//set winner to car name
		$("#tourneyWinner").html("<b><i>"+car.getCarName()+"</i></b>");
		
		
		//setup new opponent
		opponent = new Opponent(car, driver.iq);
		opponent.showStats();
		
		localStorage.setItem("justFinishedTourney",1);
		$(".racetable").css("opacity", "1");
		$(".opStatsTable").css("opacity", ".2");
		


	}


	this.lostRace = function() {
		car.adjustWL("losses");
		clearNumbers();
		this.disableTourney();
		localStorage.setItem("inTourney", 0);
		this.endTourney();
	}
	function clearNumbers() {
		parent.buyIn = 0;
	parent.payOut = 0;
	parent.secondRoundSpot = 0;
	parent.thirdRoundSpot = 0;
	parent.round = 1;
	parent.opName = "";
	parent.opPos=0;
	parent.pos=0;
	parent.lastPos=0;
	firstOpponent = new Opponent(car, driver.iq);
	secondOpponent = new Opponent(car, driver.iq);
	thirdOpponent = new Opponent(car, driver.iq);
	}

	function setStats(op, rnd) {
		switch(rnd) {
			case 1:
				op.top = random.getRandomNumber(car.top, car.top - 3);
				op.bot = random.getRandomNumber(op.top - 5, car.bot - 10);
				break;

			case 2:
				op.top = random.getRandomNumber(car.top + 1, car.top - 3);
				op.bot = random.getRandomNumber(op.top - 3, car.bot - 5);
				break;

			case 3:
				op.top = random.getRandomNumber(car.top + 1, car.top - 1);
				op.bot = random.getRandomNumber(car.bot + 1, car.bot - 1);
				break;
		}
		if(op.bot<0){
			setStats(op,rnd);
		}
	}


	this.setUpTourney = function(car) {

		$(".tourneyOp").css("visibility", "visible");
		$("#btnTourney").removeAttr('disabled');
		
	
		getPrices();

	}

	this.startTourney = function(car) {
		
		clearBracket();
		
		//let system know currenty in tourney
		localStorage.setItem("inTourney", 1);

		//activate right buttons
		money.doRepeatedActions();

		//create tournament bracket
		makeBracketRndOne(car);

		//charge for cost
		money.decrementMoney(parent.buyIn);

		//set up first opponent
		firstOpponent.name = this.opName

		//set stats top, bot
		setStats(firstOpponent, 1);

		//set global opponent to the one for the round
		opponent = firstOpponent;

		updateOpp(opponent);

		//disable enter tournament button
		$("#btnTourney").attr("disabled", true);

		$("#bracket").css("visibility", "visible");
		$(".opStatsTable").css("visibility", "visible");

		$(".racetable").css("opacity", ".2");
		
		$(".opStatsTable").css("opacity", "1");

	}
	function getPrices() {
		//double shop buyin
		//tripe shop payout
		parent.buyIn = opponent.buyin * 2;
		parent.payOut = opponent.payout * 3

		setPrices();
	}

	function setPrices() {
		$("#tourneyPrice").html(parent.buyIn);
		$("#tourneyPayout").html(parent.payOut);
	}

	function makeBracketRndOne(car) {
		$("#bracket").css("visibility", "visible");
		$(".opStatsTable").css("visibility", "visible");
		//ONLY USE FOR FIRST ROUND OF TOURNAMENT
		parent.pos = random.getRandomNumber(8, 1);

		//put user car in random spot
		$("#8-" + parent.pos).html(car.getCarName());
		getPositionsRndOne(parent.pos);

		//fill all other spots
		for (var i = 1; i < 9; i++) {
			if (i != parent.pos) {
				var randomName = names.getName();
				$("#8-" + i).html(randomName);
				if (i == parent.opPos) {
					var temp = $("#8-" + i).html();
					temp += "<button style='display:inline;' id='inTrnyBtn' onclick='javascript:race.start(car,opponent)'>Race!</button> ";
					$("#8-" + i).html(temp);

					parent.opName = randomName;
				}
			}
		}

	}

	function makeBracketRndTwo() {
		//gets opponent position
		getPositionRndTwo(parent.secondRoundSpot);

		//fill all other spots
		var k=1;//second round positions
		for (var i = 1; i < 9; i=i+2) {
			
				
				var rndOne = $("#8-" + i).html();
				$("#4-"+k).html(rndOne);
				
				if (k == parent.opPos) {
					var temp = $("#4-" + k).html();
					parent.opName=temp;
					temp +="<button style='display:inline;' id='inTrnyBtn' onclick='javascript:race.start(car,opponent)'>Race!</button> ";
					$("#4-" + k).html(temp);
				}
				k++;
			
		}
	}
	
	function makeBracketRndThree(){
		getPositionRndThree(parent.thirdRoundSpot);
		
		var k=1;//second round positions
		for (var i = 1; i < 5; i=i+2) {
			
				
				var rndOne = $("#4-" + i).html();
				$("#2-"+k).html(rndOne);
				
				if (k == parent.opPos) {
					var temp = $("#2-" + k).html();
					parent.opName=temp;
					temp +="<button style='display:inline;' id='inTrnyBtn' onclick='javascript:race.start(car,opponent)'>Race!</button> ";
					$("#2-" + k).html(temp);
				}
				k++;
			
		}
	}

	function getBotWinner(i) {
		if(i==parent.opPos){
			return "";
		} else {
			
		}
	}

	function getPositionRndThree(pos){
		if(pos==1){
			parent.opPos=2;
		}else{
			parent.opPos=1;
		}
	}
	function getPositionRndTwo(pos) {
		switch(pos) {
			case 1:
				parent.opPos = 2;

				break;
			case 2:
				parent.opPos = 1;

				break;
			case 3:
				parent.opPos = 4;

				break;
			case 4:
				parent.opPos = 3;

				break;
		}
	}

	function getPositionsRndOne(pos) {

		switch(pos) {
			case 1:
				parent.opPos = 2;
				parent.secondRoundSpot = 1;
				parent.thirdRoundSpot = 1;
				break;
			case 2:
				parent.opPos = 1;
				parent.secondRoundSpot = 1;
				parent.thirdRoundSpot = 1;
				break;
			case 3:
				parent.opPos = 4;
				parent.secondRoundSpot = 2;
				parent.thirdRoundSpot = 1;
				break;
			case 4:
				parent.opPos = 3;
				parent.secondRoundSpot = 2;
				parent.thirdRoundSpot = 1;
				break;
			case 5:
				parent.opPos = 6;
				parent.secondRoundSpot = 3;
				parent.thirdRoundSpot = 2;
				break;
			case 6:
				parent.opPos = 5;
				parent.secondRoundSpot = 3;
				parent.thirdRoundSpot = 2;
				break;
			case 7:
				parent.opPos = 8;
				parent.secondRoundSpot = 4;
				parent.thirdRoundSpot = 2;
				break;
			case 8:
				parent.opPos = 7;
				parent.secondRoundSpot = 4;
				parent.thirdRoundSpot = 2;
				break;
		}

	}


	this.disableTourney = function() {

		if (car.level > 3) {

			//$(".tourneyOp").attr("title", "You can enter a tournament every three levels");
			$("#btnTourney").attr('disabled', true);
			$("#btnTourney").removeAttr("title");

		}
	}

	this.activateItems = function(moneyOwned) {
		if ((moneyOwned > parent.buyIn) && (localStorage.getItem("racing") == 0) && (car.level % 3 == 0) && (localStorage.getItem("inTourney") == 0)&&(localStorage.getItem("justFinishedTourney")==0)) {

			$("#btnTourney").attr("disabled", false);

		} else {
			$("#btnTourney").attr("disabled", true);
		}
		
		if(localStorage.getItem("racing")==0){
			$("#inTrnyBtn").attr("disabled",false);
		} else {
			$("#inTrnyBtn").attr("disabled",true);
		}
	}

	this.endTourney = function() {
		localStorage.setItem("inTourney", 0);
		$("#bracket").css("visibility", "hidden");
		$(".opStatsTable").css("visibility", "hidden");
		$(".racetable").css("opacity", "1");
		$(".opStatsTable").css("opacity", ".2");
		clearBracket();
		
	}
	
	function clearBracket(){
		for(var i=1;i<9;i++){
			$("#8-"+i).html("");
			$("#4-"+i).html("");
			$("#2-"+i).html("");
		}
		$("#tourneyWinner").html("");
	}
}