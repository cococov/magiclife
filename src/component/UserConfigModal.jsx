import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Modal, Button, Typography, Divider } from '@material-ui/core';
import { userConfigModal } from '../styles';
import { AppContext } from '../stores';

const UserConfigModal = withStyles(userConfigModal)(({ classes }) => {
  const {
    userConfigState,
    dispatchUserConfig
  } = useContext(AppContext);

  return (
    <Modal
      className={classes.modal}
      open={userConfigState.isOpenUserModal}
      onClose={() => dispatchUserConfig({ type: 'CLOSE' })}
    >
      <div className={classes.paper}>
        <div className={classes.modalTitle}>
          <Typography className={classes.title} align="left">
            {`Player ${userConfigState.modalPlayer}`}
          </Typography>
        </div>
        <Divider />
        <div className={classes.modalContent}>
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            value={userConfigState.modalName}
            onChange={
              (e) => dispatchUserConfig({
                type: 'modalName',
                value: e.target.value
              })
            }
          />
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Color de fondo"
            variant="outlined"
            value={userConfigState.modalColor}
            onChange={
              (e) => dispatchUserConfig({
                type: 'modalColor',
                value: e.target.value
              })
            }
          />
          <TextField
            className={classes.textInput}
            id="outlined-basic"
            label="Color de texto"
            variant="outlined"
            value={userConfigState.modalTextColor}
            onChange={
              (e) => dispatchUserConfig({
                type: 'modalTextColor',
                value: e.target.value
              })
            }
          />
          <Button
            className={classes.modalButton}
            variant="contained"
            color="primary"
            onClick={() => dispatchUserConfig({ type: 'ACCEPT' })}
          >
            ACEPTAR
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default UserConfigModal;