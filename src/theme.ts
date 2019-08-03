import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    action: {
      disabled: '#ffffff',
      disabledBackground: '#dddddd'
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#f0a429'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: '#60c6aa'
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00'
    }
    // error: will use the default color
  }
});

export default theme;
