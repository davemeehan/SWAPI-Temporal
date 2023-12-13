import { Roboto } from 'next/font/google';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { grey, purple } from '@mui/material/colors';
import { PropsWithChildren } from 'react';
import { CssBaseline, CssVarsTheme } from '@mui/material';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: purple[500],
          contrastText: '#fff',
          dark: grey[200],
        },
        background: {
          default: grey[100],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: purple[400],
          contrastText: '#fff',
          dark: grey[900],
        },
        background: {
          default: '#383241',
        },
      },
    },
  },
  components: {
    MuiCard: {
      variants: [
        {
          props: { variant: 'dark' },
          style: {
            backgroundColor: grey[900],
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        outlinedError: {
          borderStyle: 'dashed',
        },
      },
    },
  },
});

export function MuiTheme({ children }: PropsWithChildren) {
  return (
    <CssVarsProvider theme={responsiveFontSizes(theme) as CssVarsTheme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
