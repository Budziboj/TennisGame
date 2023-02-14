
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;

const player1Label = "PLAYER 1"
const player2Label = "PLAYER 2"

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}





window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;

    setInterval(function () {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove', (evt) => {
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    })
}

function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function computerMovement() {
    var PADDLE_CENTER = paddle2Y + (PADDLE_HEIGHT / 2);
    if (PADDLE_CENTER < ballY - 35) {
        paddle2Y += 6;
    } else if (PADDLE_CENTER > ballY + 35) {
        paddle2Y -= 6;
    }
}

function moveEverything() {

    computerMovement();

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if (ballX < 0) {
        if (ballY > paddle1Y &&
            ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
            player1Score++;
            // ballSpeedX = -ballSpeedX;
        }
    }


    if (ballX > canvas.width) {
        if (ballY > paddle2Y &&
            ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset()
            player2Score++;
            // ballSpeedX = -ballSpeedX;
        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}


function drawEverything() {
    // next line blanks out the screen with black
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    //this is left player paddle
    colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'rgb(120, 255, 208)');
    //this is right player paddle
    colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'rgb(120, 255, 208)');
    //this is ball
    colorCircle(ballX, ballY, 10, 'white');
    canvasContext.fillText(player1Label, 100, 50);
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Label, 650, 50);
    canvasContext.fillText(player2Score, 650, 100);
}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}



function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}


// cut from top function
// function () {
//     ballX = ballX + 5;

//     console.log(ballX);
//     canvasContext.fillStyle = 'black';
//     canvasContext.fillRect(0, 0, canvas.width, canvas.height);
//     canvasContext.fillStyle = 'white';
//     canvasContext.fillRect(225, 210, 200, 200);
//     canvasContext.fillStyle = 'red';
//     canvasContext.fillRect(ballX, 100, 10, 10);
// }, 20