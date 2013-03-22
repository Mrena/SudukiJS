
var SudukiFetch = function () {

    this.coords = Array();
    this.numOfCoords = 4;
    this.uniqueArray = Array();
    
    
    this.init = function () {
				try{
	
  				this.coords = JSON.parse(localStorage['coords']);
	
				}
				catch(ex){
                this.coords = {
                    "1": "2-3-5-4-7-1-8-9-6-4-8-9-6-3-5-7-2-1-1-7-6-9-8-2-4-3-5-7-4-8-1-9-6-3-5-2-3-5-1-8-2-4-6-7-9-6-9-2-3-5-7-1-8-4-9-1-7-2-4-8-5-6-3-5-6-3-7-1-9-2-4-8-8-2-4-5-6-3-9-1-7",
                    "2": "7-5-9-2-8-1-3-6-4-4-3-6-7-5-9-1-2-8-8-2-1-4-6-3-7-5-9-2-1-7-3-9-5-8-4-6-6-8-4-1-2-7-9-3-5-5-9-3-8-4-6-2-7-1-9-4-8-6-7-2-5-1-3-1-7-5-9-3-4-6-8-2-3-6-2-5-1-8-4-9-7",
                    "3": "8-1-6-5-7-9-3-2-4-4-2-7-6-3-1-9-5-8-9-5-3-8-2-4-7-6-1-5-3-1-7-9-8-6-4-2-7-4-8-3-6-2-5-1-9-6-9-2-4-1-5-8-7-3-2-6-5-9-4-3-1-8-7-1-7-9-2-8-6-4-3-5-3-8-4-1-5-7-2-9-6"
                };

                localStorage['coords'] = JSON.stringify(this.coords);
                }
            }

    
    this.getCoords = function(){
		 this.init();
		 
		 var randNum = Math.floor(Math.random()*this.numOfCoords);
		 if(randNum==0)
		     this.getCoords();
		 
		    coords = this.coords[randNum].split("-");
		    document.getElementById("table").innerHTML = "";
			
			document.write("<table border='2' align='center'>");
			var count = 0;
			var makeUnique = 0;
							
			         
			     for(var i=0;i<coords.length;i++)
				      {  
					     
				if(count==0)
				     document.write("<tr>");
					else if(count==9)
					         {
					    document.write("</tr>");
					       count = 0;
					          }
				       
					    makeUnique++;
					   document.write("<td vclick='tdClicked(this.id)' id='"+makeUnique+"'>"+coords[i]+"</td>");
					   this.uniqueArray[i] = makeUnique;
					  // console.log("uniqueArray "+this.uniqueArray[i]);
					  
					   count++;
					   
					   } 
						
			document.write("</table>");		
		    suduki.saveState();
	}


}