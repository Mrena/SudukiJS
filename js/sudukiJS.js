var SudukiJS = function()
       {
    // I did't use the new keyword when instatiating the arrays
    // because i want it to store values not references
	    
	this.coords = Array();	
	this.coordsNum = 82;
	this.hidden = Array();
	this.hiddenValues = Array();
	this.initHideNum = 20;
	this.wrongAnswer = 0;
	this.rightAnswer = 0;
	this.openStatus = 0;
	this.page = "index.html";
	this.initHide = true;
	this.rightAnswered = Array();
	this.wrongAnswered = Array();
	this.score = 0;
	this.validCoords = Array();
	
	this.getCoords = function(){
		
		
					return this.coords;
					    }
	this.setCoords = function(coords){
		
				this.coords = coords;
		
						}					
	
	this.initRandomHide = function(){
						
						this.randomHide(this.initHideNum);
						} 	
		
	this.randomHide = function(numOfhides){

							var randNum;
							var i=0;
						while(i<numOfhides){
							   randNum = this.randomHideGenerator();  
							   this.hiddenValues.push($("#"+randNum).html());
							   this.hidden.push(randNum);
							   $("#"+randNum).html("");
							   document.getElementById(randNum).bgColor = "yellow";
							    i++; 
							  }
						  this.initHide = false;          	
						   }
				   
	
	this.showAll = function(){

		for(var i=0;i<this.hidden.length;i++)
						{
			$("#"+this.hidden[i]).html(this.hiddenValues[i]);
						}
		
		
	}
						   
						   
	this.randomHideGenerator = function(){
		
	
	 var ranNum = Math.floor(Math.random()*this.coordsNum);
	 
		   for(var i=0; i<this.hidden.length;i++)
		                   {
							if(this.hidden[i]==ranNum||ranNum==0)
							        {
							         // If the number generated is equal to one of the already generated or is equal to zero, generate a generated
									 // a new using this function so the new one will go through this test.  
							         
							     this.randomHideGenerator();
							    
							       }
							       else if(i==this.hidden.length-1&&(this.hidden[i]!=ranNum&&ranNum!=0))
							                   {
							         // If we are at the last index of the hidden array and the generated number is not
									 // one of the already generated and is not equal to zero
									 // just break out of the loop so to immediately return the generated num.            
							               
							               break;
							                   }
							}
						
					return ranNum;	
						}
						
	
	this.checkInHiddenList = function(val) {
						// Checks if the val variable's value is one of the hidden values
						// returns true if it is, return false otherwise
								var isInit = false;
								for(var i=0;i<this.hidden.length;i++)
								        {
											
										if(this.hidden[i]==val){
												isInit = true;
												break;
												}	
										}
								
								return isInit;
								}					
						  
	this.checkHidden = function(tdIndex) {
								
								
					
						 for(var i=0;i<this.hidden.length;i++)
							     {
																
								if(this.hidden[i]==tdIndex)
										 {
									 // If the clicked td is one of the hidden
									// open it for editing
									   this.openIt(tdIndex);
									   break;	
																
								    	}	
																
							  }	
											
					}			
												
									    			
	this.showHidden = function(){
		
				for(var hid in this.hidden){			
						$("#"+hid).html("");					
							}
						this.hidden.length = 0;
						this.hiddenValues.length = 0;	
		           }	
					
	this.openIt = function(tdIndex){
	 						
								if(this.openStatus==0)
								          {
							$("#"+tdIndex).html("<input type='text' id='"+tdIndex+"Input' onkeyup='if(!isNaN(this.value))save("+tdIndex+",this.value.charAt(0))' value='' />");
							$("#"+tdIndex+"Input").focus();
							           this.openStatus = 1;
								          }
								
									}
	
	
	this.saveAndIndicate = function(tdIndex,inputValue){
		
		// Save the input value entered at eval(tdIndex)
		// and indicate that there no opened td
		$("#"+tdIndex).html(inputValue);
		this.openStatus = 0;
		var isCorrect = false;
		
		        if(!this.wasAnsweredRight(tdIndex))
		                   {
				for(var i=0;i<this.hidden.length;i++)
				                {
									// Check if the value entered is the same as the one
									// in hiddenValues array at eval(tdIndex)...
							if(this.hidden[i]==tdIndex&&inputValue==this.hiddenValues[i])
							          {
									// ...if it is, change the background colour of the 
									// td at eval(tdIndex) to green
									// increment the rightAnswer value by 1
									// and display it in a div whose id "right" 
								document.getElementById(tdIndex).bgColor = "green";
								// Adding the value of tdIndex to rightAnswered array
								// so a user will not repeatedly put the same correct answer
								// inside a td to repeatedly increase his/her score
								// Best solution would have been to close this
								// particular td for editing
								// But thats beyond the scope of this tutorial lol 
								this.rightAnswered.push(tdIndex);
								this.rightAnswer++;
								document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML)+1;
								$("#"+tdIndex).unbind("vclick");
								$("#right").html(this.rightAnswer);
								
									isCorrect = true;
								      }		
									
								}
							}	
		      
		      if(!isCorrect&&!this.wasAnsweredWrong(tdIndex))
			                {
		           //If the answer is wrong increment
		           // the wrongAnswer value by 1
				   // display it in a div whose id is "wrong"
				   // and then turn red the background colour whose id is the value of tdIndex  
		           		this.wrongAnswer++;
		           		this.wrongAnswered.push(tdIndex);
						$("#wrong").html(this.wrongAnswer);
		           		document.getElementById(tdIndex).bgColor = "red";
		           		document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML)-1;
		                      }
		
		// If the right answers are equal to the number of 
								// hidden values, puzzle complete
			console.log("rightAnswered "+this.rightAnswer +" hidden length "+this.hidden.length);
			if(this.rightAnswer==this.hidden.length){
											
						this.score = parseInt(document.getElementById("score").innerHTML);
						this.objLeaderboard.checkForHighScore(this.score);
													
								}
		
							}
							
							
	this.wasAnsweredRight = function(tdIndex){
		
		var isTrue = false; 
		for(var i=0;i<this.rightAnswered.length;i++){
				if(tdIndex==this.rightAnswered[i]) {
						isTrue = true;		
							break;	
							 }		
					}
			return isTrue;		
			}														
		                       										   	
		
		
	this.wasAnsweredWrong = function(tdIndex){
		
		var isTrue = false; 
		for(var i=0;i<this.wrongAnswered.length;i++)
		             {
				if(tdIndex==this.wrongAnswered[i]){	
						isTrue = true;		
							break;	
					   }		
					}
			return isTrue;		
			}
	
	this.save = function(tdIndex,inputValue){
		suduki.saveAndIndicate(tdIndex,inputValue);	
			
		  }
	
	this.setHides = function(){
     
	var level = document.getElementById("level");
	
	if(level.selectedIndex!=-1&&level.selectedIndex!=0){
	            var ind = level.selectedIndex;  
				var hides =  level.options[ind].value;
				suduki.randomHide(hides);			
				}	
	}
	
	
	this.checkGameEnd = function(){
		 
		 $(".highscorepopup, .finishpopup").popup({
			 overlayTheme : "a"
		 });
	 
		if( objGameCon.timeOut==true ){
			objGameCon.hideMenu();
			// check for high score and then display the appropriate game over dialog
			if(parseInt($.trim($("#score").html()))>objLeaderboard.highScore){
			   clearInterval(interEndGame);
				$(".highscorepopup").popup("open");
			 }
			  else 
			  {
			    clearInterval(interEndGame);
			    $(".finishpopup").popup("open");
			    }
			
			
		}
		
		
		
		
	}
	
	this.saveState = function(){
		
		localStorage[Settings.game_name+'GameState'] = $("#table").html();
	  }
	
	this.restoreState = function(){
		$("#table").html(localStorage[Settings.game_name+'GameState']);
	 }
 }


var callCheckGameEnd = function(){
	
	suduki.checkGameEnd();
	
}



