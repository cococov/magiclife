import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { timer } from '../styles';
import { GameContext, AppContext } from '../stores';

const Timer = withStyles(timer)(({ classes }) => {
  const { game, startGame } = useContext(GameContext);
  const { dispatchGameEnd } = useContext(AppContext);

  const handleClock = () => {
    if (game.start) {
      dispatchGameEnd({ type: 'OPEN' });
    } else {
      startGame();
    }
  };

  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={handleClock}
    >
      {game.start ? `${game.time}` : 'START'}
    </Button>
  );
});

export default Timer;
