import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import {
  Autocomplete, Button,
  createTheme,
  IconButton,
  ThemeProvider,
} from '@mui/material';
import TextField from "@mui/material/TextField";

// CSS
import "./Option.css";
import Point from "../../solidapi/Point";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {ChangeEvent, useState} from "react";

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

  const [pointName, setPointName] = useState(point.name);
  const [pointDescription, setPointDescription] = useState(point.description);
  const [pointCategory, setPointCategory] = useState(point.category);

  const handleNameChange = (event: ChangeEvent) => {
    setPointName(event.target.textContent? event.target.textContent : "");
  }

  const handleDescriptionChange = (event: ChangeEvent) => {
    setPointDescription(event.target.textContent? event.target.textContent : "");
  }

  const handleCategoryChange = (event: ChangeEvent) => {
    setPointCategory(event.target.textContent? event.target.textContent : "");
  }

  const defaultProps = {
    options: ["Bar", "Club", "Sight", "Monument", "Other"]
  };

  const cancel = () => {
    onClose();
  }

  const save = () => {
    onClose();

    let pointToEdit: Point = new Point(point.id, pointName, pointCategory, point.latitude, point.longitude, pointDescription);
    editPoint(point);
  }

  return (
      <ThemeProvider theme={theme}>
        <Drawer anchor="left" open={open} onClose={onClose} >
          <List sx={{ width:'20em' }} disablePadding>
            <ListItem>
              <IconButton onClick={onClose}>
                <ChevronLeftIcon sx={{color: "white"}} />
              </IconButton>
              <ListItemText primary="Edit Place" />
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
                      <TextField {...params} label="New point's category" variant="filled" fullWidth onChange={handleCategoryChange} />
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
      </ThemeProvider>
  );
}

export default EditPoint;
