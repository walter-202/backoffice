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
      paper: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
});

export default lightTheme;