function Shop() {
	this.speedPrice = 100;
	this.consistencyPrice = 75;
	this.iqPrice = 25;
	this.incomePrice = 200;

	this.speedInc = 1;
	this.consistencyInc = 1;
	this.iqInc = 1;
	this.incomeInc = .95;

	var temp;

	this.buyBoost = function(boost) {
		var nBoost = Number(boost);

		//decrement total money
		money.decrementMoney(nBoost * 100);

		//give car the boost
		car.boostValue = nBoost;

		//add string to tell user they get one boost
		$("#showBoost").html("<i>Next race driven will have an additional " + boost + " steps added on to each step taken");
		$("#hideme").show("slow").effect("highlight", 500);

		//let global system know that a boost has been purchased
		localStorage.setItem("boost", 1);

		//re call the enablement button function
		money.doRepeatedActions();
	}

	this.buyUpgrade = function(upgrade) {

		switch(upgrade) {

			case "speed":

				money.decrementMoney(this.speedPrice);

				var cartop = car.top;
				cartop += this.speedInc;
				car.updateTop(cartop);

				this.speedPrice = Math.round(this.speedPrice * 1.25);

				temp = this.speedInc;
				this.speedInc = Math.round(this.speedInc * 1.05);

				//if it didn't increment, increment by 1
				if (temp == this.speedInc) {
					this.speedInc++;
				}
				break;
			case "cons":
				if ((car.bot + this.consistencyInc) < car.top) {
					money.decrementMoney(this.consistencyPrice);
					var carbot = car.bot;
					carbot += this.consistencyInc;
					car.updateBot(carbot);

					this.consistencyPrice = Math.round(this.consistencyPrice * 1.25);

					temp = this.consistencyInc;
					this.consistencyInc = Math.round(this.consistencyInc * 1.05);
					if (temp == this.consistencyInc) {
						this.consistencyInc++;
					}
				}
				//increase amount
				break;
			case"iq":

				money.decrementMoney(this.iqPrice);
				var cariq = driver.iq;
				cariq += this.iqInc;
				driver.iq = cariq;
				this.iqPrice = Math.round(this.iqPrice * 1.6);
				temp = this.iqInc;
				this.iqInc = Math.round(this.iqInc * 1.05);
				if (temp == this.iqInc) {
					this.iqInc++;
				}
				//increase amount
				break;
			case"income":

				money.decrementMoney(this.incomePrice);
				var moneyspeed = money.speed;
				moneyspeed *= this.incomeInc;

				money.startBankroll(moneyspeed);

				this.incomePrice = Math.round(this.incomePrice * 1.5);
				//this.incomeInc=Math.round(this.incomeInc*1.05);
				//increase amount
				break;

		}

		//update stats on screen
		car.statsOut(car.bot, car.top, driver.iq)
		this.updateIncrements();
		this.updatePrices();

		money.doRepeatedActions();

	}

	this.updateIncrements = function() {
		$("#topInc").html(this.speedInc);
		$("#botInc").html(this.consistencyInc);
		$("#iqInc").html(this.iqInc);
		$("#incomeInc").html(Number(100 - (this.incomeInc) * 100));
	}

	this.updatePrices = function() {
		$("#topPrice").html(this.speedPrice);
		$("#botPrice").html(this.consistencyPrice);
		$("#iqPrice").html(this.iqPrice);
		$("#incomePrice").html(this.incomePrice);
	}

	this.activateItems = function(moneyOwned) {
		if (localStorage.getItem("racing") == 0 || localStorage.getItem("racing") == null) {

			//below is the activation of boost buttons
			if (localStorage.getItem("boost") == 0 || localStorage.getItem("boost") == null) {
				if (moneyOwned >= 200) {
					enableButton("2");
				} else {
					disableButton("2");
				}
				if (moneyOwned >= 600) {
					enableButton("6");
				} else {
					disableButton("6");
				}
				if (moneyOwned >= 1100) {
					enableButton("11");
				} else {
					disableButton("11");
				}
				if (moneyOwned >= 1600) {
					enableButton("16");
				} else {
					disableButton("16");
				}
				if (moneyOwned >= 2200) {
					enableButton("22");
				} else {
					disableButton("22");
				}
				if (moneyOwned >= 3000) {
					enableButton("30");
				} else {
					disableButton("30");
				}
				if (moneyOwned >= 3500) {
					enableButton("35");
				} else {
					disableButton("35");
				}
				if (moneyOwned >= 4200) {
					enableButton("42");
				} else {
					disableButton("42");
				}
				if (moneyOwned >= 5100) {
					enableButton("51");
				} else {
					disableButton("51");
				}
				if (moneyOwned >= 5800) {
					enableButton("58");
				} else {
					disableButton("58");
				}
				if (moneyOwned >= 6900) {
					enableButton("69");
				} else {
					disableButton("69");
				}
				if (moneyOwned >= 8000) {
					enableButton("80");
				} else {
					disableButton("80");
				}

			} else {
				//a boost has been bought, disable them until used
				$(".btnBoost").attr("disabled", true);
			}

			if (localStorage.getItem("inTourney") == 0) {
				if (moneyOwned >= this.speedPrice) {
					enableButton("btnSpeed");
				} else {
					disableButton("btnSpeed");

				}

				if (moneyOwned >= this.consistencyPrice && ((car.bot + this.consistencyInc) < car.top)) {
					enableButton("btnCons");
				} else {
					disableButton("btnCons");

				}
				if (moneyOwned >= this.iqPrice) {
					enableButton("btnIQ");
				} else {
					disableButton("btnIQ");

				}

				if (moneyOwned >= this.incomePrice) {
					enableButton("btnIncome");
				} else {
					disableButton("btnIncome");

				}
			} else {
				//tourney is in action
				$(".shop_buttons").attr("disabled", true);
			}
		} else {
			//racing is in action, disable all buttons
			$(".btnBoost").attr("disabled", true);
			$(".shop_buttons").attr("disabled", true);
		}

	}
	function enableButton(id) {
		$("#" + id).attr("disabled", false);
	}

	function disableButton(id) {
		$("#" + id).attr("disabled", true);
	}

}