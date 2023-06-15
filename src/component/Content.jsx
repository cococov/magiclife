import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LifeContainer, Timer, MatchLog } from '.';
import { content } from '../styles';
import { PlayerProvider } from '../stores';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Content = withStyles(content)(({ classes }) => {
  const isSmallScreen = useMediaQuery('(max-width: 1000px)');
  return (
    <header className="App-header">
      <div className={isSmallScreen ? classes.containerSmall : classes.container}>
        <Timer />
        <div className={isSmallScreen ? classes.lifeLogWrapperSmall : classes.lifeLogWrapper}>
          {!isSmallScreen && <span className={isSmallScreen ? classes.leftSmall : classes.left} />}
          <div className={isSmallScreen ? classes.subContainer1Small : classes.subContainer1}>
            <PlayerProvider player={1}>
              <LifeContainer className={isSmallScreen ? classes.player1Small : classes.player1} isRotated={true} />
            </PlayerProvider>

            <PlayerProvider player={3}>
              <LifeContainer className={isSmallScreen ? classes.player3Small : classes.player3} isRotated={false} />
            </PlayerProvider>
          </div>
          <div className={isSmallScreen ? classes.subContainer2Small : classes.subContainer2}>
            <PlayerProvider player={2}>
              <LifeContainer className={isSmallScreen ? classes.player2Small : classes.player2} isRotated={true} />
            </PlayerProvider>

            <PlayerProvider player={4}>
              <LifeContainer className={isSmallScreen ? classes.player4Small : classes.player4} isRotated={false} />
            </PlayerProvider>
          </div>
          {!isSmallScreen && <MatchLog />}
        </div>
      </div>
    </header>
  );
});

export default Content;