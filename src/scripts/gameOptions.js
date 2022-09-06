import gameComplexity from '../data/gameComplexity.js';
import { shuffledDeck, shuffleDeck } from './deckShuffle.js';

export const gameOptions = {
  ancientId: '',
  complexityId: ''
};

const addGameComplButtons = (container) => {
  gameComplexity.forEach(
    (complexity) => {
      const li = document.createElement('li');
      li.classList.add('game-complexity-item');
      li.classList.add(complexity.id);
      li.innerHTML = complexity.name;
      container.append(li);
    }
  );
}

const selectAncientAndComplexity = (event) => {
  const ancientId = event.target.closest('div').classList[1];

  if (ancientId === undefined || !event.target.classList.contains('game-complexity-item')) {
    return;
  }

  gameOptions.ancientId = ancientId;
  gameOptions.complexityId = event.target.classList[1];

  setGameOptionsElements();
  showDeck();
  shuffleDeck();
  setStagesNumbers();
}

const setGameOptionsElements = () => {
  const ancients = document.querySelectorAll('.ancient');
  ancients.forEach(
    (item) => {
      item.classList.remove('ancient-selected');

      if (item.classList[1] === gameOptions.ancientId) {
        item.classList.add('ancient-selected');
      }
    }
  );

  const gameComplexityText = document.querySelector('.game-complexity-text');
  gameComplexityText.textContent =
    `Сложность игры: ${gameComplexity.find((item) => item.id === gameOptions.complexityId).name} уровень`;
}

const showDeck = () => {
  const deck = document.querySelector('.deck-wrapper');
  deck.classList.remove('hide');

  const cardBack = document.querySelector('.card-back');
  cardBack.classList.remove('card-none');

  const cardFace = document.querySelector('.card-face');
  cardFace.style.backgroundImage = ``;
  cardFace.classList.add('card-none');
}

export const setStagesNumbers = () => {
  // stage I
  const stageIGreen = document.querySelector('.stage-i>.square-wrapper>.green');
  stageIGreen.textContent = shuffledDeck.stageI.filter((item) => item.color === 'green').length;

  const stageIBrown = document.querySelector('.stage-i>.square-wrapper>.brown');
  stageIBrown.textContent = shuffledDeck.stageI.filter((item) => item.color === 'brown').length;

  const stageIBlue = document.querySelector('.stage-i>.square-wrapper>.blue');
  stageIBlue.textContent = shuffledDeck.stageI.filter((item) => item.color === 'blue').length;

  // stage II
  const stageIIGreen = document.querySelector('.stage-ii>.square-wrapper>.green');
  stageIIGreen.textContent = shuffledDeck.stageII.filter((item) => item.color === 'green').length;

  const stageIIBrown = document.querySelector('.stage-ii>.square-wrapper>.brown');
  stageIIBrown.textContent = shuffledDeck.stageII.filter((item) => item.color === 'brown').length;

  const stageIIBlue = document.querySelector('.stage-ii>.square-wrapper>.blue');
  stageIIBlue.textContent = shuffledDeck.stageII.filter((item) => item.color === 'blue').length;

  // stage III
  const stageIIIGreen = document.querySelector('.stage-iii>.square-wrapper>.green');
  stageIIIGreen.textContent = shuffledDeck.stageIII.filter((item) => item.color === 'green').length;

  const stageIIIBrown = document.querySelector('.stage-iii>.square-wrapper>.brown');
  stageIIIBrown.textContent = shuffledDeck.stageIII.filter((item) => item.color === 'brown').length;

  const stageIIIBlue = document.querySelector('.stage-iii>.square-wrapper>.blue');
  stageIIIBlue.textContent = shuffledDeck.stageIII.filter((item) => item.color === 'blue').length;
}

export const generateGameComplexityButtons = () => {
  const ancientsUL = document.querySelectorAll('.ancient-game-complexity');
  ancientsUL.forEach((item) => addGameComplButtons(item));

  const ancientWrapper = document.querySelector('.ancient-wrapper');
  ancientWrapper.addEventListener('click', selectAncientAndComplexity);
}
