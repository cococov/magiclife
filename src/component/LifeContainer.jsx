import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { lifeContainer } from '../styles';
import { PlayerContext } from '../stores';

const LifeContainer = withStyles(lifeContainer)(({ classes }) => {
  const { playerState, plusLife, minusLife } = useContext(PlayerContext);

  const { name, life, cups, carrots, snails, color, textColor } = playerState;
  return (
    <Card className={classes.root} style={{ backgroundColor: color, color: textColor }} variant="outlined">
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
      <CardActions className={classes.actionContainer}>
        <Button size="small" className={classes.minus} onClick={minusLife}>-</Button>
        <Button size="small" className={classes.plus} onClick={plusLife}>+</Button>
      </CardActions>
    </Card>
  );
});

export default LifeContainer;