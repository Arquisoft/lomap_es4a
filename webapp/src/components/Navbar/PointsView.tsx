import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Button, Checkbox, Collapse, createTheme, Divider, IconButton, ListItemButton, Switch, ThemeProvider, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Point from "../../solidapi/Point";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface PointsViewProps {
    open: boolean;
    onClose: () => void;
    markerList: {[id: string]: google.maps.Marker};
    openEditPoint: (id: string)=>void;
    deletePoint:(id:string)=>void;
    getPointsCategory: (cat:string[]) => Promise<Point[]>;
}

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


const PointsView: React.FC<PointsViewProps> = ({ open, onClose,markerList,getPointsCategory,openEditPoint,deletePoint }) => {
    //FILTROS

    const [selectedFilters, setSelectedFilters] = React.useState([
        { id: 'academicInstitution', isActive: true },
        { id: 'bar', isActive: true },
        { id: 'hospital', isActive: true },
        { id: 'entertainment', isActive: true },
        { id: 'hotel', isActive: true },
        { id: 'landscape', isActive: true },
        { id: 'museum', isActive: true },
        { id: 'other', isActive: true },
        { id: 'park', isActive: true },
        { id: 'policeStation', isActive: true },
        { id: 'publicInstitution', isActive: true },
        { id: 'restaurant', isActive: true },
        { id: 'shop', isActive: true },
        { id: 'sportsClub', isActive: true },
        { id: 'supermarket', isActive: true },
        { id: 'transportCentre', isActive: true },
        { id: 'cinema', isActive: true }
      
      ]);
      const listaFiltros:string[]=[];

      const [allOptions, setAllOptions] = React.useState([
        { id: 'markAll', isActive: false },
        { id: 'unmarkAll', isActive: false }
      ])
      
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const filterId = event.target.name;
      setSelectedFilters(filters => filters.map(filter => {
        if (filter.id === filterId) {
          return { ...filter, isActive: event.target.checked };
        }
        return filter;
      }));
    };


      const activar=async (cat:string[])=>{
        const listaPuntosCategoria=await getPointsCategory(cat);

        Object.keys(markerList).forEach((id) => {
            if(listaPuntosCategoria.map(p=>p.id).includes(id))markerList[id].setVisible(true)
            else markerList[id].setVisible(false)
        });
        /*
        listaPuntosCategoria.forEach( p => {
            markerList[p.id].setVisible(true)
        });

       */
        
       
      }
      /*
      const desactivar=async (cat:string)=>{
        
        const listaPuntosCategoria=await getPointsCategory(cat);

        listaPuntosCategoria.forEach( p => {
            markerList[p.id].setVisible(false)
        });
        
      }
      */
      const handleFilterClick = () => {
        selectedFilters.forEach(filter=>{
            if(filter.isActive)listaFiltros.push(filter.id)

            /*
          if(filter.isActive)activar(filter.id)
          else desactivar(filter.id)
            */
        });

        activar(listaFiltros);
      }

      const handleMarkAll = () => {
        setAllOptions(allOptions.map(option => option.id === 'markAll' ? { ...option, isActive: true } : option));

        const updatedFilters = selectedFilters.map(filter => {
          return { ...filter, isActive: true };
        });
        setSelectedFilters(updatedFilters);
      }

      const handleUnmarkAll = () => {
        setAllOptions(allOptions.map(option => option.id === 'unmarkAll' ? { ...option, isActive: true } : option));

        const updatedFilters = selectedFilters.map(filter => {
          return { ...filter, isActive: false };
        });
        setSelectedFilters(updatedFilters);
      }
      



    //

    const [encendida, setEncendida] = React.useState<{[id: string]: boolean}>({});
    const [checked, setChecked] = React.useState<{[id: string]: boolean}>({});
    const [encendidaAll, setEncendidaAll] = React.useState(true);


    const [filtersOpen, setFiltersOpen] = React.useState(false);
    const [filtersCategoriesOpen, setFiltersCategoriesOpen] = React.useState(false);
    const [visibilityOpen, setVisibilityOpen] = React.useState(false);

    const handleFiltersSubmenu = () => {
      setFiltersOpen(!filtersOpen);
    };
    const handleFiltersCategoriesSubmenu = () => {
        setFiltersCategoriesOpen(!filtersCategoriesOpen);
      };

    const handleVisibilitySubmenu = () => {
        setVisibilityOpen(!visibilityOpen);
      };
  
   

    React.useEffect(() => {
        setEncendida((prevState) => {
            const newEncendida = { ...prevState };
            Object.keys(markerList).forEach((id) => {
                if (!newEncendida.hasOwnProperty(id)) {
                    newEncendida[id] = true;
                }
            });
            return newEncendida;
        });
    }, [markerList]);

    const handleToggle = (id: string) => {
        let newEncendida = {...encendida};
        newEncendida[id] = !encendida[id];
        setEncendida(newEncendida);

        markerList[id].setVisible(!markerList[id].getVisible());

        let newChecked = {...checked};
        newChecked[id] = !checked[id];
        setChecked(newChecked);
    };
    const handleToggleAll = () => {
        setEncendidaAll(!encendidaAll);
        let newEncendida = {...encendida};
        let newChecked = {...checked};
        Object.keys(markerList).forEach((id) => {
            if (markerList[id].getVisible() === encendidaAll) {
                newEncendida[id] = !newEncendida[id];
                newChecked[id] = !newChecked[id];
                markerList[id].setVisible(!markerList[id].getVisible());
            }
        });
        setEncendida(newEncendida);
        setChecked(newChecked);
    };
    const handleDeleteButton=(id: string)=>{
        deletePoint(id)
    }

    const handleEditButton=(id: string)=>{
        openEditPoint(id);
    }

    const generateFiltersCategories = () => {
        return (
            <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox data-testid="academiccheckbox"
                            checked={selectedFilters.find(filter => filter.id === 'academicInstitution')?.isActive}
                            onChange={handleFilterChange}
                            name="academicInstitution"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Academic Inst.</Typography>
                        </Box>


                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'bar')?.isActive}
                            onChange={handleFilterChange}
                            name="bar"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Bar</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'cinema')?.isActive}
                            onChange={handleFilterChange}
                            name="cinema"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Cinema</Typography>
                        </Box>      
                       

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'entertainment')?.isActive}
                            onChange={handleFilterChange}
                            name="entertainment"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Entertainment</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'hospital')?.isActive}
                            onChange={handleFilterChange}
                            name="hospital"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Hospital</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'hotel')?.isActive}
                            onChange={handleFilterChange}
                            name="hotel"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Hotel</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'landscape')?.isActive}
                            onChange={handleFilterChange}
                            name="landscape"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Landscape</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'museum')?.isActive}
                            onChange={handleFilterChange}
                            name="museum"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Museum</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'other')?.isActive}
                            onChange={handleFilterChange}
                            name="other"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Other</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'park')?.isActive}
                            onChange={handleFilterChange}
                            name="park"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Park</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'policeStation')?.isActive}
                            onChange={handleFilterChange}
                            name="policeStation"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Police Station</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'publicInstitution')?.isActive}
                            onChange={handleFilterChange}
                            name="publicInstitution"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Public Inst.</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'restaurant')?.isActive}
                            onChange={handleFilterChange}
                            name="restaurant"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Restaurant</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'shop')?.isActive}
                            onChange={handleFilterChange}
                            name="shop"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Shop</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'sportsClub')?.isActive}
                            onChange={handleFilterChange}
                            name="sportsClub"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Sports Club</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'supermarket')?.isActive}
                            onChange={handleFilterChange}
                            name="supermarket"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Supermarket</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <Checkbox
                            checked={selectedFilters.find(filter => filter.id === 'transportCentre')?.isActive}
                            onChange={handleFilterChange}
                            name="transportCentre"
                            sx={{color:'white'}}
                          />
                          <Typography variant="body2">Trasnsport Centre</Typography>
                        </Box>

                        
                        
                        

                        
                        
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center', justifyContent: 'flex-end', mt:'1em' }}>
                        <Button data-testid="markall" variant="contained" onClick={handleMarkAll} name="markAll" sx={{ color: 'white', backgroundColor: 'transparent', border: '1px solid white', fontSize: '0.9rem', mx: 'auto' }}>
                            Mark All
                        </Button>

                        <Button data-testid="filterButton" variant="contained" onClick={handleFilterClick} sx={{ mx: 'auto', width: '80%', paddingTop: '1', backgroundColor: '#375d81' }}>
                            Filter
                        </Button>


                        <Button data-testid="unmarkall" variant="contained" onClick={handleUnmarkAll} name="unmarkAll" sx={{ color: 'white', backgroundColor: 'transparent', border: '1px solid white', fontSize: '0.9rem', mx: 'auto' }} >
                            Unmark All
                        </Button>
                </Box>

            </Box>
            </>

        );

    };


    const generatePointsControl = () => {
        return Object.keys(markerList).map((id) => (
            
            <ListItem key={id} sx={{display:'grid', gridTemplateColumns: 'repeat(5, 1fr)',gridTemplateAreas: `"nombre nombre  visibilidad editar borrar"`,gridTemplateRows: 'auto',}}>
                
                <ListItemText primary={markerList[id].getTitle() +": "} sx={{ gridArea: 'nombre'}}/>
                
                <Switch color="success" className='s1' onChange={() => handleToggle(id)} checked={!checked[id]} sx={{ gridArea: 'visibilidad'}}/>
                <ListItemButton onClick={() =>{handleEditButton(id)} } sx={{ gridArea: 'editar'}}>
                    <EditIcon/>
                </ListItemButton>
                <ListItemButton onClick={() =>{handleDeleteButton(id)} }   sx={{ gridArea: 'borrar'}}>
                    <DeleteForeverIcon/>
                </ListItemButton>
                
            </ListItem>
            
            
        ));
    };

    return (

        <ThemeProvider theme={theme}>
            <Drawer anchor="left" open={open} onClose={onClose} sx={{ display: { mt: 500 }  }} >
                <List sx={{ width:'45vh' }} disablePadding>
                    <ListItem>
                        <IconButton data-testid="closePointsView" onClick={onClose} >
                            <ChevronLeftIcon sx={{color: "#808b96"}}/>
                        </IconButton>
                        <ListItemText data-testid={"pointsViewTitle"} primary="Points List" />
                    </ListItem>
                    <Divider sx={{backgroundColor: "#808b96"}} />
                    <ListItemButton data-testid={"filters"} onClick={handleFiltersSubmenu}>
                        <ListItemText primary="Filters" />
                        <IconButton  >
                            <ExpandMoreIcon sx={{color: "#808b96"}}/>
                        </IconButton>
                    </ListItemButton>
                    
                    <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
                    <Divider sx={{backgroundColor: "black"}} />
                        <List component="div" disablePadding>
                            
                            <ListItemButton data-testid={"filtersCategories"} onClick={handleFiltersCategoriesSubmenu} >
                                <ListItemText primary="Categories" />
                                    <IconButton >
                                        <ExpandMoreIcon sx={{color: "#808b96"}}/>
                                    </IconButton>
                                </ListItemButton>
                                <Collapse in={filtersCategoriesOpen} timeout="auto" unmountOnExit>
                                <Divider sx={{backgroundColor: "black"}} />
                                    {generateFiltersCategories()}
                                   
                                </Collapse>
                        </List>
                    </Collapse>

                    <Divider sx={{backgroundColor: "#808b96"}} />
                    <ListItemButton data-testid="visibility" onClick={handleVisibilitySubmenu}>
                        <ListItemText primary="Points edition" />
                        <IconButton>
                            <ExpandMoreIcon sx={{color: "#808b96"}}/>
                        </IconButton>
                    </ListItemButton>
                    
                    <Collapse in={visibilityOpen} timeout="auto" unmountOnExit>
                    <Divider sx={{backgroundColor: "black"}} />
                    <ListItem>
                        <ListItemText primary={"Show / Hide all"} />
                        <Switch data-testid="visibilityall" color="success" className='s1' checked={encendidaAll} onChange={() => handleToggleAll()} />
                    </ListItem>
                   
                        {generatePointsControl()}
                    
                    </Collapse>

                    
                            </List>
                        </Drawer>
                    </ThemeProvider>
    );
};

export default PointsView;