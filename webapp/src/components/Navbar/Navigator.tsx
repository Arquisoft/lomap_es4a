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
import { createTheme, IconButton, makeStyles, ThemeProvider, Typography } from '@mui/material';
import Searchbar from '../Searchbar/Searchbar';
import PrimarySearchAppBar from '../Searchbar/Searchbar';
import { AccountCircle } from '@mui/icons-material';

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
      { id: 'Configuration', icon: <SettingsIcon /> },
      { id: 'About us', icon: <PhonelinkSetupIcon /> },
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


function Navigator(props: DrawerProps) {
   
  const { ...other } = props;
  
  

  return (
    <ThemeProvider theme={theme}>
    <Drawer {...other}  open={{...other}.open} 
      sx={{ display: { mt:500 } }}>
      
      <List disablePadding >
        <ListItemButton>
        <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' , color:'white'} }}
            >
              Usuario
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex', color:'white' } }}>
              
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                
                aria-haspopup="true"
                
                color="inherit"
                
              >
                <AccountCircle />
              </IconButton>
            </Box>
        </ListItemButton>       
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 3, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item}>
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
  );
}
/**
 * <ListItem sx={{ ...item, ...itemCategory, bgcolor: '#101F33' ,flexGrow: 1 }}onClick={ () => }>
          <ListItemIcon >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Close men</ListItemText>
        </ListItem>
 */
export default Navigator;
