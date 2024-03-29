import { createTheme } from '@material-ui/core/styles';

const lightTheme = createTheme({
  shape: {
    borderRadius: 8,
  },
  palette: {
    type: 'light',
    primary: {
      main: '#011CAA',
      light: '#ECEEF8',
      dark: '#212F74',
    },
    secondary: {
      main: '#EFAC61',
      light: '#FFDBA5',
    },
    tertiary: {
      main: '#fff',
    },
    text: {
      primary: '#040D3E',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'WorkSansRegular',
    h1: {
      fontFamily: 'WorkSansBold',
    },
    h2: {
      fontFamily: 'WorkSansBold',
    },
    h3: {
      fontFamily: 'WorkSansBold',
    },
    h4: {
      fontFamily: 'WorkSansBold',
    },
    h5: {
      fontFamily: 'WorkSansBold',
    },
    h6: {
      fontFamily: 'WorkSansBold',
    },
  },
});

export default lightTheme;
