function Random(){
	
	this.getRandomNumber = function(high,low){
	var randomNum= Math.floor(Math.random() * (high - low + 1)) + low;
	
	return randomNum;	
	}
	
}
