import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import {
  Autocomplete,
  Avatar,
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  TextareaAutosize,
  ThemeProvider,
  Typography
} from '@mui/material';
import Searchbar from '../Searchbar/Searchbar';
import PrimarySearchAppBar from '../Searchbar/Searchbar';
import { AccountCircle } from '@mui/icons-material';
import {CombinedDataProvider, Image, Table, Text, useSession} from "@inrupt/solid-ui-react";
import Welcome from "../Welcome";
import {VCARD} from "@inrupt/lit-generated-vocab-common";
import TextField from "@mui/material/TextField";
import SaveIcon from '@mui/icons-material/Save';

// CSS
import "./Option.css";
import defaultProps = Table.defaultProps;
import Point from "../../solidapi/Point";

const categories = [
  {
    id: 'Point',
    children: [
      { id: 'Name' },
      { id: 'Latitude' },
      { id: 'Longitude' },
      { id: 'Category' }
    ],
  },
  {
    id: 'Save Point',
    children: [
      { id: 'Save', icon: <SaveIcon />,active: true },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};
const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#305da1"

        }
      }
    }
  }
});

function AddPoint({open, closeAddPoints, clickedPoint, createPoint}: any) {

  let name = "";
  let description = "";
  let category = "";

  const defaultProps = {
    options: ["Bar", "Club", "Sight", "Monument", "Other"]
  };

  const cancel = () => {
    closeAddPoints();
  }

  const save = () => {
    closeAddPoints();
    //TODO: Implementar funcionalidad
    let point: Point = new Point("", name, category, clickedPoint.lat, clickedPoint.lng, description);
    createPoint(point);
  }

  return (
      <ThemeProvider theme={theme}>
        <Drawer disableAutoFocus={true}
                open={open}
                sx={{ display: { mt: 500 } }}
                onClose={cancel}>
          <List disablePadding>
            <ListItemText sx={{
              display: { xs: 'none', sm: 'block', color: 'white', margin: '2vw' }
            }}>
              Add a New Place
            </ListItemText>
            <ListItem>
              <TextField size={"medium"} variant="standard" className="point-fill-field" label="Name" placeholder="NewPoint" color='primary'
                         sx={{
                           width: '10.8vw',
                           "& .MuiInputBase-root": {
                             height: '4.8vh'
                           }
                         }}
              onChange={(e) => {
                if (e.target.value !== null) {
                  name = e.target.value;
                }
              }
              }/>
            </ListItem>
            <ListItem>
              <TextareaAutosize className="point-fill-field" placeholder="Description" color='primary' onChange={(e) => {
                if (e.target.value !== null) {
                  description = e.target.value;
                }
              }} onResize={()=>{}}
                                onResizeCapture={()=>{}}/>
            </ListItem>
            <ListItem>
              <Autocomplete
                  {...defaultProps}
                  className="point-fill-field"
                  autoComplete
                  includeInputInList
                  renderInput={(params) => (
                      <TextField {...params} label="Category" variant="standard" onChange={(e) => {
                        if (e.target.value !== null) {
                          category = e.target.value;
                        }
                      }
                      }/>
                  )}
                  sx={{
                    width: '10.8vw',
                    "& .MuiInputBase-root": {
                      height: '4.8vh'
                    }
                  }}
              />
            </ListItem>
            <ListItemButton onClick={cancel}>Cancel</ListItemButton>
            <ListItemButton onClick={save}>Save Place</ListItemButton>
          </List>
        </Drawer>
      </ThemeProvider>
);
}

export default AddPoint;
