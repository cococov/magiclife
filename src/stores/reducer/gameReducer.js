import firebase from '@firebase/app';
import '@firebase/database';

/* Initial State */
const gameInitialState = {
  start: false,
  initialDate: (new Date()),
  time: '00:00:00',
  log: []
};

/**
 * Player reducer
 * @param {object} state - local state
 * @param {String} action.type - type of action
 * @param {Object} action.params - params for the action
 */
const gameReducer = (state, { type, ...params }) => {
  let newLog = [];
  switch (type) {
    case 'START':
      resetGame();
      cleanGameEndStats();
      let date = new Date();
      sendDate(date);
      sendIsStarted(true);
      return { ...state, start: true, initialDate: date };
    case 'STOP':
      sendIsStarted(false);
      finishGame(params.value);
      resetGame();
      return { ...state, start: false };
    case 'RESET_TIME':
      return { ...state, time: '00:00:00' };
    case 'ADD_LOG_LINE':
      newLog = [...state.log, params.value];
      return { ...state, log: newLog };
    case 'CLEAN_GAME_END_STATS':
      setTimeout(() => { cleanGameEndStats(); }, 1000);
      return { ...state };
    case 'time':
      return { ...state, time: params.value };
    case 'isStarted':
      newLog = [...state.log];
      if (params.value) newLog = [`[${state.time}] GAME STARTED`];
      return { ...state, start: params.value, log: newLog };
    case 'initialDate':
      return { ...state, initialDate: params.value };
    case 'DOWNLOAD_LOG':
      console.log('EN EL DISPATCH');
      downloadTxtFile(state.log);
      return {...state};
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

/*
   Methods
 */

/**
* Send the selected cup, carrot and snail
* @param {Object} state - state of the modal
*/
const finishGame = gameEndModalState => {
  let actualCups = 0;
  let actualCarrots = 0;
  let actualSnails = 0;

  let playerStats = { cup: '', carrot: '', snail: '' };

  // if winner is selected, send it
  if (gameEndModalState['gameModalCup'] !== 0) {
    let ref1 = firebase
      .database()
      .ref(`player${gameEndModalState['gameModalCup']}`);
    ref1.on('value', snapshot => {
      const result = snapshot.val();
      playerStats['cup'] = result.name;
      actualCups = result.cup;
    });
    let cup = firebase
      .database()
      .ref(`player${gameEndModalState['gameModalCup']}`)
      .child('cup');
    cup.set((actualCups + 1));
  };

  // if carrot is selected, send it
  if (gameEndModalState['gameModalCarrot'] !== 0) {
    let ref2 = firebase
      .database()
      .ref(`player${gameEndModalState['gameModalCarrot']}`);
    ref2.on('value', snapshot => {
      const result = snapshot.val();
      playerStats['carrot'] = result.name;
      actualCarrots = result.carrot;
    });
    let carrot = firebase
      .database()
      .ref(`player${gameEndModalState['gameModalCarrot']}`)
      .child('carrot');
    carrot.set((actualCarrots + 1));
  };

  // if snail is selected, send it
  if (gameEndModalState['gameModalSnail'] !== 0) {
    let ref3 = firebase
      .database()
      .ref(`player${gameEndModalState['gameModalSnail']}`);
    ref3.on('value', snapshot => {
      const result = snapshot.val();
      playerStats['snail'] = result.name;
      actualSnails = result.snail;
    });
    let snail = firebase
      .database()
      .ref(`player${gameEndModalState['gameModalSnail']}`)
      .child('snail');
    snail.set((actualSnails + 1));
  };

  let playerStatsRef = firebase
    .database()
    .ref('endGameStats');
  playerStatsRef.set(playerStats);
};

/**
 * Reset the player's life
 */
const resetGame = () => {
  for (let i = 1; i <= 4; i++) {
    let ref = firebase
      .database()
      .ref(`player${i}`)
      .child('life');
    ref.set(40);
  }
};

/**
 * Send the actual date to the backend
 */
const sendDate = date => {
  let strDate = date.toString();

  let ref = firebase
    .database()
    .ref(`initialDate`);
  ref.set(strDate);
};

/**
 * Send the started value to the backend
 */
const sendIsStarted = value => {
  let ref = firebase
    .database()
    .ref(`isStarted`);
  ref.set(value);
};

/**
 * Cleans the Game end stats on backend
 */
const cleanGameEndStats = () => {
  let playerStatsRef = firebase
    .database()
    .ref('endGameStats');
  playerStatsRef.set({ cup: '', carrot: '', snail: '' });
};

/**
 * Download txt with log
 */
const downloadTxtFile = (log) => {
  console.log(log);
  const parsedText = log.reduce((accum, actualValue) => `${accum}${actualValue}\n` ,'');
  const element = document.createElement("a");
  const file = new Blob([parsedText], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = `matchLog-${(new Date()).toString()}.txt`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};

export {
  gameReducer,
  gameInitialState
}