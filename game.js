// STEP-2
var buttonColours = ["red", "blue", "green", "yellow"];//3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var gamePattern = [];//5. At the top of the game.js file, create a new empty array called gamePattern.

var userClickedPattern = [];

var started = false;//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.

var level = 0;//7.2. Create a new variable called level and start at level 0.

//STEP-7
$(document).keypress(function(){//7.1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
    if(!started){
        $("#level-title").text("Level "+level);//7.3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        nextSequence();
        started = true;
    }
});
//STEP-4
$(".btn").click(function(){//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
    var userChosenColour = $(this).attr("id");//2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    userClickedPattern.push(userChosenColour);//4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern

    // console.log(userClickedPattern);
    playSound(userChosenColour);  //5.1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);//8.2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});

//STEP-8
function checkAnswer(currentLevel){//8.1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){//8.3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
        //console.log("success");
        
        if(userClickedPattern.length===gamePattern.length){//8.4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        setTimeout(function(){//8.5. Call nextSequence() after a 1000 millisecond delay.
            nextSequence();
        },1000);
    }

    }else{
        //console.log("wrong");
        playSound("wrong");//9.1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        
        $("h1").text("Game Over, Press Any Key to Restart");//3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.

        $("body").addClass("game-over");//9.2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();//10.2. Call startOver() if the user gets the sequence wrong.
    }
}

function nextSequence(){ //1. Inside game.js create a new function called nextSequence()    
    userClickedPattern = [];//8.6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    level++;//7.4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.

    $("#level-title").text("Level "+level);//7.5. Inside nextSequence(), update the h1 with this change in the value of level.
    var randomNumber = Math.floor(Math.random() * 4);  //2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
    var randomChosenColour = buttonColours[randomNumber];  //4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
    gamePattern.push(randomChosenColour);  //6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
    
    // STEP - 3
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);//5.4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
}

//STEP-6
function animatePress(currentColor){//6.1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
    $("#"+currentColor).addClass("pressed");  //6.2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    setTimeout(function(){  //6.3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
        $("#"+currentColor).removeClass("pressed");
    },100);
}

//STEP-5
function playSound(name){//5.2. Create a new function called playSound() that takes a single input parameter called name.
    var audio = new Audio("sounds/" + name + ".mp3");  //5.3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
    audio.play();
}

function startOver(){//10.1. Create a new function called startOver().
    //10.3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}