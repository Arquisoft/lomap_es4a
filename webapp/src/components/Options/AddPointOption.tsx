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
import { Avatar, Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, ThemeProvider, Typography } from '@mui/material';
import Searchbar from '../Searchbar/Searchbar';
import PrimarySearchAppBar from '../Searchbar/Searchbar';
import { AccountCircle } from '@mui/icons-material';
import {CombinedDataProvider, Image, Text, useSession} from "@inrupt/solid-ui-react";
import Welcome from "../Welcome";
import {VCARD} from "@inrupt/lit-generated-vocab-common";
import TextField from "@mui/material/TextField";
import SaveIcon from '@mui/icons-material/Save';


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


function AddPointOption(props: any) {

  const { session } = useSession();
  const { callback } = props.callback;
  const { ...other } = props;

  return (
      <ThemeProvider theme={theme}>
        <Drawer {...other} open={{ ...other }.open}
                sx={{ display: { mt: 500 } }}>
          <List disablePadding>
            {categories.map(({ id, children }) => (
                <Box key={id} sx={{ bgcolor: '#305da1' }}>
                  <ListItem sx={{ py: 3, px: 3 }}>
                    <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                  </ListItem>
                  {children.map(({ id: childId }) => (
                      <ListItem disablePadding key={childId}>
                        <ListItemButton sx={item}>
                          <ListItemText>{childId}</ListItemText>
                        </ListItemButton>
                      </ListItem>
                  ))}
                  <Divider sx={{ mt: 2 }} />
                </Box>
            ))}
          </List>
        </Drawer>
      </ThemeProvider>
);
}

export default AddPointOption;
