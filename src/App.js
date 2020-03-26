import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import LifeContainer from './component/LifeContainer';
import Firebase from 'firebase';
import { firebaseConfig } from './config.json';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { orange } from '@material-ui/core/colors';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
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
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabOrange: {
    color: theme.palette.common.white,
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[600],
    },
  },
  title: {
    fontSize: 24,
  },
  subTitle: {
    fontSize: 18,
    marginTop: 30,
    marginLeft: 30
  },
  textInput: {
    fontSize: 16,
    marginTop: 30,
    marginRight: 30,
    marginLeft: 30,
    minWidth: 440
  },
  modalButton: {
    fontSize: 16,
    marginTop: 30,
    marginRight: 30,
    marginLeft: 30,
    minWidth: 440
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 500,
    minHeight: 420,
    borderRadius: 4
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    minWidth: 500,
    minHeight: 420,
    borderRadius: 4
  },
  modalTitle: {
    flex: 1,
    padding: 10
  },
  modalContent: {
    flex: 40,
    display: 'flex',
    flexDirection: 'column'
  },
}));

Firebase.initializeApp(firebaseConfig);

const App = () => {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [idOpenModal, setIsOpenModal] = useState(false);
  const [modalPlayer, setModalPlayer] = useState(1);
  const [modalName, setModalName] = useState(1);
  const [modalColor, setModalColor] = useState(1);
  const [modalTextColor, setModalTextColor] = useState(1);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleModalOpen = (player) => {
    setModalPlayer(player);
    let ref = Firebase.database().ref(`player${player}`);
    ref.on('value', snapshot => {
      const result = snapshot.val();
      setModalName(result.name);
      setModalColor(result.color);
      setModalTextColor(result.textColor);
    });
    setIsOpenModal(true);
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  const handleAceptModal = () => {
    let name = Firebase.database().ref(`player${modalPlayer}`).child('name');
    name.set(modalName);
    let color = Firebase.database().ref(`player${modalPlayer}`).child('color');
    color.set(modalColor);
    let textColor = Firebase.database().ref(`player${modalPlayer}`).child('textColor');
    textColor.set(modalTextColor);
    handleModalClose();
  };

  return (
    <div className="App">
      <Modal
        className={classes.modal}
        open={idOpenModal}
        onClose={handleModalClose}
      >
        <div className={classes.paper}>
          <div className={classes.modalTitle}>
            <Typography className={classes.title} align="left">
              {`Player ${modalPlayer}`}
            </Typography>
          </div>
          <Divider />
          <div className={classes.modalContent}>
            <TextField className={classes.textInput} id="outlined-basic" label="Nombre" variant="outlined" value={modalName} onChange={(e) => setModalPlayer(e.target.value)} />
            <TextField className={classes.textInput} id="outlined-basic" label="Color de fondo" variant="outlined" value={modalColor} onChange={(e) => setModalColor(e.target.value)} />
            <TextField className={classes.textInput} id="outlined-basic" label="Color de texto" variant="outlined" value={modalTextColor} onChange={(e) => setModalTextColor(e.target.value)} />
            <Button className={classes.modalButton} variant="contained" color="primary" onClick={handleAceptModal}>
              ACEPTAR
            </Button>
          </div>
        </div>
      </Modal>
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
      <React.Fragment key="left">
        <Fab aria-label="Expand" className={clsx(classes.fab, classes.fabOrange)} color="inherit" onClick={handleDrawerOpen}>
          <AddIcon />
        </Fab>
        <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
          <div
            className={classes.list}
            role="presentation"
            onClick={handleDrawerClose}
            onKeyDown={handleDrawerClose}
          >
            <List>
              <ListItem>
                <Typography className={classes.title} gutterBottom>
                  Configuración
                </Typography>
              </ListItem>
              {['Player1', 'Player2', 'Player3', 'Player4'].map((text, index) => (
                <ListItem button key={text} onClick={() => handleModalOpen(index + 1)} >
                  <ListItemIcon><PeopleIcon /></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon><AssignmentIcon /></ListItemIcon>
                <ListItemText primary={'Finalizar Juego'} />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default App;