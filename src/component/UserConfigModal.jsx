import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Modal, Button, Typography, Divider } from '@material-ui/core';
import { userConfigModal } from '../styles';
import { AppContext } from '../stores';

const UserConfigModal = withStyles(userConfigModal)(({ classes }) => {
  const {
    isOpenUserModal,
    modalName,
    modalColor,
    modalPlayer,
    modalTextColor,
    setModalName,
    setModalColor,
    setModalTextColor,
    handleAceptUserConfigModal,
    handleCloseUserConfigModal
  } = useContext(AppContext);

  return (
    <Modal
      className={classes.modal}
      open={isOpenUserModal}
      onClose={handleCloseUserConfigModal}
    >
      <div className={classes.paper}>
        <div className={classes.modalTitle}>
          <Typography className={classes.title} align="left">
            {`Player ${modalPlayer}`}
          </Typography>
        </div>
        <Divider />
        <div className={classes.modalContent}>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            value={modalName}
            onChange={(e) => setModalName(e.target.value)}
          />
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Color de fondo"
            variant="outlined"
            value={modalColor}
            onChange={(e) => setModalColor(e.target.value)}
          />
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Color de texto"
            variant="outlined"
            value={modalTextColor}
            onChange={(e) => setModalTextColor(e.target.value)}
          />
          <Button
            className={classes.modalButton}
            variant="contained"
            color="primary"
            onClick={handleAceptUserConfigModal}
          >
            ACEPTAR
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default UserConfigModal;