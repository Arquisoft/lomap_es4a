import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import './App.css';
import Map from "./components/Map/Map";
import Navigator from "./components/Navbar/Navigator";
import PrimarySearchAppBar from './components/Searchbar/Searchbar';
import { Grid } from '@mui/material';



function App(): JSX.Element {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [users,setUsers] = useState<User[]>([]);
  const refreshUserList = async () => {
    setUsers(await getUsers());
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(()=>{
    refreshUserList();
  },[]);
  
  return (
    <>
      <Grid 
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(9, 1fr)',
        gridTemplateRows: 'auto',
        gridTemplateAreas: `"nav search search search search search search search search"
      "nav mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer "
      "nav mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer "
      "nav mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer "
      "nav mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer mainContainer "`,
      
      }}>

        <Box sx={{ gridArea: 'search'}}><PrimarySearchAppBar /></Box>
        <Box sx={{ gridArea: 'nav',backgroundColor: '#101F33'}}><Navigator /></Box>
        <Box sx={{ gridArea: 'mainContainer'}}><Map/></Box>
       
        
        
        
      </Grid>
    </>
    /**
   * <Welcome message="ASW students"/>
          <Box component="div" sx={{ py: 2}}>This is a basic example of a React application using Typescript. You can add your email to the list filling the form below.</Box>
          <EmailForm OnUserListChange={refreshUserList}/>        
          <UserList users={users}/>
          <Link href="https://github.com/arquisoft/lomap_0">Source code</Link>
   */
  );
}

export default App;
