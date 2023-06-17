import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Modal,
  Button,
  Divider,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { endGameModal } from '../styles';
import { AppContext } from '../stores';

const GameConfigModal = withStyles(endGameModal)(({ classes }) => {
  const {
    gameConfigState,
    onAcceptGameConfig,
    dispatchGameConfig
  } = useContext(AppContext);

  return (
    <Modal
      open={gameConfigState.isOpen}
      className={classes.modal}
      onClose={() => dispatchGameConfig({ type: 'CLOSE' })}
    >
      <div className={classes.paper}>
        <div className={classes.modalTitle}>
          <Typography className={classes.title} align="left">
            {`Configurar Partida`}
          </Typography>
        </div>

        <Divider />

        <div className={classes.modalContent}>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Tiempo de partida (minutos)"
            variant="outlined"
            type='number'
            value={gameConfigState.limitTime}
            onChange={
              (e) => dispatchGameConfig({
                type: 'limitTime',
                value: parseInt(e.target.value)
              })
            }
          />
          <FormControlLabel
           className={classes.formControl}
            control={<Checkbox checked={gameConfigState.hasTimeLimit} onChange={
              (e) => dispatchGameConfig({
                type: 'hasTimeLimit',
                value: !gameConfigState.hasTimeLimit
              })
            } name="checkedA" />}
            label="¿Es con limite de tiempo?"
          />
          <Button
            className={classes.modalButton}
            variant="contained"
            color="primary"
            onClick={onAcceptGameConfig}
          >
            Guardar
          </Button>
        </div>
      </div>
    </Modal >
  );
});

export default GameConfigModal;