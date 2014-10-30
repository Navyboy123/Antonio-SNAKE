var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var context;
var screenWidth;
var screenHeight;
var gameState;
var gameOverMenu;

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000/20);


function gameInitialize () {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    
    document.addEventListener("keydown", keyboardHandler);
    
    gameOverMenu= document.getElementById("gameOver");
    centerMenuPosistion(gameOverMenu);
    
    setState("Play");
}

function gameLoop (){
    gameDraw();
    if (gameState == "Play"){
    snakeUpdate();
    snakeDraw();
    foodDraw();
    }
}

function gameDraw () {
     context.fillStyle ="rgb(237,36,36)";
     context.fillRect(0, 0, screenWidth , screenHeight);
}

function snakeInitialize (){
    snake=[];
    snakeDirection= "down";
    snakeLength=3;
    snakeSize=20;
    
    for(var index = 0; index < snakeLength; index++){
        snake.push({
            x:index,
            y:0        
        });
    }
} 

function snakeDraw (){
    for (var index = 0; index < snake.length; index++){
     context.fillStyle = "blue";
     context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
     context.strokeStyle = "white";
     context.strokeRect = (snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
     
    }
}

function snakeUpdate () {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    if (snakeDirection == "down"){
        snakeHeadY++;
    }
    else if (snakeDirection == "right"){
        snakeHeadX++;
    }
    else if (snakeDirection == "up"){
        snakeHeadY--;
    }
    
     else if(snakeDirection == "left"){
        snakeHeadX--;
    }
    
    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY);
    checkSnakeCollisions(snakeHeadX, snakeHeadY);
    
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}


function foodInitialize() {
    food = {
        x: 0,
        y: 0
        
    };
    setFoodPosition();
}

function foodDraw() {
    context.fillstyle = "white";
    context.fillRect(food.x * snakeSize , food.y * snakeSize , snakeSize, snakeSize);
}

function setFoodPosition(){
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor (randomX / snakeSize);
    food.y = Math.floor (randomY / snakeSize); 
}

function keyboardHandler(event) {
    
    if(event.keyCode == "39" && snakeDirection !== "left") {
        snakeDirection = "right";
    }else if(event.keyCode == "38" && snakeDirection !== "down"){
        snakeDirection = "up";
    }else if(event.keyCode=="40" && snakeDirection !== "up"){
        snakeDirection = "down";
    }else if(event.keyCode=="37" && snakeDirection !== "right"){
        snakeDirection = "left";
    }
}

function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX == food.x && snakeHeadY == food.y){
        snake.push({
            x:0,
            y:0
        });
        snakeLength++;
        setFoodPosition();
    }
}

function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if(snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0 || snakeHeadY * snakeSize >= screenHeight || snakeHeadY * snakeSize< 0){
        console.log("Wall Collision!");
        setState ("GameOver");
    }
} 

 function checkSnakeCollisions(snakeHeadX, snakeHeadY) {
     for( var index = 1; index < snake.length; index++){
         if(snakeHeadX == snake [index].x && snakeHeadY == snake [index].y){
             console.log ("snakeCollisions"); 
         }
     }
 }
 
 function setState (state) {
     gameState = state;
     showMenu(state);
 } 
 
 /*-----------------------------------------------------------------------------
  * Menu Functions
  * ----------------------------------------------------------------------------
  */
 
 function displayMenu (menu){
     menu.style.visibility = "visible";
 }
 
 function showMenu (state){
     if (state == "GameOver"){
         displayMenu(gameOverMenu);
     }
 } 
 
 function centerMenuPosistion (menu) {
     menu.style.top= (screenHeight / 2) - (menu.offsetHeight / 2 ) + "px";
     menu.style.left= (screenWidth / 2) - (menu.offsetWidth / 2 ) + "px";
 }
 
 
 


