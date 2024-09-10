const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min  to max 
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts += 1;  // Increment attempts

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';  // Display "too low" message
    } else {
      tooHighMessage.style.display = '';  // Display "too high" message
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;

    if (attempts === maxNumberOfAttempts) {
      submitButton.disabled = true;
      guessInput.disabled = true;
      maxGuessesMessage.style.display = '';  // Display "max guesses" message
    }
  }

  guessInput.value = '';  // Clear input field

  resetButton.style.display = '';  // Show reset button
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {  // Correct loop condition
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`Target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;  // Fixed typo
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';  // Hide reset button initially
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();

