import { grey, orange } from '@material-ui/core/colors';

export default {
  palette: {
    primary: orange
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