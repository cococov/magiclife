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
    margin: 100
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 24,
  },
  life: {
    textTransform: 'uppercase',
    fontSize: 64,
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

const LifeContainer = ({ user }) => {
  const classes = useStyles();
  const [life, setLife] = useState(40);

  useEffect(() => {
    let ref = Firebase.database().ref(user);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      setLife(result);
    });
  }, [user]);

  const handlePressPlus = () => {
    let ref = Firebase.database().ref(user);
    ref.set((life + 1));
  };

  const handlePressMinus = () => {
    let ref = Firebase.database().ref(user);
    ref.set((life - 1));
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {user}
        </Typography>
        <Typography className={classes.life} component="p">
          {life}
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