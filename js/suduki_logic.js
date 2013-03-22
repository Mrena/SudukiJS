


$(document).on("ready",function(){

  try{

    objLeaderboard.init();
    objLeaderboard.displayLeaderboard();
   // var tempHighScore = objLeaderboard.highScore != null ? objLeaderboard.highScore : 0;
    $("#highScore").html(objLeaderboard.scores[0]);
    }catch(ex){
		console.log(ex);
	}
 
    try{
   
		suduki.coords = objSudukiFetch.coords;
		suduki.initRandomHide();
				}catch(ex){
					console.log(ex);
				}

				$("td").on("vclick",function(e){
					suduki.checkHidden($(this).attr('id'));
					e.preventDefault();
				});
				
				$("#level").on("change",function(){
					 suduki.setHides();
					 
				 });
				
				save = function(tdIndex,inputValue){
					suduki.saveAndIndicate(tdIndex,inputValue);	
						
					  }
						
});
				
			
               