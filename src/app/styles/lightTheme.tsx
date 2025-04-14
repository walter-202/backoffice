import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ADD8E6',
    },
    secondary: {
      main: '#FFDAB9',
    },
    background: {
      default: '#f9f9f9',
      menu: '#151524',
      paper: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      contrast: '#f9f9f9',
    },
  },
});

export default lightTheme;