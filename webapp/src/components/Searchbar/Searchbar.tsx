import { AiFillPushpin } from "react-icons/ai";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Divider, Typography } from "@mui/material";
import { checkIsMapURL, extractMapNameFromURL, extractUsersNameFromURL } from "../../solidapi/solidapi";

interface SearchBarProps {
  toggleNavbar: ()=>void;
  markers: {[id: string]: google.maps.Marker};
  nombreMapa:()=>string;
}

// Custom events


const SearchBar: React.FC<SearchBarProps> = ({ toggleNavbar ,markers,nombreMapa }) =>  {

  const goToRepository = (repository: string) => { window.open(repository) };

  return (
    <Box sx={{resize: 'both'}}>
      <Box>
      <AppBar position="relative" style={{ background: '#101F33', height: '7vh' }}>
        <Toolbar>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{display:'flex',pr:'1em'}}>
            <IconButton onClick={() => goToRepository("https://github.com/Arquisoft/lomap_es4a")} sx={{color:'white'}}> <Typography variant="h6">LoMap_es4a<AiFillPushpin /></Typography></IconButton>
          </Box>

          <Divider orientation='vertical' sx={{backgroundColor: "#808b96",height:'4.5vh',width:'0.05em'}} />

          <Box sx={{display:'flex',pl:'1.5em'}}>
            <Typography variant="h6">Current map:  </Typography>
            <Typography data-testid="mapname" variant="h6">
              {checkIsMapURL(nombreMapa()) 
                ? (<><PeopleIcon/>{extractUsersNameFromURL(nombreMapa())}<ArrowRightIcon/>{extractMapNameFromURL(nombreMapa())}</>)
                : nombreMapa()}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6">Menu  </Typography>
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