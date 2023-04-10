import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import {
  Autocomplete, Button,
  createTheme, Dialog, DialogActions, DialogContent,
  IconButton,
  ThemeProvider, Typography,
} from '@mui/material';
import TextField from "@mui/material/TextField";

// CSS
import "./Option.css";
import Point from "../../solidapi/Point";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {ChangeEvent, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";

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

  const options = ["Bar", "Club", "Sight", "Monument", "Other"];

  const [currentPoint, setCurrentPoint] = useState(point);
  const [pointName, setPointName] = useState(point.name);
  const [pointDescription, setPointDescription] = useState(point.description);
  const [pointCategoryValue, setPointCategoryValue] = useState(point.category);
  const [pointCategoryInputValue, setPointCategoryInputValue] = useState(point.category);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (point.id != currentPoint.id) {
      setCurrentPoint(point);
      setPointName(point.name);
      setPointDescription(point.description);
      setPointCategoryInputValue(point.category);
    }
  });

  const cancel = () => {
    onClose();
  }

  const save = () => {
    if (pointName === "" || pointCategoryInputValue === "") {
      setOpenDialog(true);
    } else {
      onClose();
      let pointToEdit: Point = new Point(point.id, pointName, pointCategoryInputValue, point.latitude, point.longitude, pointDescription);
      editPoint(pointToEdit);
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
              <ListItemText primary="Edit Place" />
            </ListItem>
            <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />
            <ListItem>
              <AddBoxIcon />
              <ListItemText primary="Edit a place" />
            </ListItem>
            <ListItem>
              <ThemeProvider theme={darkTheme}>
                <TextField id="pointNameField" label="New point's name" variant="filled" placeholder="Name" fullWidth defaultValue={point.name}
                           onChange={(event: any) => {
                             setPointName(event.target.value);
                           }}/>
              </ThemeProvider>
            </ListItem>
            <ListItem>
              <ThemeProvider theme={darkTheme}>
                <TextField id="pointDescriptionField" label="New point's description" variant="filled" placeholder="Description" fullWidth multiline defaultValue={point.description}
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
                  defaultValue={point.category}
                  onChange={(event: any, newValue: string | null) => {
                    if (newValue !== null) {
                      setPointCategoryValue(newValue);
                    }
                  }}
                  inputValue={pointCategoryInputValue}
                  onInputChange={(event, newInputValue) => {
                    setPointCategoryInputValue(newInputValue);
                  }}
                  fullWidth
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => (
                      <TextField {...params} label="New point's category" variant="filled" fullWidth />
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

export default EditPoint;
