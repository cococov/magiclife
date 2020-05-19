import React, { useState, useEffect } from 'react';
import Firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { lifeContainer, primaryColor } from '../styles';

const LifeContainer = withStyles(lifeContainer)(({ classes, player }) => {
  const [cup, setCup] = useState(0);
  const [life, setLife] = useState(40);
  const [snail, setSnail] = useState(0);
  const [carrot, setCarrot] = useState(0);
  const [name, setName] = useState('NoName');
  const [color, setColor] = useState(primaryColor.white);
  const [textColor, setTextColor] = useState(primaryColor.black);

  useEffect(() => {
    let ref = Firebase.database().ref(`player${player}`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      setCup(result.cup);
      setName(result.name);
      setLife(result.life);
      setColor(result.color);
      setSnail(result.snail);
      setCarrot(result.carrot);
      setTextColor(result.textColor);
    });
  }, [player]);

  const handlePressPlus = () => {
    let ref = Firebase.database().ref(`player${player}`).child('life');
    ref.set((life + 1));
  };

  const handlePressMinus = () => {
    let ref = Firebase.database().ref(`player${player}`).child('life');
    ref.set((life - 1));
  };

  return (
    <Card className={classes.root} style={{ backgroundColor: color, color: textColor }} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.life} component="p">
          {life}
        </Typography>
        <Typography className={classes.cup} align="left">
          {`🏆: ${cup}`}
        </Typography>
        <Typography className={classes.carrot} align="left">
          {`🥕: ${carrot}`}
        </Typography>
        <Typography className={classes.carrot} align="left">
          {`🐌: ${snail}`}
        </Typography>
      </CardContent>
      <CardActions className={classes.actionContainer}>
        <Button size="small" className={classes.minus} onClick={handlePressMinus}>-</Button>
        <Button size="small" className={classes.plus} onClick={handlePressPlus}>+</Button>
      </CardActions>
    </Card>
  );
});

export default LifeContainer;