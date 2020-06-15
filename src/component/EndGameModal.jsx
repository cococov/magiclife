import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Modal,
  Button,
  Select,
  Divider,
  MenuItem,
  Typography,
  InputLabel,
  FormControl
} from '@material-ui/core';
import { endGameModal } from '../styles';
import { AppContext } from '../stores';

const EndGameModal = withStyles(endGameModal)(({ classes }) => {
  const {
    users,
    gameEndState,
    dispatchGameEnd
  } = useContext(AppContext);

  return (
    <Modal
      open={gameEndState.isOpenGameModal}
      className={classes.modal}
      onClose={() => dispatchGameEnd({ type: 'CLOSE' })}
    >
      <div className={classes.paper}>
        <div className={classes.modalTitle}>
          <Typography className={classes.title} align="left">
            {`Finalizar Partida`}
          </Typography>
        </div>

        <Divider />

        <div className={classes.modalContent}>
          <FormControl className={classes.formControl}>
            <InputLabel>Copa</InputLabel>
            <Select
              label="Copa"
              value={gameEndState.gameModalCup}
              onChange={
                (e) => dispatchGameEnd({
                  type: 'gameModalCup',
                  value: e.target.value
                })
              }
            >
              <MenuItem value={0}>Nadie</MenuItem>
              <MenuItem value={1}>{users[0]}</MenuItem>
              <MenuItem value={2}>{users[1]}</MenuItem>
              <MenuItem value={3}>{users[2]}</MenuItem>
              <MenuItem value={4}>{users[3]}</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Zanahoria</InputLabel>
            <Select
              label="Zanahoria"
              value={gameEndState.gameModalCarrot}
              onChange={
                (e) => dispatchGameEnd({
                  type: 'gameModalCarrot',
                  value: e.target.value
                })
              }
            >
              <MenuItem value={0}>Nadie</MenuItem>
              <MenuItem value={1}>{users[0]}</MenuItem>
              <MenuItem value={2}>{users[1]}</MenuItem>
              <MenuItem value={3}>{users[2]}</MenuItem>
              <MenuItem value={4}>{users[3]}</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Caracol</InputLabel>
            <Select
              label="Caracol"
              value={gameEndState.gameModalSnail}
              onChange={
                (e) => dispatchGameEnd({
                  type: 'gameModalSnail',
                  value: e.target.value
                })
              }
            >
              <MenuItem value={0}>Nadie</MenuItem>
              <MenuItem value={1}>{users[0]}</MenuItem>
              <MenuItem value={2}>{users[1]}</MenuItem>
              <MenuItem value={3}>{users[2]}</MenuItem>
              <MenuItem value={4}>{users[3]}</MenuItem>
            </Select>
          </FormControl>

          <Button
            className={classes.modalButton}
            variant="contained"
            color="primary"
            onClick={() => dispatchGameEnd({ type: 'ACCEPT' })}
          >
            FINALIZAR PARTIDA
          </Button>
        </div>
      </div>
    </Modal >
  );
});

export default EndGameModal;