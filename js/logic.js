 	 var objGameCon = new GameController();
 	 var objLeaderboard = new Leaderboard();
 	 var suduki = new SudukiJS();
 	 var restarted = false;
 	 
 	$(document).on({
 		
 		mobileinit : function(){
      try{
      
      objGameCon.applySettings();
      
	    }catch(ex){
		    console.log(ex);
	    	}
	
 	}
 	
 	});
 	
 	
 	$("#leaderboard").on({
 		pageinit : function(){
 			  objLeaderboard.init();
 		      objLeaderboard.displayLeaderboard();
 			
 		}
 	});
 	

 	$("#game").on({
 		pageshow : function(){
 			  objGameCon.showMenu();
 		}
 	});
 	
 	

	 $(document).ready(function(){
		 Settings.getFromLocal();
		// show the login panel if the user has chose to password protect the game
	 	 	Settings.password_protect == "on" && !(restarted) ?  objGameCon.showLoginPanel() : "";
	 	 	console.log(Settings.password_protect);
	 	 	
	 	 	Settings.displayRecoveryQuestions();
	 	 	 $(".gameName").html(Settings.game_name);
	 	 	
		 $(".activeSocialHub").hide();
		 
		 $("#popupLogin, #popupforgotpass, #exitpopup").popup({
			 overlayTheme : "a"
		 });
		 
		 $("#exit").on("vclick",function(e){
			 console.log("exit clicked");
			 $("#exitpopup").popup("open");
			 
			 e.preventDefault();
		 });
		 
		 
		 
	 $(".back").on("vclick",function(e){
 	
    
	if(objGameCon.gameStarted==true){
	    $("#newGame h3").html("Resume");
	    $("#newGame p").html("Continue where you left off.");
	    clearInterval(interEndGame);
	    objGameCon.pause();
	     }
	    $.mobile.changePage("#index");
	    
	    e.preventDefault();
	});
	 
	 $(".btnDismiss").on("vclick",function(e){
		 
		 $("#score").html("30");
		 objGameCon.timeOut = false;
		 $.mobile.changePage("#index");
		 
		 e.preventDefault();
	 });

		$("#newGame").on("vclick",function(){
  
     	 objGameCon.startGame();
     	 interEndGame =  setInterval("callCheckGameEnd()",1000);
		});


 	$(".finishpopup, .highscorepopup").bind({ 
 		popupafteropen : function(event,ui){
 			console.log($("#score").html());
			$(".newHighScore, .currentScore").html($("#score").html());
			
		},
		popupafterclose : function(event,ui){
			
			 if($(this).hasClass("highscorepopup")){
				 objGameCon.validateHighScorePopup();
					 }
			
			
		}
 	});

 	$("#exitYes").on("vclick",function (e) {
              objGameCon.exitGame();
              e.preventDefault();
          });
 	
 	
     $("#restart").on("vclick",function(e){
    	 objGameCon.restarted = true;
    	 objGameCon.refresher();
    	 e.preventDefault();
     });   
          
     $("#lock").bind("vclick",function(e){
    	 
    	 $element = $(this);
    	 Settings.setPasswordProtect("on");
    	 setTimeout(function(){
    		 $element.removeClass("ui-btn-active");
    	 },100);
    	 
 
    	 
    	 e.preventDefault();
     });
          
     
    $(".enterScore").on("vclick",function(e){
    	objGameCon.validateHighScorePopup();
		 e.preventDefault();
	});  
    
    $("#restart").on("vclick",function(e){
    	objGameCon.gameStarted = false;
    	window.location = "index.html";
    	e.preventDefault();
    });
    
    $("#popupPanel").on({
        popupbeforeposition: function() {
            var h = $( document ).height();
            $( "#popupPanel" ).css( "height", h );
        }
    });
    
  
		
});
	