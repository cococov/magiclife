import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Firebase from 'firebase';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 32
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 24
  },
  life: {
    textTransform: 'uppercase',
    fontSize: 64
  },
  cup: {
    fontSize: 18,
  },
  carrot: {
    fontSize: 18,
  },
  minus: {
    textTransform: 'uppercase',
    fontSize: 32,
    flex: 2
  },
  plus: {
    textTransform: 'uppercase',
    fontSize: 32,
    flex: 2
  },
  actionContainer: {
    display: 'flex'
  },
});

const LifeContainer = ({ player }) => {
  const classes = useStyles();
  const [cup, setCup] = useState(0);
  const [life, setLife] = useState(40);
  const [name, setName] = useState('NoName');
  // eslint-disable-next-line
  const [color, setColor] = useState('#FFFFFF');
  const [carrot, setCarrot] = useState(0);
  // eslint-disable-next-line
  const [textColor, setTextColor] = useState('#000000');

  useEffect(() => {
    let ref = Firebase.database().ref(`player${player}`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      setLife(result.life);
      setName(result.name);
      setCup(result.cup);
      setColor(result.color);
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
    <Card className={classes.root} style={{ backgroundColor: color, textColor: textColor }} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.life} component="p">
          {life}
        </Typography>
        <Typography className={classes.cup} align="left">
          {`Copas: ${cup}`}
        </Typography>
        <Typography className={classes.carrot} align="left">
          {`Zanahorias: ${carrot}`}
        </Typography>
      </CardContent>
      <CardActions className={classes.actionContainer}>
        <Button size="small" className={classes.minus} onClick={handlePressMinus}>-</Button>
        <Button size="small" className={classes.plus} onClick={handlePressPlus}>+</Button>
      </CardActions>
    </Card>
  );
}

export default LifeContainer;