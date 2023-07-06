let score = localStorage.getItem("score");
document.getElementById('score').innerHTML = score;
function rpsGame(yourChoice){
    console.log(yourChoice);
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    // let score = document.getElementById('score');
    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer Choice:', botChoice);

    result = decideWinner(humanChoice, botChoice); // [0,1] human lost | bot won
    console.log(result);

    message = finalMessage(result); // {'message': 'You Won!', 'color': 'green'}
    console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    let rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock':1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'papper':1, 'scissors': 0.5, 'rock': 0}
    };

    let yourScore = rpsDatabase[yourChoice][computerChoice];
    let computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0) {
        score--;
        localStorage.setItem("score", score);
        console.log(localStorage.getItem("score"));
        
        document.getElementById('score').innerHTML = score;
        return {'message': 'You Lost!', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'You Tied!', 'color': 'yellow'};
    } else {
        score++;
        localStorage.setItem("score", score);
        console.log(localStorage.getItem("score"));
        document.getElementById('score').innerHTML = score;
        return {'message': 'You Won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    let imagesDatabase = {
        'rock': '<span id='+'"rock"'+ 'class='+'"shadow-3xl shadow-blue-500/40 bg-white rounded-full p-4 border-8 border-rose-500">'
        +'<i class=' + '"fa-solid fa-hand-back-fist text-7xl"' + '></i>'
   + '</span>',
        'paper': '<span id='+'"paper"'+ 'class='+'"shadow-3xl shadow-blue-500/40 bg-white rounded-full p-4 border-8 border-blue-500">'
        +'<i class=' + '"fa-solid fa-hand text-7xl" '+ '></i>'
   + '</span>',
        'scissors': '<span id='+'"scissors"'+ 'class='+'"shadow-3xl shadow-blue-500/40 bg-white rounded-full p-4 border-8 border-yellow-500">'
        +'<i class=' +'"fa-solid fa-hand-scissors text-7xl"' + '></i>'
   + '</span>'
    }

    // let's remove all the images
    document.getElementById('rock-div').remove();
    document.getElementById('paper-div').remove();
    document.getElementById('scissors-div').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');


    humanDiv.classList.add('sm:basis-1/2', 'md:basis-1/3', 'basis-full', 'flex', 'justify-center');
    botDiv.classList.add('sm:basis-1/2', 'md:basis-1/3', 'basis-full', 'flex', 'justify-center');
    messageDiv.classList.add('sm:basis-1/2', 'md:basis-1/3', 'basis-full', 'flex', 'justify-center');

    humanDiv.innerHTML =  imagesDatabase[humanImageChoice];
    messageDiv.innerHTML = "<h1 class='font-serif' style='color:" + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"; 
    botDiv.innerHTML =  imagesDatabase[botImageChoice]; 

    
    document.getElementById('main-div').appendChild(humanDiv);
    document.getElementById('main-div').appendChild(messageDiv);
    document.getElementById('main-div').appendChild(botDiv);

};

function resetScore() {
    localStorage.setItem("score", 0);
    location.reload();
}

function playAgain() {
    location.reload();
}