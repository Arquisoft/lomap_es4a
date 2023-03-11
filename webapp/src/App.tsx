import { useState } from 'react';
import Welcome from './components/Welcome';
import './App.css';
import Map from "./components/Map/Map";
import {QueryClient, QueryClientProvider} from "react-query";
import LoginPage from './components/login/LoginPage';
import {SessionProvider, useSession} from "@inrupt/solid-ui-react";
import MainPage from "./components/MainPage";

function App(): JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //With this we can control the login status for solid
  const { session } = useSession();

  const queryClient = new QueryClient();

  session.onLogin(() => setIsLoggedIn(true));
  session.onLogout(() => setIsLoggedIn(false));

  return(
      <SessionProvider>
        {(!isLoggedIn) ? <LoginPage /> : <QueryClientProvider client={queryClient}> <MainPage/> </QueryClientProvider>}
      </SessionProvider>
  )
}

export default App;
