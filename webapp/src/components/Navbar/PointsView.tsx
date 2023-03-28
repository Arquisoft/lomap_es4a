import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { createTheme, IconButton, ListSubheader, makeStyles, Switch, ThemeProvider } from '@mui/material';
import GreenSwitch from './GreenSwitch';

interface PointsViewProps {
  open: boolean;
  onClose: () => void;
}

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2b5387"
        }
      }
    }
  }
});

const PointsView: React.FC<PointsViewProps> = ({ open, onClose }) => {
  const [toggled, setToggled] = React.useState([false, false, false]);

  const handleToggle = (index: number) => {
    setToggled(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
    console.log('abriendo el punto '+index)
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Drawer anchor="left" open={open} sx={{ display: { mt: 500 } }} >
        <List sx={{ width:'200px' }} disablePadding>
          <ListItem>
            <IconButton onClick={onClose}>
              <ChevronLeftIcon />
            </IconButton>
            <ListItemText primary="Points List" />
          </ListItem>
         
          <ListItem>
            <ListItemText primary="Point 1" />
            <GreenSwitch checked={toggled[0]} onChange={() => handleToggle(0)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Point 2" />
            <GreenSwitch checked={toggled[1]} onChange={() => handleToggle(1)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Point 3" />
            <GreenSwitch checked={toggled[2]} onChange={() => handleToggle(2)} />
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default PointsView;
