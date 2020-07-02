import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LifeContainer, Timer, MatchLog } from '.';
import { content } from '../styles';
import { PlayerProvider } from '../stores';

const Content = withStyles(content)(({ classes }) => {
  return (
    <header className="App-header">
      <div className={classes.container}>
        <Timer />
        <div className={classes.lifeLogWrapper}>
          <span className={classes.left} />
          <div className={classes.subContainer1}>
            <PlayerProvider player={1}>
              <LifeContainer className={classes.player1} />
            </PlayerProvider>

            <PlayerProvider player={3}>
              <LifeContainer className={classes.player3} />
            </PlayerProvider>
          </div>
          <div className={classes.subContainer2}>
            <PlayerProvider player={2}>
              <LifeContainer className={classes.player2} />
            </PlayerProvider>

            <PlayerProvider player={4}>
              <LifeContainer className={classes.player4} />
            </PlayerProvider>
          </div>
          <MatchLog />
        </div>
      </div>
    </header>
  );
});

export default Content;