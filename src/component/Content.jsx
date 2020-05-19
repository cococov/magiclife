import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LifeContainer } from '.';
import { content } from '../styles';

const Content = withStyles(content)(({ classes }) => {
  return (
    <header className="App-header">
      <div className={classes.container}>
        <div className={classes.subContainer1}>
          <LifeContainer className={classes.player1} player={1} />
          <LifeContainer className={classes.player2} player={2} />
        </div>
        <div className={classes.subContainer2}>
          <LifeContainer className={classes.player3} player={3} />
          <LifeContainer className={classes.player4} player={4} />
        </div>
      </div>
    </header>
  );
});

export default Content;