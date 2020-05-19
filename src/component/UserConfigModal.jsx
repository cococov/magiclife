import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Modal, Button, Typography, Divider } from '@material-ui/core';
import { userConfigModal } from '../styles';

const UserConfigModal = withStyles(userConfigModal)(({
  classes,
  isOpenModal,
  modalName,
  modalColor,
  modalPlayer,
  modalTextColor,
  setModalName,
  setModalColor,
  setModalTextColor,
  handleAceptModal,
  handleCloseModal
}) => {
  return (
    <Modal
      className={classes.modal}
      open={isOpenModal}
      onClose={handleCloseModal}
    >
      <div className={classes.paper}>
        <div className={classes.modalTitle}>
          <Typography className={classes.title} align="left">
            {`Player ${modalPlayer}`}
          </Typography>
        </div>
        <Divider />
        <div className={classes.modalContent}>
          <TextField className={classes.textInput} id="outlined-basic" label="Nombre" variant="outlined" value={modalName} onChange={(e) => setModalName(e.target.value)} />
          <TextField className={classes.textInput} id="outlined-basic" label="Color de fondo" variant="outlined" value={modalColor} onChange={(e) => setModalColor(e.target.value)} />
          <TextField className={classes.textInput} id="outlined-basic" label="Color de texto" variant="outlined" value={modalTextColor} onChange={(e) => setModalTextColor(e.target.value)} />
          <Button className={classes.modalButton} variant="contained" color="primary" onClick={handleAceptModal}>
            ACEPTAR
            </Button>
        </div>
      </div>
    </Modal>
  );
});

export default UserConfigModal;