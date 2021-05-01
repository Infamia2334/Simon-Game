buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];

level = 0;
//Detecting Keyboard Input from User
var flag = false;  //nextSequence() runs only on the first keydown

$(document).keydown(function(){
    
    if(!flag)
    {
        $("#level-title").text("Level " +level);
        nextSequence();
        flag = true;
        //Game Level Progression
        
        $("#level-title").text("Level " +level);
    }
})
   
//User Generated Next Sequence
$(".btn").click(function(){
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
    
});

function checkAnswer(currentLevel)
{

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function (){
                nextSequence();
            }, 1000);

        }
    }
    else
    {
        console.log("Failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver()
{
    level = 0;
    gamePattern = [];
    flag = false;
}

function nextSequence()
{
    userClickedPattern = [];
    
    level++;
    //Random Generated Next Sequence
    randomNumber = Math.floor(Math.random() * 4) ;
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    console.log(gamePattern);

    $("#" +randomChosenColor).fadeOut(100).fadeIn(50);  //Animation for Random Generation



    

}



function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#" +currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" +currentColor).removeClass("pressed");
    }, 100);
}

