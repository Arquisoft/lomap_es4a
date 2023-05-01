import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import MapIcon from '@mui/icons-material/Map';
import { Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, ThemeProvider, Typography } from '@mui/material';

// Pfp
import { VCARD } from "@inrupt/lit-generated-vocab-common";
import {CombinedDataProvider, useSession, Image, Text} from "@inrupt/solid-ui-react";
import LogoutIcon from '@mui/icons-material/Logout';
import {FOAF} from "@inrupt/vocab-common-rdf";
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
      { id: 'MapList', icon: <MapIcon /> },
      
    ],
  },
  {
    id: 'Personal Zone',
    children: [
      
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
function Navbar({open, toggleNavbar, openPointsList, openMapList, openMyFriendsList}: any) {
  
  const [openDialog, setOpenDialog] = React.useState(false);

  const { session } = useSession();
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleClickPointsOpen= async() => {
    openPointsList();
  };

  const handleClickMyFriends= async() => {
    openMyFriendsList();
  };

  const handleClickLogout = async() => {
    try {await session.logout();} catch (error) {console.log(`Error logging out: ${error}`);}
  };

  return (
    <><ThemeProvider theme={theme}>
      <Drawer data-testid="navbar-drawer" disableAutoFocus={true}
          open={open}
          sx={{ display: { mt: 500, height: '100vh' } }}
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
                    {FOAF.name !== null && FOAF.name !== undefined ?
                        (<Text property={ FOAF.name }/>):
                        (<Typography>User</Typography>)
                    }

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
                  <ListItemButton data-testid={childId} selected={active} sx={item} onClick={() => {
                    if (childId === "About us") {handleClickOpen()}
                    else if(childId==="Logout"){handleClickLogout()}
                    else if(childId==="Points"){handleClickPointsOpen()}
                    else if(childId==="MyFriends"){handleClickMyFriends()}
                    else if(childId==="MapList"){openMapList()}
                  } }>
                    <ListItemIcon sx={{color: "white"}}>{icon}</ListItemIcon>
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
    <Dialog data-testid="dialog" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog}>
        <DialogTitle>
          LoMap_es4a
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Este es un proyecto de la asignatura ASW (2022-2023).Realizado por los alumnos:
          </Typography>
          <Typography gutterBottom>- Gonzalo Rodríguez</Typography>
          <Typography gutterBottom>- Carlos Cesáreo</Typography>
          <Typography gutterBottom>- Diego García</Typography>
          <Typography gutterBottom>- Manuel Palacios</Typography>
        </DialogContent>
        <DialogActions>
          <Button data-testid="closedialog" autoFocus onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      

      
      </>
    
  );
}
//<PointsView open={true}></PointsView> 
export default Navbar;
