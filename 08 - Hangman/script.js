const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'dellyorhan',
  'orhanozkercin',
  'istanbul',
  'javascipt',
  'aslapesetme',
  'code',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let correctedLetters = [];
let wrongLetters = [];

const displaySelectedWord = () => {
  wordElement.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) =>
        `<span class='letter'>${
          correctedLetters.includes(letter) ? letter : ''
        }</span>`
    )
    .join('')}
  `;
  const winnerWord = wordElement.innerText.replace(/\n/g, '');
  if (winnerWord === selectedWord) {
    wonGame();
  }
};

displaySelectedWord();

playAgainButton.addEventListener('click', resetGame);

document.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    if (selectedWord.includes(e.key)) {
      correctedLetters.includes(e.key)
        ? showNotification()
        : correctedLetters.push(e.key);
    } else {
      wrongLetters.includes(e.key) ? showNotification() : updateWrongLetters(e);
    }

    console.log(correctedLetters);
    displaySelectedWord();
  }
});

function updateFigureParts() {
  if (wrongLetters.length === 0) {
    figureParts.forEach((item) => (item.style.display = 'none'));
  } else figureParts[wrongLetters.length - 1].style.display = 'block';
}

function updateWrongLetters(e) {
  wrongLetters.push(e.key);
  if (figureParts[wrongLetters.length - 1]) {
    updateFigureParts();
    wrongLettersElement.innerHTML = `
    <p>Wrongs</p>
    <span>${wrongLetters}</span>
    `;
  } else {
    lostGame();
  }
}

function showNotification() {
  notification.classList.add('show');
  setTimeout(() => notification.classList.remove('show'), 2000);
}

function wonGame() {
  finalMessage.innerText = 'Congratulation, you have won the game 🎊';
  popup.style.display = 'flex';
}

function lostGame() {
  finalMessage.innerText = 'You have lost the game 😕';
  popup.style.display = 'flex';
}

function resetGame(e) {
  wrongLetters = [];
  correctedLetters = [];
  wrongLettersElement.innerHTML = '';
  popup.style.display = 'none';
  displaySelectedWord();
  updateFigureParts();
}
