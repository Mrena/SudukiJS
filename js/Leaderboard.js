var Leaderboard = function () {
    this.scores = Array();
    this.names = Array();
    this.highScore = 0;
    this.numberOfScores = 0;
    this.tempIndex;
    this.tempScore;

    this.init = function () {

        try {
            this.getScores();
            this.getNames();
            this.getCurrentHighScore();
            this.getNumberOfScores();
        } catch (ex) {

            console.log(ex + " in init()");
        }


    }

    this.getScores = function () {
        try {
            this.scores = JSON.parse(localStorage[Settings.game_name+'Scores']);

        }
        catch (ex) {
            this.scores = Array(0,0,0,0,0);
            localStorage[Settings.game_name+'Scores'] = JSON.stringify(this.scores);


        }

    }

    this.getNames = function () {

        try {
            this.names = JSON.parse(localStorage[Settings.game_name+'Names']);
           
        }
        catch (ex) {
            this.names = Array("Teddy Roxpin","Ritz Raynolds","Hannibal King","Iman Omari","Sir Michael Rocks");
            localStorage[Settings.game_name+'Names'] = JSON.stringify(this.names);
            
        }


    }

   this.getCurrentHighScore = function () {
        try {
            $.each(this.scores, function (index, value) {
                if (this.highScore < value)
                    this.highScore = value;
            });
            
        } catch (ex) {
            console.log(ex + " in getHighScore()");
        }
    }

    this.getNumberOfScores = function () {

        this.numberOfScores = this.scores.length;
    }
    
    this.setHighScore = function(name,scoreIndex) {
        try {
         
            this.names[scoreIndex] = name;
            this.scores[scoreIndex] = this.tempScore;

            localStorage[Settings.game_name+'Scores'] = JSON.stringify(this.scores);
            localStorage[Settings.game_name+'Names'] = JSON.stringify(this.names);

        } catch (ex) {
            console.log(ex + " in setHighScore()");
        }

    }

    this.checkForHighScore = function (name,score) {

			
		  var scoreIndex = 100; 
        try {
            $.each(this.scores,function(index,value) {
            	
                if (score > value & scoreIndex == 100){
                     scoreIndex = index;
                	}
				});

            if (scoreIndex != 100) {
                this.tempScore = score;
                this.setHighScore(name,scoreIndex);

            }
            
        } catch (ex) {
            console.log(ex + " in checkHighScore()");
        }

    }

    

    this.displayLeaderboard = function () {
          
        try {
        	$("#leaderb").html("");
        	$("#leaderb").html("<div style='text-align:left;color:teal;'>High Score: "+objLeaderboard.scores[0]+"</div>");
            $("#leaderb").append("<center>");
            $("#leaderb").append("<div class'ui-grid-b'>");
            $("#leaderb").append("<div><span class'ui-block-a'>Name</span><span class='ui-block-b'>Number</span></div>");
            var count = 1;
			$.each(this.names, function (value, index) {
                $("#leaderb").append("<div><span class'ui-block-a'>" + index + "</span><span class='ui-block-b'>" + count + "</span></div>");

				count++;
            });
            $("#leaderb").append("</div>");
            $("#leaderb").append("</center>");

        } catch (ex) {
            console.log(ex + " in displayLeaderboard()");
        }
    }


}

