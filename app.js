

let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");
//Variables
function mathRendom() {
    return Math.round(Math.random() * 23 + 1) * cell;
}
let cell = 20;
let score = 0;
let deltaX = mathRendom();
let deltaY = mathRendom();
let fx = mathRendom();
let fy = mathRendom();
//snake boody
let snake = [];
snake[0] = {
    x: deltaX,
    y: deltaY
};
snake[1] = {
    x: deltaX - cell,
    y: deltaY
};
snake[2] = {
    x: deltaX - cell * 2,
    y: deltaY
};


function drawSnake() {
    for (i = 0; i < snake.length; i++) {
        ctx.beginPath();
        ctx.arc(snake[i].x, snake[i].y, (cell / 2), 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = "#00ff1d";
        ctx.fill();
        if (i >= 5) {
            for (k = 0; k < snake.length; k++) {
                ctx.beginPath();
                ctx.arc(snake[k].x, snake[k].y, ((cell / 2) + 2), 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fillStyle = "green";
                ctx.fill();
            }
        }
        if (i >= 8) {
            for (j = 0; j < snake.length; j++) {
                ctx.beginPath();
                ctx.arc(snake[j].x, snake[j].y, ((cell / 2) + 4), 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fillStyle = "brown";
                ctx.fill();
            }
        }

    }
}
/*apple drawl*/
function food() {
    ctx.beginPath();
    ctx.arc(fx, fy, (cell / 2), 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "#fa0a0a";
    ctx.fill();
};


//Collapse
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            ctx.fillStyle = "black";
            ctx.font = "50px Arial";
            ctx.fillText('GAME OVER', 100, 200);
            //Sinya4ok
            ctx.beginPath();
            ctx.arc(head.x, head.y, (cell / 2), 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = "blue";
            ctx.fill();
        }
    }
}

/* move arrows*/
document.addEventListener("keydown", direction);
let dir = "right";
function direction(event) {
    if (event.keyCode == 37 && dir != "right" && deltaY != -cell && deltaY != canvas.height + cell)
        dir = "left";
    else if (event.keyCode == 38 && dir != "down" && deltaX != -cell && deltaX != canvas.width + cell)
        dir = "up";
    else if (event.keyCode == 39 && dir != "left" && deltaY != -cell && deltaY != canvas.height + cell)
        dir = "right";
    else if (event.keyCode == 40 && dir != "up" && deltaX != -cell && deltaX != canvas.width + cell)
        dir = "down";
}
// Glazki
function drawEyes() {
    if (dir == "right") {
        ctx.beginPath();
        ctx.arc(snake[0].x + 5, snake[0].y - 5, 2, 0, 2 * Math.PI);
        ctx.arc(snake[0].x + 5, snake[0].y + 5, 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    }
    if (dir == "left") {
        ctx.beginPath();
        ctx.arc(snake[0].x - 5, snake[0].y - 5, 2, 0, 2 * Math.PI);
        ctx.arc(snake[0].x - 5, snake[0].y + 5, 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    }
    if (dir == "up") {
        ctx.beginPath();
        ctx.arc(snake[0].x + 5, snake[0].y - 5, 2, 0, 2 * Math.PI);
        ctx.arc(snake[0].x - 5, snake[0].y - 5, 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    }
    if (dir == "down") {
        ctx.beginPath();
        ctx.arc(snake[0].x + 5, snake[0].y + 5, 2, 0, 2 * Math.PI);
        ctx.arc(snake[0].x - 5, snake[0].y + 5, 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.fill();
    }
}

function reDraw() {
    for (i = 0; i < snake.length; i++) {
        while (snake[i].x == fx && snake[i].y == fy) {
            fx = Math.round(Math.random() * 23 + 1) * cell, fy = Math.round(Math.random() * 23 + 1) * cell
        }
    }
}


//Igra
function drawGame() {
    ctx.clearRect(0, 0, 500, 500)

    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.fillText(score, 20, 40);

    if (deltaX > canvas.width + cell) {
        deltaX = -cell;
    }
    if (deltaX < -cell) {
        deltaX = canvas.width + cell;
    }
    if (deltaY > canvas.height + cell) {
        deltaY = -cell;
    }
    if (deltaY < -cell) {
        deltaY = canvas.height + cell;
    }
    if (dir == "left") deltaX -= cell;
    if (dir == "right") deltaX += cell;
    if (dir == "up") deltaY -= cell;
    if (dir == "down") deltaY += cell;

    let newHead = {
        x: deltaX,
        y: deltaY
    };
    function eat() {
        if (newHead.x === fx && newHead.y === fy) {
            score += 1
            return fx = mathRendom(), fy = mathRendom();

        } else {
            snake.pop();
        }
    }

    reDraw();
    food();
    drawSnake();
    drawEyes();
    eat();
    eatTail(newHead, snake);
    snake.unshift(newHead);
}

let game = '';
let start = document.querySelector('.start');

start.onclick = () => {
    if (game == '') {
        game = setInterval(drawGame, 200);
        start.innerHTML = 'RESTART'
    }
    else {
        document.location.reload(true);
    }
}

function init() {
    drawSnake();
    food();
    //   drawEyes();
    reDraw();
}

init();
