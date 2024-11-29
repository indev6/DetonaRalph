const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector("#live"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        curretLive: 3,
    },
    action: {
        timerId: setInterval(randomSquare, 2000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.action.countDownTimerId);
        clearInterval(state.action.timerId);
        alert("Game Over! O seu reultado foi: " + state.values.result);
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
    square.classList.remove("enemy")})

    let randomNumber =Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            } else {
                state.values.curretLive--;
                state.view.live.textContent = state.values.curretLive;

                if(state.values.curretLive <= 0) {
                    clearInterval(state.action.countDownTimerId);
                    clearInterval(state.action.timerId);
                    alert("Game Over! O seu reultado foi: " + state.values.result);
                }
            }
        });
    });
}

function initialize() {
    addListenerHitBox();
}

initialize();