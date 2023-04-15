import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Alert,
  Autocomplete, Button,
  createTheme,
  IconButton,
  Snackbar,
  ThemeProvider,
} from '@mui/material';
import TextField from "@mui/material/TextField";

// CSS
import "./Option.css";
import Point from "../../solidapi/Point";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {useState} from "react";

import {v4 as uuidv4} from 'uuid';

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

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

function AddPoint({open, onClose, clickedPoint, createPoint}: any) {

  const options = ["Bar", "Club", "Sight", "Monument", "Other"];
  const [pointName, setPointName] = useState("");
  const [pointDescription, setPointDescription] = useState("");
  const [pointCategoryValue, setPointCategoryValue] = useState("");
  const [pointCategoryInputValue, setPointCategoryInputValue] = useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  }

  const cancel = () => {
    onClose();
  }

  const save = () => {
    if (pointName === '' ){
      if(pointCategoryInputValue !== ''){
        setErrorCategory(false);
      }
      setErrorName(true);

    } else if(pointCategoryInputValue === '') {
      if (pointName !== '' ){
        setErrorName(false);
      }
      setErrorCategory(true);
      //setOpenDialog(true);
      
    } else {
      onClose();
      setPointName("");
      setPointDescription("");
      setPointCategoryInputValue("");
      let point: Point = new Point(uuidv4(), pointName, pointCategoryInputValue, clickedPoint.lat, clickedPoint.lng, pointDescription);
      createPoint(point);
      setOpenAlert(true);
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
      <ThemeProvider theme={theme}>
        <Drawer anchor="left" open={open} onClose={onClose} >
          <List sx={{ width:'20em' }} disablePadding>
            <ListItem>
              <IconButton onClick={onClose}>
                <ChevronLeftIcon sx={{color: "white"}} />
              </IconButton>
              <ListItemText primary="Add Place" />
            </ListItem>
            <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />
            <ListItem>
              <AddBoxIcon />
              <ListItemText primary="Add a new place" />
            </ListItem>
            <ListItem>
              <ThemeProvider theme={darkTheme}>
                <TextField id="pointNameField" label="New point's name" variant="filled" placeholder="Name" fullWidth
                           onChange={(event: any) => {
                             setPointName(event.target.value);
                             setErrorName(event.target.value.trim() === '');
                           }}
                           error={errorName}
                           helperText={errorName ? 'Empty name' : ''}
                />
              </ThemeProvider>
            </ListItem>
            <ListItem>
              <ThemeProvider theme={darkTheme}>
                <TextField id="pointDescriptionField" label="New point's description" variant="filled" placeholder="Description" fullWidth multiline
                           onChange={(event: any) => {
                             setPointDescription(event.target.value);
                           }}/>
              </ThemeProvider>
            </ListItem>
            <ListItem>

              <Autocomplete
                  options={options}
                  className="point-fill-field"
                  includeInputInList
                  onChange={(event: any, newValue: string | null) => {
                    if (newValue !== null) {
                      setPointCategoryValue(newValue);
                    }
                    setErrorCategory(newValue === null);
                  }}
                  inputValue={pointCategoryInputValue}
                  onInputChange={(event, newInputValue) => {
                    setPointCategoryInputValue(newInputValue);
                  }}
                  fullWidth
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => (

                      <TextField {...params} label="New point's category" variant="filled" fullWidth  error={errorCategory}
                                 helperText={errorCategory ? 'Empty category. Select one' : ''} />

                  )}

              />


            </ListItem>
            <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />
            <ListItem>
              <Button onClick={cancel} sx={{color: "white"}} >Cancel</Button>
            </ListItem>
            <ListItem>
              <Button onClick={save} sx={{color: "white"}}>Save Place</Button>
            </ListItem>
          </List>
        </Drawer>

        <Snackbar open={openAlert} onClose={handleCloseAlert} autoHideDuration={3000} >
          <Alert severity="success"
                 sx={{ width: '100%', backgroundColor: 'green', color: 'white'  }}
                 iconMapping={{ success: <CheckCircleOutlineIcon sx={{ color: 'white' }} />,}}>Place added correctly!
          </Alert>
        </Snackbar>

      </ThemeProvider>


  );
}

export default AddPoint;