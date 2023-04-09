import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { createTheme, Divider, IconButton, ListItemButton, ListSubheader, makeStyles, Switch, ThemeProvider } from '@mui/material';
import GreenSwitch from './GreenSwitch';
import { deletePoint } from '../../solidapi/solidapi';

interface PointsViewProps {
  open: boolean;
  onClose: () => void;
  markerList: google.maps.Marker[]
  deletePoint:(index:number)=>void
}

const theme2 = createTheme({
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



const PointsView: React.FC<PointsViewProps> = ({ open, onClose,markerList,deletePoint }) => {
  const [encendida, setEncendida] = React.useState<boolean[]>([]);

  const [encendidaAll, setEncendidaAll] = React.useState(true);

  React.useEffect(() => {
    // Initialize encendida state with an array of false values
    setEncendida(new Array(markerList.length).fill(true));
  }, [markerList]);

  const handleToggle = (index: number) => {
    setEncendida(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
    markerList[index].setVisible(!encendida[index]);
    console.log(markerList[index].getVisible() + " " + !encendida[index]);
  };
  const handleToggleAll=()=>{
    setEncendidaAll(!encendidaAll)
    markerList.forEach((marker, index) => {
      if(marker.getVisible()==encendidaAll)
      handleToggle(index);
    });
  }
  const handleDeleteButton=(index:number)=>{

    deletePoint(index)
    
  }
  const generatePointsControl = () => {
    return markerList.map((marker, index) => (
      <ListItem key={index}>
        <ListItemText primary={`Point ${index + 1}`} />
        <GreenSwitch checked={encendida[index]} onChange={() => handleToggle(index)} />
        <ListItemButton onClick={() =>{handleDeleteButton(index)} }>
          <DeleteForeverIcon/>
          </ListItemButton>
      </ListItem>
    ));
  };


  
  return (
    
    <ThemeProvider theme={theme2}>
      <Drawer anchor="left" open={open} sx={{ display: { mt: 500 } }} >
        <List sx={{ width:'300px' }} disablePadding>
          <ListItem>
            <IconButton onClick={onClose}>
              <ChevronLeftIcon />
            </IconButton>
            <ListItemText primary="Points List" />
          </ListItem>
          <ListItem>
              <ListItemText primary={"Visibilidad de todos"} />
              <GreenSwitch checked={encendidaAll} onChange={() => handleToggleAll()} />
          </ListItem>
          <Divider sx={{ mt: 2 }} />
          {generatePointsControl()}
          

        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default PointsView;
