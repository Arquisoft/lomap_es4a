import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';

import PublicIcon from '@mui/icons-material/Public';


import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { Avatar, Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, ThemeProvider, Typography } from '@mui/material';
import Searchbar from '../Searchbar/Searchbar';
import PrimarySearchAppBar from '../Searchbar/Searchbar';
import { AccountCircle } from '@mui/icons-material';
// Pfp
import { VCARD } from "@inrupt/lit-generated-vocab-common";
import {CombinedDataProvider, useSession, Image, Text} from "@inrupt/solid-ui-react";
import {useEffect, useState} from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import {subscribe, unsubscribe} from "../../event";
import PointsView from './PointsView';
const categories = [
  {
    id: 'LoMap',
    children: [
      {
        id: 'MyFriends',
        icon: <PeopleIcon />,
        active: true,
      },
      { id: 'Points', icon: <DnsRoundedIcon /> },
      { id: 'MapsList', icon: <PublicIcon /> },
      
    ],
  },
  {
    id: 'Personal Zone',
    children: [
      { id: 'Configuration', icon: <SettingsIcon />,active: true },
      { id: 'About us', icon: <PhonelinkSetupIcon /> },
      { id: 'Logout', icon: <LogoutIcon /> },
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
          backgroundColor: "#101F33"
          
        }
      }
    }
  }
});
function Navbar({open, toggleNavbar, openPointsList}: any) {
  
  const [openDialog, setOpenDialog] = React.useState(false);
  //const [openPoints, setOpenPoints] = React.useState(false);

  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");
  const { session } = useSession();
  const { webId } = session.info;
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleClickPointsOpen= async() => {
    openPointsList();
  };
  
  const handleClickLogout = async() => {
    try {
      await session.logout();
    } catch (error) {
      console.log(`Error logging out: ${error}`);
    }
  };

  return (
    <><ThemeProvider theme={theme}>
      <Drawer disableAutoFocus={true}
          open={open}
          sx={{ display: { mt: 500 } }}
          onClose={toggleNavbar}
          >

        <List disablePadding>
          <ListItemButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block', color: 'white' } }}
            >
              {session.info.webId ? (
                  <CombinedDataProvider
                      datasetUrl={session.info.webId}
                      thingUrl={session.info.webId}>
                    <Text property={VCARD.fn.value }/>
                  </CombinedDataProvider>
              ): null }
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex', color: 'white', padding:"1em"} }}>

              {session.info.webId ? (
                  <CombinedDataProvider
                      datasetUrl={session.info.webId}
                      thingUrl={session.info.webId}>
                        <Image property={VCARD.hasPhoto.iri.value} alt="User profile picture" style={{width:60, height:60, borderRadius:30}}/>
                  </CombinedDataProvider>
              ): null }

            </Box>
          </ListItemButton>
          {categories.map(({ id, children }) => (
            <Box key={id} sx={{ bgcolor: '#101F33' }}>
              <ListItem sx={{ py: 3, px: 3 }}>
                <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, active }) => (
                <ListItem disablePadding key={childId}>
                  <ListItemButton selected={active} sx={item} onClick={() => {
                    if (childId === "About us") {handleClickOpen()}
                    else if(childId==="Logout"){handleClickLogout()}
                    else if(childId==="Points"){handleClickPointsOpen()}
                  } }>
                    <ListItemIcon>{icon}</ListItemIcon>
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
    {/*
      Dialogo al darle a about Us
    */}
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog}>
        <DialogTitle>
          LoMap_es4a
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Este es un proyecto de la asignatura ASW (2022-2023).Realizado por los alumnos:
          </Typography>
          <Typography gutterBottom>- Gonzalo Rodríguez</Typography>
          <Typography gutterBottom>- Carlos Cesareo</Typography>
          <Typography gutterBottom>- Diego García</Typography>
          <Typography gutterBottom>- Manuel Palacios</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      

      
      </>
    
  );
}
//<PointsView open={true}></PointsView> 
export default Navbar;
function viewPoints(arg0: string) {
  throw new Error('Function not implemented.');
}

