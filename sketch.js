var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);
    //link program with data base
    database = firebase.database()

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //step 1 : refer to the database - ref() 
    var positionReference = database.ref('ball/position')

    //step2 : creating a listener
    //listener will help keep track of any change in database
    //listener - .on("value", function) 
    //first listen to the value the perform the function

    positionReference.on("value",updatePosition,error)
} 

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
//first ref() to the position then change the value
//set() - help us change the value in database
    database.ref('ball/position').set(
        {
            x:ball.x + x,
            y: ball.y + y
        }
    )
    
}

function updatePosition(data){
    //step 4 :
    //.val( ) helps us read the position
    position = data.val()
    ball.x = position.x
    ball.y = position.y
}


function error(){
    console.log("error")
}