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
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';
import { drawer } from '../styles';
import { AppContext } from '../stores';

const CustomDrawer = withStyles(drawer)(({ classes }) => {
  const {
    drawerState,
    dispatchDrawer,
    dispatchGameEnd,
    onOpenGameConfig,
    dispatchUserConfig
  } = useContext(AppContext);

  return (
    <Fragment key="left">
      <Drawer
        anchor="left"
        open={drawerState.isOpenDrawer}
        onClose={() => dispatchDrawer({ type: 'CLOSE' })}
      >
        <div
          role="presentation"
          onClick={() => dispatchDrawer({ type: 'CLOSE' })}
          onKeyDown={() => dispatchDrawer({ type: 'CLOSE' })}
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
                onClick={() => dispatchUserConfig({ type: 'OPEN', player: (index + 1) })}
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
              onClick={onOpenGameConfig}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Config'}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => dispatchGameEnd({ type: 'OPEN' })}
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