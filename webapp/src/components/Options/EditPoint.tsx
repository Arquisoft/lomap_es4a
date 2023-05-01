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
  createTheme, Dialog, DialogActions, DialogContent,
  IconButton,
  Snackbar,
  ThemeProvider, Typography,
} from '@mui/material';
import TextField from "@mui/material/TextField";

// CSS
import "./Option.css";
import Point from "../../solidapi/Point";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {useEffect, useState} from "react";
import { options } from '../../shared/shareddtypes';

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

function EditPoint({open, onClose, point, editPoint}: any) {

  
  
  const [openAlert, setOpenAlert] = useState(false);
  const [pointName, setPointName] = useState(point.name);
  const [pointDescription, setPointDescription] = useState(point.description);
  const [, setPointCategoryValue] = useState(point.category);
  const [pointCategoryInputValue, setPointCategoryInputValue] = useState(point.category);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);
  useEffect(() => {
      const controller = new AbortController();
      setPointName(point.name);
      setPointDescription(point.description);
      Object.keys(options).forEach(o=>{if(options[o]===point.category){setPointCategoryInputValue(o); console.log(o);return () => {/*cancel the request before component unmounts*/controller.abort();};}
      })
      //setPointCategoryInputValue(point.category);
    
  },[point]);

  const cancel = () => {
    onClose();
  }

  const save = () => {
    if (errorName || errorCategory) {
      
    } else {
      onClose();
      let pointToEdit: Point = new Point(point.id, pointName, options[pointCategoryInputValue], point.latitude, point.longitude, pointDescription);
      editPoint(pointToEdit);
      setOpenAlert(true);
    }
  }

  
  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {if (reason === 'clickaway')return;setOpenAlert(false);};
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
      <ThemeProvider theme={theme}>
        <Drawer anchor="left" open={open} onClose={onClose} >
          <List sx={{ width:'20em' }} disablePadding>
            <ListItem>
              <IconButton   data-testid="editCloseButton" onClick={onClose}>
                <ChevronLeftIcon sx={{color: "white"}} />
              </IconButton>
              <ListItemText primary="Edit Place" />
            </ListItem>
            <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />
            <ListItem>
              <AddBoxIcon />
              <ListItemText primary="Edit a place" />
            </ListItem>
            <ListItem>
              <ThemeProvider theme={darkTheme}>
                <TextField data-testid="editName" id="pointNameField" label="New point's name" variant="filled" placeholder="Name" fullWidth defaultValue={point.name}
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
                <TextField data-testid="editDesc" id="pointDescriptionField" label="New point's description" variant="filled" placeholder="Description" fullWidth multiline defaultValue={point.description}
                           onChange={(event: any) => {
                             setPointDescription(event.target.value);
                           }}/>
              </ThemeProvider>
            </ListItem>
            <ListItem>
            
              <Autocomplete
                  data-testid="editCat"
                  options={Object.keys(options)}
                  className="point-fill-field"
                  includeInputInList
                  defaultValue={pointCategoryInputValue}
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
            <ListItem sx={{display: 'flex', alignItems: 'center'}}>
             
              <Button onClick={cancel} sx={{color: "white", backgroundColor:"#084f96" }} >Cancel</Button>
              <Button onClick={save} sx={{color: "white", backgroundColor:"#084f96",marginLeft:"1em"}}>Save Place</Button>
            
            </ListItem>
          </List>
        </Drawer>

        <Dialog data-testid="errorDialog" onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={openDialog}>
          <DialogContent dividers>
            <Typography gutterBottom>The Place must have a name and a category</Typography>
          </DialogContent>
          <DialogActions>
            <Button  data-testid="okbutton" autoFocus onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>


        <Snackbar open={openAlert} onClose={handleCloseAlert} autoHideDuration={3000} >
            <Alert 
            
            severity="success" 
            sx={{ width: '100%', backgroundColor: 'green', color: 'white'  }}  
            iconMapping={{ success: <CheckCircleOutlineIcon sx={{ color: 'white' }} />,}}>
             Place edited correctly!
            </Alert>
        </Snackbar>
        
      </ThemeProvider>

      
  );
}

export default EditPoint;
