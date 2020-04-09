import { deepPurple } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    type: 'dark',
  },
  overrides: {
    MuiGrid: {
      root: {
        '&.MuiGrid-container': {
          padding: '1.5rem 0',
        },
      },
    },
    MuiBackdrop: {
      root: {
        zIndex: 100,
      },
    },
    MuiTypography: {
      root: {
        '&.MuiTypography-h2': {
          padding: '5rem 0',
        },
        '&.MuiTypography-h3': {
          padding: '5rem 0',
        },
        color: '#fff',
      },
    },
    MuiCheckbox: {
      root: {
        '&.MuiCheckbox-colorPrimary.Mui-checked': {
          color: deepPurple[200],
        },
      },
    },
    MuiSlider: {
      root: {
        color: deepPurple[200],
      },
    },
    MuiFilledInput: {
      root: {
        '&.MuiFilledInput-underline:after': {
          borderColor: deepPurple[200],
        },
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: deepPurple[200],
        },
      },
    },
  },
});
