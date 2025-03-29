// list of cards
const cardImages = [
    "1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png"
  ];
//   inclishing and setting
  const cards = [...cardImages, ...cardImages];
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let wrongAttempts = 0;

//   creating objects
  const gameBoard = document.getElementById('gameBoard');
  const restartButton = document.getElementById('restartButton');
  const attemptsDisplay = document.getElementById('attempts');

//   mixing cards
  function mixCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

//   creating board
  function createBoard() {
    mixCards(cards);
    gameBoard.innerHTML = '';
    cards.map((image, index) => {
      const card = document.createElement('div');
      card.setAttribute("class","card w-20 h-20 flex items-center justify-center bg-gray-700 cursor-pointer rounded-lg overflow-hidden")
      card.dataset.image = image;
      card.dataset.index = index;
      card.addEventListener('click', flipCard);
      const cardImage = document.createElement('img');
      cardImage.src = `../Assets/guviIcon.png`;
      cardImage.setAttribute("class","w-full h-full object-cover");
      card.appendChild(cardImage);
      gameBoard.appendChild(card);
    });
  }

  // fliping card
  function flipCard() {
    // console.log(firstCard,secondCard)
    if (lockBoard || this === firstCard) return;
    const imgElement = this.querySelector('img');
    imgElement.src = `../Assets/${this.dataset.image}`;
    // console.log(this)

    if (!firstCard) {
      firstCard = this;
    } else {
      secondCard = this;
      checkMatch();
    }
  }

  // checking card is match

  function checkMatch() {
    lockBoard = true;
    if (firstCard.dataset.image === secondCard.dataset.image) {
      resetCards();
    } else {
      wrongAttempts++;
      attemptsDisplay.textContent = `Wrong Attempts: ${wrongAttempts}`;
      setTimeout(() => {
        firstCard.querySelector('img').src = '../Assets/guviIcon.png';
        secondCard.querySelector('img').src = '../Assets/guviIcon.png';
        resetCards();
      }, 1000);
    }
  }

  // reseting card for chosing
  function resetCards() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }

  // restart game
  restartButton.addEventListener('click', () => {
    wrongAttempts = 0;
    attemptsDisplay.textContent = 'Wrong Attempts: 0';
    createBoard();
  });

  createBoard();