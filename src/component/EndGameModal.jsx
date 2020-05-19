import React from 'react';
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

const EndGameModal = withStyles(endGameModal)(({
  classes,
  isOpenGameModal,
  GameModalCup,
  GameModalSnail,
  GameModalCarrot,
  setGameModalCup,
  setGameModalSnail,
  setGameModalCarrot,
  handleAceptModal,
  handleCloseModal,
}) => {
  return (
    <Modal
      open={isOpenGameModal}
      className={classes.modal}
      onClose={handleCloseModal}
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
              value={GameModalCup}
              onChange={(e) => setGameModalCup(e.target.value)}
            >
              <MenuItem value={0}>Nadie</MenuItem>
              <MenuItem value={1}>Player1</MenuItem>
              <MenuItem value={2}>Player2</MenuItem>
              <MenuItem value={3}>Player3</MenuItem>
              <MenuItem value={4}>Player4</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Zanahoria</InputLabel>
            <Select
              label="Zanahoria"
              value={GameModalCarrot}
              onChange={(e) => setGameModalCarrot(e.target.value)}
            >
              <MenuItem value={0}>Nadie</MenuItem>
              <MenuItem value={1}>Player1</MenuItem>
              <MenuItem value={2}>Player2</MenuItem>
              <MenuItem value={3}>Player3</MenuItem>
              <MenuItem value={4}>Player4</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Caracol</InputLabel>
            <Select
              label="Caracol"
              value={GameModalSnail}
              onChange={(e) => setGameModalSnail(e.target.value)}
            >
              <MenuItem value={0}>Nadie</MenuItem>
              <MenuItem value={1}>Player1</MenuItem>
              <MenuItem value={2}>Player2</MenuItem>
              <MenuItem value={3}>Player3</MenuItem>
              <MenuItem value={4}>Player4</MenuItem>
            </Select>
          </FormControl>

          <Button
            className={classes.modalButton}
            variant="contained"
            color="primary"
            onClick={handleAceptModal}
          >
            FINALIZAR PARTIDA
            </Button>
        </div>
      </div>
    </Modal>
  );
});

export default EndGameModal;