const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img")
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");


const resetGame = () => {
    // Resetting all variables and UI.
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll('button').forEach(button => button.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector('img').src = `images/${isVictory ? 'victory' : 'lost' }.gif`;
        gameModal.querySelector('h4').innerText = `${isVictory ? 'Congrats!' : 'Game Over!' }`;
        gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {

    // Checking if clicked Letter exists in the current word.
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display.
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll('li')[index].innerText = letter;
                wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
            }
        })
    } else {
        // Incrementing wrong guess count and updating hangman image.
        wrongGuessCount++;
        hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Checking if game is over.
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}


// Creating keyboard buttons and adding event listeners
for(let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener('click', getRandomWord);

