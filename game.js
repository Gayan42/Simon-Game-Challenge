var randomNumber = 0;   
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [] ;
var userClickedPattern = [];
var started = false;
var level = 0;
var audio;

//keypressed lisetening function
$(document).keypress(function(){
   if (!started){
    started = true;
    $("h1").text("Level " + level);
    nextSequence();
   }
})


// button press listening function
$(".btn").click(function(){
    if (started){
    var userChosenColour = $(this).attr("id");
    if (userChosenColour === 'blue'){
        audio= new Audio("./sounds/blue.mp3");
        audio.play();
    }else  if (userChosenColour === 'green'){
        audio=new Audio("./sounds/green.mp3");
        audio.play();
    }else  if (userChosenColour === 'red'){
        audio=new Audio("./sounds/red.mp3");
        audio.play();
    }else  if (userChosenColour === 'yellow'){
        audio=new Audio("./sounds/yellow.mp3");
        audio.play();
    }
    userClickedPattern.push(userChosenColour);
    checkArrays();

}
    
});

//generate next random color and animation
function nextSequence(){
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatepressed(randomChosenColour);
 
};

//Adding animations
function animatepressed(currentColor){
    set_flash(currentColor);
    setTimeout(() => {
        remove_flash(currentColor)
    
    }, 1000);
}

function set_flash(currentColor){
    if (currentColor === "red"){
        $("#"+currentColor).addClass("pressed_red");
    } else if (currentColor === "green"){
            $("#"+currentColor).addClass("pressed_green");
        } else if (currentColor === "yellow"){
                $("#"+currentColor).addClass("pressed_yellow");
            } else if (currentColor === "blue"){
                $("#"+currentColor).addClass("pressed_blue");
            }  
}

function remove_flash(currentColor){
    if (currentColor === "red"){
        $("#"+currentColor).removeClass("pressed_red");
    } else if (currentColor === "green"){
            $("#"+currentColor).removeClass("pressed_green");
        } else if (currentColor === "yellow"){
                $("#"+currentColor).removeClass("pressed_yellow");
            } else if (currentColor === "blue"){
                $("#"+currentColor).removeClass("pressed_blue");
            }  
}

//Validate the arrays 
function checkArrays(){
    console.log(gamePattern);
    console.log(userClickedPattern);
    var length_gamePattern = (gamePattern.length);
    var length_userClickedPattern = (userClickedPattern.length);
    for (let index = 0; index < length_userClickedPattern; index++) {
        if (gamePattern[index]===userClickedPattern[index]){
            if (length_gamePattern===(index+1)){
                //alert("Success");
                $("h1").text("Level "+length_userClickedPattern);
                userClickedPattern = [];
                nextSequence();
            }
            
        }else{
            //alert("Fail");
            $("h1").text("Game Over, Press Any key to start.");
            audio = new Audio("./sounds/wrong.mp3");
            audio.play();
            started = false;
            userClickedPattern = [];
            gamePattern = [];
        }
        
    }
    
}
