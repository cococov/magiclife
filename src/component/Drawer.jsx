import React, { Fragment, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  People as PeopleIcon,
  Assignment as AssignmentIcon
} from '@material-ui/icons';
import { drawer } from '../styles';
import { AppContext } from '../stores';

const CustomDrawer = withStyles(drawer)(({ classes }) => {
  const {
    isDrawerOpen,
    handleCloseDrawer,
    handleOpenGameModal,
    handleOpenUserConfigModal
  } = useContext(AppContext);

  return (
    <Fragment key="left">
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
      >
        <div
          role="presentation"
          onClick={handleCloseDrawer}
          onKeyDown={handleCloseDrawer}
          className={classes.drawerBase}
        >
          <List>
            <ListItem>
              <Typography
                className={classes.title}
                gutterBottom
              >
                Configuración
              </Typography>
            </ListItem>

            {[
              'Player1',
              'Player2',
              'Player3',
              'Player4'
            ].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => handleOpenUserConfigModal(index + 1)}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}

          </List>

          <Divider />

          <List>
            <ListItem
              button
              onClick={handleOpenGameModal}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Finalizar Juego'}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Fragment>
  );
});

export default CustomDrawer;