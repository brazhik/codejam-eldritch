import { shuffledDeck, openedDeck } from './deckShuffle.js';
import { setStagesNumbers } from './gameOptions.js';

const onCardBack = () => {
  let card;

  switch (true) {
    case (shuffledDeck.stageI.length > 0):
      card = shuffledDeck.stageI.pop();
      openedDeck.stageI.push(card);
      openCard(card);
      break;

    case (shuffledDeck.stageII.length > 0):
      card = shuffledDeck.stageII.pop();
      openedDeck.stageII.push(card);
      openCard(card);
      break;

    case (shuffledDeck.stageIII.length > 0):
      card = shuffledDeck.stageIII.pop();
      openedDeck.stageIII.push(card);
      openCard(card);
      break;

    default:
      return;
  }

  setStagesNumbers();
}

const onCardFace = () => {
  let card;

  switch (true) {
    case (openedDeck.stageIII.length > 0):
      shuffledDeck.stageIII.push(openedDeck.stageIII.pop());
      closeCard(openedDeck.stageIII.at(-1) || openedDeck.stageII.at(-1));
      break;

    case (openedDeck.stageII.length > 0):
      shuffledDeck.stageII.push(openedDeck.stageII.pop());
      closeCard(openedDeck.stageII.at(-1) || openedDeck.stageI.at(-1));
      break;

    case (openedDeck.stageI.length > 0):
      shuffledDeck.stageI.push(openedDeck.stageI.pop());
      closeCard(openedDeck.stageI.at(-1));
      break;

    default:
      return;
  }

  setStagesNumbers();
}

const openCard = (card) => {
  const cardFace = document.querySelector('.card-face');
  cardFace.classList.remove('card-none');
  cardFace.style.backgroundImage = `url('${card.cardFace}')`

  if (shuffledDeck.stageIII.length === 0) {
    const cardBack = document.querySelector('.card-back');
    cardBack.classList.add('card-none');
  }
}

const closeCard = (lastOpenedCard) => {
  const cardFace = document.querySelector('.card-face');

  if (lastOpenedCard === undefined) {
    cardFace.style.backgroundImage = ``;
    cardFace.classList.add('card-none');
  } else {
    cardFace.style.backgroundImage = `url('${lastOpenedCard.cardFace}')`
  }

  const cardBack = document.querySelector('.card-back');
  cardBack.classList.remove('card-none');
}

export const processDeckEvents = () => {
  const cardBack = document.querySelector('.card-back');
  cardBack.addEventListener('click', onCardBack);

  const cardFace = document.querySelector('.card-face');
  cardFace.addEventListener('click', onCardFace);
}
