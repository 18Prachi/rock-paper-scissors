
let userMove = '';
let computerMove = '';
let result = '';
const game = {
    win: 0,
    loss: 0,
    tie: 0
};

const gameHistory = [];

function generateComputerMove(){
    const randomNumber = Math.random();
    if(randomNumber < 1/3)
        computerMove = 'rock';
    else if(randomNumber < 2/3)
        computerMove = 'paper';
    else
        computerMove = 'scissors';
}

function generateResult(){
    if(userMove == computerMove){
        result = 'tie';
        game.tie++;
    }
    else if((userMove == 'rock' && computerMove == 'scissors') || 
        (userMove == 'paper' && computerMove == 'rock') || 
        (userMove == 'scissors' && computerMove == 'paper')){
        result = 'win';
        game.win++;
    }
    else{
        result = 'loss';
        game.loss++;
    }
    gameHistory.push({
        userMove: userMove,
        computerMove: computerMove,
        result: result
    });
    // alert(`Your move - ${userMove} & Computer move - ${computerMove}`);
}

function gameSummary(){
    document.getElementById("win").innerHTML = game.win;
    document.getElementById("loss").innerHTML = game.loss;
    document.getElementById("tie").innerHTML = game.tie;
    document.getElementById("gamePlayed").innerHTML = game.win + game.loss + game.tie;
}

function generateHistory(){
    let history = `<tr>
        <th>#</th>
        <th>Your Move</th>
        <th>Computer's Move</th>
        <th>Result</th>
    </tr>`;
    for(let i = 0; i < gameHistory.length; i++){
        const current_history = gameHistory[i];
        history += `<tr>
            <td>${i+1}</td>
            <td>${current_history.userMove}</td>
            <td>${current_history.computerMove}</td>
            <td>${current_history.result}</td>
        </tr>`
    }
    document.getElementById("gameHistory").innerHTML = history;
}

function resetScore(){
    alert("Resetting");

    localStorage.setItem("gameSummary", JSON.stringify(game));
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
    game.win = 0;
    game.loss = 0;
    game.tie = 0;
    gameHistory.length = 0;


    gameSummary();
    generateHistory();
}

function loadGameState(){
    const savedGame = JSON.parse(localStorage.getItem(gameSummary));
    const savedHistory = JSON.parse(localStorage.getItem(gameHistory));

    if(savedGame) game = JSON.parse(savedGame);
    if(savedHistory) gameHistory = JSON.parse(savedHistory);

    gameSummary();
    generateHistory();
}
