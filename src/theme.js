import { grey, amber } from '@material-ui/core/colors';

export default {
  palette: {
    primary: amber
  },
  overrides: {
    MuiToolbar: {
      root: {
        backgroundColor: grey['900']
      }
    },
    MuiContainer: {
      root: {
        paddingTop: 48
      }
    }
  },
  props: {
    MuiToolbar: {
      variant: 'dense'
    }
  }
};