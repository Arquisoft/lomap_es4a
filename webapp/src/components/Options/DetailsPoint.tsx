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

function DetailsPoint({open, onClose, point}: any) {

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
  }, point);

  const exit = () => {
    onClose();
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
              <ListItemText primary="Place's Details" />
            </ListItem>
            <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />
            <ListItem>
              <AddBoxIcon />
              <ListItemText primary="Place's Details" />
            </ListItem>
            <ListItem>
              <ThemeProvider theme={darkTheme}>
                <TextField InputProps={{readOnly: true, }} id="pointNameField" label="Point's name" variant="filled" placeholder="Name" fullWidth defaultValue={point.name} contentEditable={false}/>
              </ThemeProvider>
            </ListItem>
            <ListItem>
              <ThemeProvider theme={darkTheme}>
                <TextField InputProps={{readOnly: true, }} id="pointDescriptionField" label="Point's description" variant="filled" placeholder="Description" fullWidth multiline defaultValue={point.description} contentEditable={false}/>
              </ThemeProvider>
            </ListItem>
            <ListItem>
              <ThemeProvider theme={darkTheme}>
                <TextField InputProps={{readOnly: true, }} id="pointCategoryField" label="Point's category" variant="filled" placeholder="Category" fullWidth multiline defaultValue={point.category} contentEditable={false}/>
              </ThemeProvider>
            </ListItem>
            <Divider sx={{backgroundColor: "#808b96", height: "0.1em"}} />
            <ListItem>
              <Button onClick={exit} sx={{color: "white"}} >Back</Button>
            </ListItem>
            {/* Imágenes */}
            {/* Valoraciones */}
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

export default DetailsPoint;
