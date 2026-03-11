function Money() {
	this.timer
	this.moneyPerSec = 1;
	this.moneyOwned=50;
	this.speed=0;
	
	this.startBankroll = function(speed) {
		
		var fdsa = this;
		
		clearInterval(fdsa.timer);
		
		this.speed=speed;
		fdsa.timer = setInterval(function() {
			fdsa.incrementMoney(fdsa.moneyPerSec);
			fdsa.doRepeatedActions();
		}, this.speed);
	}
	
	//gained money
	this.incrementMoney = function(amount) {
		
		this.moneyOwned+=amount;
		$("#money").html(this.moneyOwned)
		
		this.doRepeatedActions();

	}
	
	//lost money
	this.decrementMoney=function(amount) {
		var total = Number($("#money").html());
		total -= amount;
		this.moneyOwned=total;
		$("#money").html(total);
		
		this.doRepeatedActions();
	}
	
	//put all functions that need be called every money increment here
	this.doRepeatedActions=function(){
		opponent.activateItems(this.moneyOwned);
		shop.activateItems(this.moneyOwned);
		tourney.activateItems(this.moneyOwned);
	}

}
