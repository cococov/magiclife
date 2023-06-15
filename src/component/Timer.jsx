import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { timer } from '../styles';
import { GameContext, AppContext } from '../stores';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Timer = withStyles(timer)(({ classes }) => {
  const isSmallScreen = useMediaQuery('(max-width: 1000px)');
  const { game, startGame } = useContext(GameContext);
  const { dispatchGameEnd } = useContext(AppContext);

  const handleClock = () => {
    if (isSmallScreen) return;

    if (game.start) {
      dispatchGameEnd({ type: 'OPEN' });
    } else {
      startGame();
    }
  };

  return (
    <Button
      variant="contained"
      className={isSmallScreen ? classes.buttonSmall : classes.button}
      onClick={handleClock}
    >
      {game.start ? `${game.time}` : 'START'}
    </Button>
  );
});

export default Timer;
