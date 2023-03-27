import * as React from 'react';
import { AiFillPushpin } from "react-icons/ai";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Navigator from '../Navbar/Navigator';
import { click } from '@testing-library/user-event/dist/click';
import ReactDOM from 'react-dom/client';
import { AirSharp, Pin, PinchOutlined, PinSharp, Plumbing } from '@mui/icons-material';

// Custom events
import { publish } from "../../event";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    }
  },
}));




function PrimarySearchAppBar() {
  const toggleNavigator = () => {
    publish('toggleNavigator');
  }

    return (
      <Box >
        <Box >
        <AppBar position="static" style={{ background: '#101F33' }}>
          <Toolbar >
            <Box sx={{ flexGrow: 1 }} />
            <IconButton sx={{color:'white'}}>LoMap_es4a<AiFillPushpin /></IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search point..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
              
            
            <IconButton 
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ display:'flex', pl:2 }}
              onClick={ toggleNavigator }
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar></Box>
      </Box>

    );
}

export default PrimarySearchAppBar;