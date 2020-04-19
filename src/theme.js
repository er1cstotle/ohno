import { pink } from '@material-ui/core/colors';

export default {
  overrides: {
    MuiToolbar: {
      root: {
        backgroundColor: pink['A400']
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