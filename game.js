var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var lose = false;
var flag = true;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level += 1;
    $("h1").text("Level "+level);
}

function clickHandler() { 
    $(".btn").click(function (e) { 
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswers(userClickedPattern.length-1);
    });
}

function playSound(name) {  
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}




$(document).keypress(function (e) {
    if (flag){
    console.log("starting");
    clickHandler();
    nextSequence();
    flag = false; 
    }
    });

function checkAnswers(index){
    if (gamePattern[index] === userClickedPattern[index]){
        console.log("success");
        if (gamePattern.length === index+1){
            userClickedPattern = [];
           setTimeout(nextSequence(), 2000);
        }
    }
    else{
        lose = true;
        playSound("wrong");
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){$("body").removeClass("game-over")}, 200)
        $("h1").text("Game over, press any key to restart");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
    flag = true;
    console.log("startover");
}


