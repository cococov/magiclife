import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import LifeContainer from './component/LifeContainer';
import Firebase from 'firebase';
import { firebaseConfig } from './config.json';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  subContainer1: {
    display: 'flex',
    flexDirection: 'row'
  },
  subContainer2: {
    display: 'flex',
    flexDirection: 'row'
  },
  player1: {
    flex: 2,
  },
  player2: {
    flex: 2
  },
  player3: {
    flex: 2
  },
  player4: {
    flex: 2
  },
});

Firebase.initializeApp(firebaseConfig);

const App = () => {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.container}>
          <div className={classes.subContainer1}>
            <LifeContainer className={classes.player1} user="JuanK" />
            <LifeContainer className={classes.player2} user="Peña" />
          </div>
          <div className={classes.subContainer2}>
            <LifeContainer className={classes.player3} user="Fredes" />
            <LifeContainer className={classes.player4} user="Segovia" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;