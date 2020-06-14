import React, { Fragment, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { drawer } from '../styles';
import { AppContext } from '../stores';
import clsx from 'clsx';

const DrawerButton = withStyles(drawer)(({ classes }) => {
  const { handleOpenDrawer } = useContext(AppContext);

  return (
    <Fragment>
      <Fab
        color="inherit"
        aria-label="Expand"
        onClick={handleOpenDrawer}
        className={clsx(classes.fab, classes.fabOrange)}
      >
        <AddIcon />
      </Fab>
    </Fragment>
  );
});

export default DrawerButton;