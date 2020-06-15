import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LifeContainer } from '.';
import { content } from '../styles';
import { PlayerProvider } from '../stores';

const Content = withStyles(content)(({ classes }) => {
  return (
    <header className="App-header">
      <div className={classes.container}>
        <div className={classes.subContainer1}>
          <PlayerProvider player={1}>
            <LifeContainer className={classes.player1} />
          </PlayerProvider>

          <PlayerProvider player={2}>
            <LifeContainer className={classes.player2} />
          </PlayerProvider>
        </div>

        <div className={classes.subContainer2}>
          <PlayerProvider player={3}>
            <LifeContainer className={classes.player3} />
          </PlayerProvider>

          <PlayerProvider player={4}>
            <LifeContainer className={classes.player4} />
          </PlayerProvider>
        </div>
      </div>
    </header>
  );
});

export default Content;