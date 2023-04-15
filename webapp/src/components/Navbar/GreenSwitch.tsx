
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const GreenSwitch = withStyles({
  switchBase: {
    color: '#ccc',
    '&$checked': {
      color: 'white',
    },
    '&$checked + $track': {
      backgroundColor: '#00FF00',
    },
  },
  checked: {},
  track: {},
})(Switch);

export default GreenSwitch;
