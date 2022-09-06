import './index.html';
import './style/style.css';

import { generateGameComplexityButtons } from './scripts/gameOptions.js';
import { processDeckEvents } from './scripts/deckEvents.js';

generateGameComplexityButtons();
processDeckEvents();
