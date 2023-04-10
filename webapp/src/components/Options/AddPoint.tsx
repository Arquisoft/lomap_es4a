import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import {
  Autocomplete, Button,
  createTheme, Dialog, DialogActions,
  DialogContent,
  IconButton,
  ThemeProvider,
  Typography,
} from '@mui/material';
import TextField from "@mui/material/TextField";

// CSS
import "./Option.css";
import Point from "../../solidapi/Point";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {ChangeEvent, useEffect, useState} from "react";

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

  const [pointName, setPointName] = useState("");
  const [pointDescription, setPointDescription] = useState("");
  const [pointCategory, setPointCategory] = useState("");
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleNameChange = (event: any) => {
    setPointName(event.target.value);
  }

  const handleDescriptionChange = (event: any) => {
    setPointDescription(event.target.value);
  }

  const handleCategoryChange = (event: any) => {
    setPointCategory(event.target.value);
  }

  const defaultProps = {
    options: ["Bar", "Club", "Sight", "Monument", "Other"]
  };

  const cancel = () => {
    onClose();
  }

  const save = () => {
    if (pointName === "" || pointCategory === "") {
      setOpenDialog(true);
    } else {
      onClose();
      setPointName("");
      setPointDescription("");
      setPointCategory("");
      let point: Point = new Point(uuidv4(), pointName, pointCategory, clickedPoint.lat, clickedPoint.lng, pointDescription);
      createPoint(point);
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
                <TextField id="pointNameField" label="New point's name" variant="filled" placeholder="Name" fullWidth onChange={handleNameChange}/>
              </ThemeProvider>
            </ListItem>
            <ListItem>
              <ThemeProvider theme={darkTheme}>
                <TextField id="pointDescriptionField" label="New point's description" variant="filled" placeholder="Description" fullWidth multiline onChange={handleDescriptionChange}/>
              </ThemeProvider>
            </ListItem>
            <ListItem>
              <Autocomplete
                  {...defaultProps}
                  className="point-fill-field"
                  autoComplete
                  includeInputInList
                  fullWidth
                  renderInput={(params) => (
                      <TextField {...params} label="New point's category" variant="filled" fullWidth onSelect={handleCategoryChange} />
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

        <Dialog onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={openDialog}>
          <DialogContent dividers>
            <Typography gutterBottom>The Place must have a name and a category</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
);
}

export default AddPoint;
