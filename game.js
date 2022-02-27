var level = parseInt(0);
var started = true;
var userClickedPattern = [];
var gamePattern = [];
var highScore = [];
var buttonsColor = ["blue", "green", "red", "yellow"];
var userChosenColour = "";
$(document).keypress(function (event) {
  if (started) {
      level = 0;
    nextSequence();

    started = false;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonsColor[randomNumber];

  $("#" + randomChosenColour)
    .fadeOut(150)
    .fadeIn(150)
   

  gamePattern.push(randomChosenColour);
  $("#level-title").text("level = " + level);
  playSound(randomChosenColour);
}
$(".btn").on("click", function () {
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  // console.log(  userClickedPattern)
});
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  // $("h1").addClass("big-title margin-50");
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
    {
        console.log("success");
        if(gamePattern.length == userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
           
        }
    }
    else{
        playSound("wrong");
        $("body").addClass(".game-over ");
        $("h1").text( "Game Over, Press Any Key to Restart");
        startOver();
        
        console.log(wrong);
    }

}
var index = -1;
function startOver()
{
    if(index<= 9)
    {
      index++;
      highScore.push(level);
      highScore.sort();
     
    }
  else
    {
        index--;
        highScore.pop(highScore[index]);
        highScore.push(level);
        highScore.sort()
    }
   high();
  console.log(highScore);
    started = true;
    gamePattern = [];
}

  $(".btnn").on("click",function(){
    
    for(var i = 0; i< highScore.length; i++)
    {
        document.querySelectorAll("p")[i].innerHTML =  highScore[i];
    }


  })
 



