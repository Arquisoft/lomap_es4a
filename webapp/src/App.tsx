import { useState } from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";
import LoginPage from './components/login/LoginPage';
import {SessionProvider, useSession} from "@inrupt/solid-ui-react";
// import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';
import MainPage from "./components/MainPage";

function App(): JSX.Element {

	const [isLoggedIn, setIsLoggedIn] = useState(false);


	//With this we can control the login status for solid
 	const { session } = useSession();

	const queryClient = new QueryClient();

	session.onLogin(() => setIsLoggedIn(true));
	session.onLogout(() => setIsLoggedIn(false));
	
	// TODO: handleIncomingRedirect({restorePreviousSession: true});

	return(
		<SessionProvider>
			{(!isLoggedIn) 
		  		? <LoginPage /> 
				: <QueryClientProvider client={queryClient}> <MainPage session={session}/> </QueryClientProvider>}
		</SessionProvider>
	);	
}

export default App;
