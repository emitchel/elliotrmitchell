function Typing(){
	//private string
	var easterEggString="M";
	
	this.checkStroke = function(evt){
		evt = evt || window.event;
  		var charCode = evt.which || evt.keyCode;
 		var charStr = String.fromCharCode(charCode);
 		addCharToMemory(charStr);
 		
	}	
	
	function checkForString(text){
		if(text.indexOf(easterEggString.toUpperCase()) !=-1){
			money.incrementMoney(1000);
			clearMemory();
		}
	}
	
	function addCharToMemory(str){
		//get previous stored chars
		var memory =localStorage.getItem("typedLetters");
		
		memory += str;
		localStorage.setItem("typedLetters",memory);
		checkForString(localStorage.getItem("typedLetters"));
	}
	
	function clearMemory(){
		localStorage.setItem("typedLetters","");
	}
}
