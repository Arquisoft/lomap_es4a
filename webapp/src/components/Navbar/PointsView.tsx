import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { createTheme, Divider, IconButton, ListItemButton, ListSubheader, makeStyles, Switch, ThemeProvider } from '@mui/material';
import GreenSwitch from './GreenSwitch';
import EditIcon from '@mui/icons-material/Edit';
import Point from "../../solidapi/Point";
interface PointsViewProps {
    open: boolean;
    onClose: () => void;
    markerList: {[id: string]: google.maps.Marker};
    openEditPoint: ()=>void;
    deletePoint:(id:string)=>void;
}

const theme = createTheme({
  components: {
      MuiDrawer: {
          styleOverrides: {
              paper: {
                  backgroundColor: "#101F33",
                  color: "white"
              }
          }
      }
  }
});



const PointsView: React.FC<PointsViewProps> = ({ open, onClose,markerList,openEditPoint,deletePoint }) => {
  
  const [encendida, setEncendida] = React.useState<{[id: string]: boolean}>({});
      const [checked, setChecked] = React.useState<{[id: string]: boolean}>({});
  const [encendidaAll, setEncendidaAll] = React.useState(true);

  
  React.useEffect(() => {
    setEncendida((prevState) => {
      const newEncendida = { ...prevState };
      Object.keys(markerList).forEach((id) => {
        if (!newEncendida.hasOwnProperty(id)) {
          newEncendida[id] = true;
        }
      });
      return newEncendida;
    });
  }, [markerList]);

  const handleToggle = (id: string) => {
    let newEncendida = {...encendida};
    newEncendida[id] = !encendida[id];
    setEncendida(newEncendida);
  
    markerList[id].setVisible(!markerList[id].getVisible());
  
    let newChecked = {...checked};
    newChecked[id] = !checked[id];
    setChecked(newChecked);
  };
  const handleToggleAll = () => {
    setEncendidaAll(!encendidaAll);
    let newEncendida = {...encendida};
    let newChecked = {...checked};
    Object.keys(markerList).forEach((id) => {
      if (markerList[id].getVisible() === encendidaAll) {
        newEncendida[id] = !newEncendida[id];
        newChecked[id] = !newChecked[id];
        markerList[id].setVisible(!markerList[id].getVisible());
      }
    });
    setEncendida(newEncendida);
    setChecked(newChecked);
  };
  const handleDeleteButton=(id: string)=>{
    deletePoint(id)
  }

  const handleEditButton=()=>{
    openEditPoint();
  }

  let x = [true, true, true];

  const generatePointsControl = () => {
    return Object.keys(markerList).map((id) => (
      <ListItem key={id}>
        <ListItemText primary={markerList[id].getTitle() +": "} />
        <GreenSwitch onChange={() => handleToggle(id)} checked={!checked[id]} />
        <ListItemButton onClick={() =>{handleEditButton()} }>
          <EditIcon/>
        </ListItemButton>
        <ListItemButton onClick={() =>{handleDeleteButton(id)} }>
          <DeleteForeverIcon/>
        </ListItemButton>
      </ListItem>
    ));
  };

  
  
  return (
    
    <ThemeProvider theme={theme}>
      <Drawer anchor="left" open={open} onClose={onClose} sx={{ display: { mt: 500 } }} >
        <List sx={{ width:'300px' }} disablePadding>
          <ListItem>
            <IconButton onClick={onClose} >
              <ChevronLeftIcon sx={{color: "#808b96"}}/>
            </IconButton>
            <ListItemText primary="Points List" />
          </ListItem>
          <ListItem>
              <ListItemText primary={"Visibilidad de todos"} />
              <GreenSwitch checked={encendidaAll} onChange={() => handleToggleAll()} />
          </ListItem>
          <Divider sx={{backgroundColor: "#808b96"}} />
          {generatePointsControl()}
          

        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default PointsView;
function forceUpdate() {
  throw new Error('Function not implemented.');
}

