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
  comprobarCat: (id:string,cat:string) => Promise<boolean>;
  markers: {[id: string]: google.maps.Marker};
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




const SearchBar: React.FC<SearchBarProps> = ({ toggleNavbar, comprobarCat,markers }) =>  {
  
  const [selectedFilters, setSelectedFilters] = useState([
    { id: 'Bar', isActive: true },
    { id: 'Club', isActive: true },
    { id: 'Slight', isActive: true },
    { id: 'Monument', isActive: true },
    { id: 'Other', isActive: true }
  ]);
  
  
const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const filterId = event.target.name;
  setSelectedFilters(filters => filters.map(filter => {
    if (filter.id === filterId) {
      return { ...filter, isActive: event.target.checked };
    }
    return filter;
  }));
};
  const activar=(cat:string)=>{
    Object.keys(markers).map(async (id) =>{

      
        if(await comprobarCat(id, cat)){
          markers[id].setVisible(true)
        }
      });
    
   
  }

  const desactivar=(cat:string)=>{
    
    
    Object.keys(markers).map(async (id) =>{      
        if(await comprobarCat(id, cat))markers[id].setVisible(false)
      });
    
  }
  const handleFilterClick = () => {

    selectedFilters.map(filter=>{
      if(filter.isActive)activar(filter.id)
      else desactivar(filter.id)

    });
    /*
    // Aquí puedes implementar la lógica para aplicar los filtros
    //console.log(selectedFilters);
    if(selectedFilters.filter1){//bars
      //console.log('Bar')
      activar('Bar');
    }else desactivar('Bar');
    
    if(selectedFilters.filter2){//clubs
      activar('Club');
    }else desactivar('Club');
    
    if(selectedFilters.filter3){//slights
      activar('Slight');
    }else desactivar('Slight');
    if(selectedFilters.filter4){//monuments
      activar('Monument');
    }else desactivar('Monument');
    if(selectedFilters.filter5){//otro
      activar('Other');
    }else desactivar('Other');
    */
    


    
  };


    return (
      <Box >
        <Box >
        <AppBar position="static" style={{ background: '#101F33', height: '9vh' }}>
          <Toolbar >

            <Box sx={{ flexGrow: 1 }} />
            <IconButton sx={{color:'white'}}>LoMap_es4a<AiFillPushpin /></IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'Bar')?.isActive}
                            onChange={handleFilterChange}
                            name="Bar"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Bars</Typography>
                        </Box>


                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'Club')?.isActive}
                            onChange={handleFilterChange}
                            name="Club"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Clubs</Typography>
                        </Box>


                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'Slight')?.isActive}
                            onChange={handleFilterChange}
                            name="Slight"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Slights</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'Monument')?.isActive}
                            onChange={handleFilterChange}
                            name="Monument"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Monuments</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'Other')?.isActive}
                            onChange={handleFilterChange}
                            name="Other"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Others</Typography>
                        </Box>

                        
                        <Button
                          variant="contained"
                          onClick={handleFilterClick}
                          sx={{ ml: 2 }}
                        >
                          Filter
                        </Button>

              </Box>

            
            <Box sx={{ flexGrow: 1 }} />

            
           
           
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