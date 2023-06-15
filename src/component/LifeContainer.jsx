import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { lifeContainer } from '../styles';
import { PlayerContext } from '../stores';
import { useMediaQuery } from '../hooks/useMediaQuery';

const LifeContainer = withStyles(lifeContainer)(({ classes, isRotated }) => {
  const isSmallScreen = useMediaQuery('(max-width: 1000px)');
  const { playerState, plusLife, minusLife } = useContext(PlayerContext);

  const { name, life, cups, carrots, snails, color, textColor } = playerState;
  return (
    <Card className={isSmallScreen ? ( isRotated ? classes.rootSmallRotate : classes.rootSmall) : classes.root} style={{ backgroundColor: color, color: textColor }} variant="outlined">
      {isSmallScreen && <Button size="small" className={classes.minus} onClick={minusLife}>-</Button>}
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.life} component="p">
          {life}
        </Typography>
        {/* <Typography className={classes.cup} align="left">
          {`🏆: ${cups}`}
        </Typography>
        <Typography className={classes.carrot} align="left">
          {`🥕: ${carrots}`}
        </Typography>
        <Typography className={classes.snail} align="left">
          {`🐌: ${snails}`}
        </Typography> */}
      </CardContent>
      {isSmallScreen && <Button size="small" className={classes.plus} onClick={plusLife}>+</Button>}
      {!isSmallScreen && (
      <CardActions className={classes.actionContainer}>
        <Button size="small" className={classes.minus} onClick={minusLife}>-</Button>
        <Button size="small" className={classes.plus} onClick={plusLife}>+</Button>
      </CardActions>)}
    </Card>
  );
});

export default LifeContainer;