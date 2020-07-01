import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { timer } from '../styles';
import { GameContext } from '../stores';

const Timer = withStyles(timer)(({ classes }) => {
  const { game, dispatchGame } = useContext(GameContext);

  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={() => dispatchGame({ type: `${game.start ? 'STOP' : 'START'}` })}
    >
      {game.start ? `${game.time}` : 'START'}
    </Button>
  );
});

export default Timer;
