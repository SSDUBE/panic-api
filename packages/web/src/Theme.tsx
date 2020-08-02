import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
} from '@material-ui/core/styles';

export const baseTheme: Theme = createMuiTheme({
  spacing: (factor) => `${0.5 * factor}rem`,
  palette: {
    primary: {
      main: '#090208',
      light: '#210d1f',
    },
    secondary: {
      main: '#801737',
      light: '#e90052',
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#2b0e29',
      },
      label: {
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
    },
    MuiSvgIcon: {
      root: {
        color: '#fff',
      },
    },
    MuiInputLabel: {
      outlined: {
        color: '#fff !important',
      },
    },
    MuiOutlinedInput: {
      root: {
        color: '#fff',

        '& .MuiOutlinedInput-notchedOutline': {
          border: '1px solid #5b505b',
        },
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #5b505b',
          },
        },
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #5b505b',
          },
        },
      },
    },

    MuiBottomNavigationAction: {
      label: {
        color: '#fff',
        fontFamily: 'Roboto-Light',
      },
    },

    MuiTypography: {
      root: {
        color: '#fff',
      },
    },
  },

  typography: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    h1: {
      fontSize: '1rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '4rem',
      fontWeight: 800,
    },
  },
});

export const theme = responsiveFontSizes(baseTheme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
});
