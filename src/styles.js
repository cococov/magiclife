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
    width: '17rem',
    margin: '2rem'
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '1.35rem'
  },
  life: {
    textTransform: 'uppercase',
    fontSize: '4rem'
  },
  cup: {
    fontSize: '1.13rem',
  },
  carrot: {
    fontSize: '1.13rem',
  },
  snail: {
    fontSize: '1.13rem',
  },
  minus: {
    color: 'inherit',
    textTransform: 'uppercase',
    fontSize: '2rem',
    flex: 2
  },
  plus: {
    color: 'inherit',
    textTransform: 'uppercase',
    fontSize: '2rem',
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
    borderRadius: 4,
    '&:focus': {
      outline: 'none',
    }
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
    minHeight: 460,
    padding:25,
    borderRadius: 4,
    '&:focus': {
      outline: 'none',
    }
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
    bottom: '1rem',
    right: '1rem'
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
  lifeLogWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  subContainer1: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  subContainer2: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column'
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
  left: {
    flex: 3,
    width: '28rem'
  }
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

export const matchLog = theme => ({
  card: {
    flex: 3,
    borderRadius: '0.6rem',
    padding: '0.5rem',
    backgroundColor: primaryColor.light,
    width: '28rem',
    height: '40rem',
    marginTop: '3rem',
    textAlign: 'left',
    fontSize: 'large',
    overflowY: 'scroll'
  }
});

const stylesheet = {};

export default stylesheet;