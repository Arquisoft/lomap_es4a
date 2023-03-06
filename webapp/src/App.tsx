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
import Map from "./components/Map";
import {loadMapApi} from "./components/utils/GoogleMapsUtils";

function App(): JSX.Element {

  const [users,setUsers] = useState<User[]>([]);

  // ------------ Para la creación del Mapa
  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(() => {
    // Nos aseguramos de que cargue el Script
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", function () {
      // Ha cargado
      setScriptLoaded(true);
    })
  },[]);
  // ----------------------------------------
  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <>
      <Container maxWidth="sm">
        <Welcome message="ASW students"/>
        <Box component="div" sx={{ py: 2}}>This is a basic example of a React application using Typescript. You can add your email to the list filling the form below.</Box>
        <EmailForm OnUserListChange={refreshUserList}/>        
        <UserList users={users}/>
        <Link href="https://github.com/arquisoft/lomap_0">Source code</Link>
        {scriptLoaded && (
            <Map
                mapType={google.maps.MapTypeId.ROADMAP}
                mapTypeControl={true}
            />
        )}
      </Container>
    </>
  );
}

export default App;
