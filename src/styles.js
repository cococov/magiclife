import { orange } from '@material-ui/core/colors';

/*
  Base colors
*/
export const primaryColor = {
  light: '#333842',
  main: '#282c34',
  dark: '#070709',
  text: '#E8F3F8',
  black: '#000000',
  white: '#FFFFFF',
  backgroundColor: '#1d2026',
};

export const secondaryColor = {
  light: '#FDB556',
  main: '#F36B21',
  dark: '#C2551A'
};

/*
  Base Styles
*/
export const baseStyles = {
};

/*
  Base Styles
*/
export const lifeContainer = theme => ({
  root: {
    minWidth: 275,
    margin: 32
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 24
  },
  life: {
    textTransform: 'uppercase',
    fontSize: 64
  },
  cup: {
    fontSize: 18,
  },
  carrot: {
    fontSize: 18,
  },
  minus: {
    textTransform: 'uppercase',
    fontSize: 32,
    flex: 2
  },
  plus: {
    textTransform: 'uppercase',
    fontSize: 32,
    flex: 2
  },
  actionContainer: {
    display: 'flex'
  },
});

export const userConfigModal = theme => ({
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
    backgroundColor: primaryColor.white,
    minWidth: 500,
    minHeight: 420,
    borderRadius: 4
  },
  modalTitle: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 24,
  },
  modalContent: {
    flex: 40,
    display: 'flex',
    flexDirection: 'column'
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
});

export const endGameModal = theme => ({
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
    backgroundColor: primaryColor.white,
    minWidth: 500,
    minHeight: 420,
    borderRadius: 4
  },
  modalTitle: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 24,
  },
  modalContent: {
    flex: 40,
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: 32
  },
  modalButton: {
    fontSize: 16,
    marginTop: 30,
    marginRight: 30,
    marginLeft: 30,
    minWidth: 440
  },
});

export const drawer = theme => ({
  title: {
    fontSize: 24,
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
  drawerBase: {
    flex: 1
  }
});

export const content = theme => ({
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
});

export const timer = theme => ({
  button: {
    fontSize: '2rem',
    minWidth: '10rem',
    minHeight: '5rem',
    alignSelf: 'center',
    backgroundColor: primaryColor.light,
    color: primaryColor.text,
    '&:hover': {
      backgroundColor: primaryColor.main,
    },
  }
});

const stylesheet = {};

export default stylesheet;