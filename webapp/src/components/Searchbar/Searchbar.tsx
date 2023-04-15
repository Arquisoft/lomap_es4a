import { AiFillPushpin } from "react-icons/ai";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useState } from "react";
import { Typography } from "@mui/material";

interface SearchBarProps {
  toggleNavbar: ()=>void;
  markers: {[id: string]: google.maps.Marker};
  nombreMapa:()=>string;
}

// Custom events

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




const SearchBar: React.FC<SearchBarProps> = ({ toggleNavbar ,markers,nombreMapa }) =>  {

    return (
      <Box >
        <Box >
        <AppBar position="static" style={{ background: '#101F33', height: '9vh' }}>
          <Toolbar >

            <Box sx={{ flexGrow: 1 }} />
            <IconButton sx={{color:'white'}}>LoMap_es4a<AiFillPushpin /></IconButton>
                        
            <Box sx={{ flexGrow: 1 }} />

            
           
            <Typography variant="body2">Mapa actual:  </Typography>
            
            <Typography variant="body2">{nombreMapa()}</Typography>
            <IconButton 
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ display:'flex', pl:2 }}
              onClick={ toggleNavbar }
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar></Box>
      </Box>

    );
}
/*
<Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search point..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

*/
export default SearchBar;