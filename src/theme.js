import { createTheme } from '@mui/material/styles';

export const customColors = {
  'tertiary-fixed-dim': '#ccccec',
  'on-secondary-fixed-variant': '#435f6d',
  primary: '#005faf',
  'surface-container-highest': '#e3e2e5',
  'on-primary-fixed-variant': '#005caa',
  'surface-container': '#f0edef',
  'surface-tint': '#005faf',
  'tertiary-dim': '#50516c',
  'on-surface-variant': '#5f5f61',
  background: '#fcf8f9',
  'secondary-dim': '#3a5764',
  'primary-fixed': '#d4e3ff',
  'on-secondary-fixed': '#264350',
  'error-dim': '#4e0309',
  'inverse-on-surface': '#9e9c9d',
  'surface-container-lowest': '#ffffff',
  'on-secondary-container': '#395663',
  outline: '#7b7a7d',
  tertiary: '#5c5d78',
  secondary: '#466370',
  'on-tertiary-container': '#4b4c67',
  'on-primary': '#f6f7ff',
  'primary-dim': '#00539a',
  'tertiary-container': '#dbdafb',
  'surface-container-low': '#f6f3f4',
  'on-primary-container': '#005299',
  'error-container': '#fe8983',
  surface: '#fcf8f9',
  'inverse-primary': '#4e9af9',
  'surface-bright': '#fcf8f9',
  'secondary-fixed-dim': '#bbd9e9',
  'on-error': '#fff7f6',
  'outline-variant': '#b2b1b4',
  'surface-variant': '#e3e2e5',
  'on-tertiary-fixed-variant': '#555671',
  'on-tertiary': '#fbf7ff',
  error: '#9f403d',
  'primary-fixed-dim': '#bdd6ff',
  'surface-dim': '#dbd9dd',
  'surface-container-high': '#eae7ea',
  'on-surface': '#323235',
  'on-error-container': '#752121',
  'secondary-container': '#c9e7f7',
  'secondary-fixed': '#c9e7f7',
  'on-secondary': '#f3faff',
  'on-tertiary-fixed': '#383a53',
  'on-background': '#323235',
  'tertiary-fixed': '#dbdafb',
  'inverse-surface': '#0e0e0f',
  'primary-container': '#d4e3ff',
  'on-primary-fixed': '#004079',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: customColors.primary },
    secondary: { main: customColors.secondary },
    error: { main: customColors.error },
    background: {
      default: customColors.background,
      paper: customColors['surface-container-lowest'],
    },
    text: {
      primary: customColors['on-surface'],
      secondary: customColors['on-surface-variant'],
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@keyframes pulse': {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.2)', opacity: 0.6 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        body: {
          backgroundColor: customColors.background,
          color: customColors['on-background'],
        },
        '.material-symbols-outlined': {
          fontVariationSettings:
            '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
        },
      },
    },
  },
});

export default theme;
