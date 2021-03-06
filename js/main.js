/*------Constants------*/

/*------Variables------*/
let secretNum, currentGuess, guessList, isWinner;

/*------Cached Element References------*/
const messageEl = document.getElementById('message');
const guessesEl = document.getElementById('prevGuesses');
const guessBtn = document.getElementById('guessButton');
const resetBtn = document.getElementById('resetButton');
const guessInput = document.getElementById('guessInput');
const titleEl = document.getElementById(`title`);
const kazoo = new Audio('audio/kazoo.wav');
 
/*------Event Listeners------*/

resetBtn.addEventListener('click', function() {
    init();
});

guessBtn.addEventListener('click', function() {
    if (guessList.length === 0) {
        guessesEl.innerText = 'Previous Guesses:'
    }
    if (isWinner === false) {
        checkGuess(parseInt(guessInput.value));
    }
})

/*------Functions------*/

init();

function init() {
    titleEl.className = '';
    messageEl.className = '';
    guessInput.value = '';
    guessesEl.innerText = '';
    messageEl.innerText = 'Please enter a number between 1 and 100'
    guessList = [];
    isWinner = false;
    secretNum = Math.floor(Math.random()*100) + 1;
    render();
}

function checkGuess (guess) {
    guessInput.value = '';
    if (guess < 1 || guess > 100) {
        messageEl.innerText = 'Whoops!  Please try a number between 1 and 100.';
    } else if (guess === secretNum) {
        titleEl.className = 'animated bounce'
        messageEl.className = 'winner';
        isWinner = true;
        confetti.start(3500);
        setTimeout(function(){kazoo.play();},1000);
        if (guessList.length === 0) {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guess!`
        } else {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guesses!`
        }
    } else if (guess <= secretNum) {
        messageEl.className = 'low';
        messageEl.innerText = `${guess} is too low, please try again!`
        guessList.push(guess);
    } else {
        messageEl.className = 'high';
        messageEl.innerText = `${guess} is too high, please try again!`
        guessList.push(guess);
    }
    render(guess);
}

function render(guess) {
    if (guess === secretNum) {
        var div = document.createElement("div");
        div.id = 'guess';
        div.innerText = guess;
        div.className = 'winner';
        guessesEl.appendChild(div);
    }
    else if (guess > secretNum) {
        var div = document.createElement("div");
        div.id = 'guess';
        div.innerText = guess;
        div.className = 'high';
        guessesEl.appendChild(div);
    } else if (guess < secretNum) {
        var div = document.createElement("div");
        div.id = 'guess';
        div.innerText = guess;
        div.className = 'low';
        guessesEl.appendChild(div);
    }
}


// const btn = document.getElementById('btn');
// const output = document.getElementById('outputtext');
// const prevInput = document.getElementById('prevInput');
// const reset = document.getElementById(`reset`);

// let number = Math.floor(Math.random() * 100);
// console.log(number);
// let prevInputValue = []

// btn.addEventListener('click', function() {
//     let input = parseInt(document.getElementById('userInput').value);

//     if (input === number){
//         output.innerHTML = `You guessed right, your number was ${number}`
//     } else if (input < number) {
//         output.innerHTML = "You guessed too low!";
//         prevInputValue.push(input);
//         prevInput.textContent = `${prevInputValue.toString()}`
//     } else if (input > number) {
//         output.innerHTML = "You guessed too high!";
//         prevInputValue.push(input);
//         prevInput.textContent = `${prevInputValue.toString()}`
//     };
// });