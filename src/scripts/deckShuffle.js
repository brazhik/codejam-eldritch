import { gameOptions } from './gameOptions.js';
import ancientsData from '../data/ancients.js';
import { greenCards, brownCards, blueCards } from '../data/mythicCards/index.js';

export const shuffledDeck = {
  stageI: [],
  stageII: [],
  stageIII: []
};

export const openedDeck = {
  stageI: [],
  stageII: [],
  stageIII: []
}

const createRandomArrFunc = (array) => {
  let copy = array.slice();

  return function () {
    if (copy.length < 1) {
      return undefined;
    } else {
      let index = Math.floor(Math.random() * copy.length);
      let item = copy[index];
      copy.splice(index, 1);
      return item;
    }
  };
}

const shuffleArray = (array) => {
  let getRandomItem = createRandomArrFunc(array);

  array.length = 0;

  let item;
  while ((item = getRandomItem()) !== undefined) {
    array.push(item);
  }
}

const fillDeckByVeryEasy = (deck, cards, count) => {
  let getRandomEasyCard = createRandomArrFunc(cards.filter((item) => item.difficulty === 'easy'));
  let getRandomNormalCard = createRandomArrFunc(cards.filter((item) => item.difficulty === 'normal'));

  for (let i = 0; i < count; i++) {
    let item = getRandomEasyCard();

    if (item !== undefined) {
      deck.push(item);
    } else {
      deck.push(getRandomNormalCard());
    }
  }

  shuffleArray(deck);
}

const fillDeckByEasy = (deck, cards, count) => {
  let getRandomCard = createRandomArrFunc(cards.filter((item) => item.difficulty !== 'hard'));

  for (let i = 0; i < count; i++) {
    deck.push(getRandomCard());
  }
}

const fillDeckByNormal = (deck, cards, count) => {
  let getRandomCard = createRandomArrFunc(cards);

  for (let i = 0; i < count; i++) {
    deck.push(getRandomCard());
  }
}

const fillDeckByHard = (deck, cards, count) => {
  let getRandomCard = createRandomArrFunc(cards.filter((item) => item.difficulty !== 'easy'));

  for (let i = 0; i < count; i++) {
    deck.push(getRandomCard());
  }
}

const fillDeckByVeryHard = (deck, cards, count) => {
  let getRandomHardCard = createRandomArrFunc(cards.filter((item) => item.difficulty === 'hard'));
  let getRandomNormalCard = createRandomArrFunc(cards.filter((item) => item.difficulty === 'normal'));

  for (let i = 0; i < count; i++) {
    let item = getRandomHardCard();

    if (item !== undefined) {
      deck.push(item);
    } else {
      deck.push(getRandomNormalCard());
    }
  }

  shuffleArray(deck);
}

const fillFinalShuffledDeck = (ancient, greenDeck, brownDeck, blueDeck) => {
  let getRandomGreenCard = createRandomArrFunc(greenDeck);
  let getRandomBrownCard = createRandomArrFunc(brownDeck);
  let getRandomBlueCard = createRandomArrFunc(blueDeck);

  // Stage I
  for (let i = 0; i < ancient.firstStage.greenCards; i++) {
    shuffledDeck.stageI.push(getRandomGreenCard());
  }

  for (let i = 0; i < ancient.firstStage.brownCards; i++) {
    shuffledDeck.stageI.push(getRandomBrownCard());
  }

  for (let i = 0; i < ancient.firstStage.blueCards; i++) {
    shuffledDeck.stageI.push(getRandomBlueCard());
  }

  shuffleArray(shuffledDeck.stageI);

  // Stage II
  for (let i = 0; i < ancient.secondStage.greenCards; i++) {
    shuffledDeck.stageII.push(getRandomGreenCard());
  }

  for (let i = 0; i < ancient.secondStage.brownCards; i++) {
    shuffledDeck.stageII.push(getRandomBrownCard());
  }

  for (let i = 0; i < ancient.secondStage.blueCards; i++) {
    shuffledDeck.stageII.push(getRandomBlueCard());
  }

  shuffleArray(shuffledDeck.stageII);

  // Stage III
  for (let i = 0; i < ancient.thirdStage.greenCards; i++) {
    shuffledDeck.stageIII.push(getRandomGreenCard());
  }

  for (let i = 0; i < ancient.thirdStage.brownCards; i++) {
    shuffledDeck.stageIII.push(getRandomBrownCard());
  }

  for (let i = 0; i < ancient.thirdStage.blueCards; i++) {
    shuffledDeck.stageIII.push(getRandomBlueCard());
  }

  shuffleArray(shuffledDeck.stageIII);
}

export const shuffleDeck = () => {
  shuffledDeck.stageI.length = 0;
  shuffledDeck.stageII.length = 0;
  shuffledDeck.stageIII.length = 0;

  openedDeck.stageI.length = 0;
  openedDeck.stageII.length = 0;
  openedDeck.stageIII.length = 0;

  const ancient = ancientsData.find((item) => item.id === gameOptions.ancientId);

  const greenTotalCount = ancient.firstStage.greenCards + ancient.secondStage.greenCards + ancient.thirdStage.greenCards;
  const brownTotalCount = ancient.firstStage.brownCards + ancient.secondStage.brownCards + ancient.thirdStage.brownCards;
  const blueTotalCount = ancient.firstStage.blueCards + ancient.secondStage.blueCards + ancient.thirdStage.blueCards;

  const greenDeck = [];
  const brownDeck = [];
  const blueDeck = [];

  // shuffle cards into 3 decks by colors
  switch (gameOptions.complexityId) {
    case 'very-easy':
      fillDeckByVeryEasy(greenDeck, greenCards, greenTotalCount);
      fillDeckByVeryEasy(brownDeck, brownCards, brownTotalCount);
      fillDeckByVeryEasy(blueDeck, blueCards, blueTotalCount);
      break;

    case 'easy':
      fillDeckByEasy(greenDeck, greenCards, greenTotalCount);
      fillDeckByEasy(brownDeck, brownCards, brownTotalCount);
      fillDeckByEasy(blueDeck, blueCards, blueTotalCount);
      break;

    case 'normal':
      fillDeckByNormal(greenDeck, greenCards, greenTotalCount);
      fillDeckByNormal(brownDeck, brownCards, brownTotalCount);
      fillDeckByNormal(blueDeck, blueCards, blueTotalCount);
      break;

    case 'hard':
      fillDeckByHard(greenDeck, greenCards, greenTotalCount);
      fillDeckByHard(brownDeck, brownCards, brownTotalCount);
      fillDeckByHard(blueDeck, blueCards, blueTotalCount);
      break;

    case 'very-hard':
      fillDeckByVeryHard(greenDeck, greenCards, greenTotalCount);
      fillDeckByVeryHard(brownDeck, brownCards, brownTotalCount);
      fillDeckByVeryHard(blueDeck, blueCards, blueTotalCount);
      break;
  }

  fillFinalShuffledDeck(ancient, greenDeck, brownDeck, blueDeck);

  console.log({
    stageI: shuffledDeck.stageI.slice().reverse(),
    stageII: shuffledDeck.stageII.slice().reverse(),
    stageIII: shuffledDeck.stageIII.slice().reverse()
  });
}
