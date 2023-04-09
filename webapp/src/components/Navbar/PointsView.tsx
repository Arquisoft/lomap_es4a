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

  const [encendidaAll, setEncendidaAll] = React.useState(true);

  React.useEffect(() => {
    // Initialize encendida state with an array of false values
      let dict: {[id: string]: boolean} = {};
      Object.keys(markerList).forEach((id: string) => {
          dict[id] = true;
      });
    setEncendida(dict);
  }, [markerList]);

  const handleToggle = (id: string) => {
      let newEncendida = encendida;
      encendida[id] = !encendida[id];
      setEncendida(newEncendida);

      markerList[id].setVisible(!markerList[id].getVisible());
      // setEncendida(prevState => {
      //     const newState = [...prevState];
      //     newState[index] = !newState[index];
      //     return newState;
      // });
      // markerList[index].setVisible(!encendida[index]);
      // console.log(markerList[index].getVisible() + " " + !encendida[index]);
  };
  const handleToggleAll=()=>{
    setEncendidaAll(!encendidaAll)
      Object.keys(markerList).forEach((id) => {
          if (markerList[id].getVisible()==encendidaAll) {
              handleToggle(id);
          }
    });
  }
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
        {/*<GreenSwitch checked={encendida[index]} onChange={() => handleToggle(index)} />*/}
          <GreenSwitch onChange={() => handleToggle(id)} checked={encendida[id]} />
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

