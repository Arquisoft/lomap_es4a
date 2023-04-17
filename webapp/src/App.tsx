import {useEffect, useState} from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";
import LoginPage from './components/login/LoginPage';
import {SessionProvider, useSession} from "@inrupt/solid-ui-react";
// import { handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';
import MainPage from "./components/MainPage";
import {SelectChangeEvent} from "@mui/material";
import {isLoggedIn, login} from "./api/api";

function App(): JSX.Element {

	// const [isLoggedIn, setIsLoggedIn] = useState(false);

	const logIn = (podProvider: string) => {
		login(podProvider);
	}

	// //With this we can control the login status for solid
 	// const { session } = useSession();

	// const queryClient = new QueryClient();

	// session.onLogin(() => setIsLoggedIn(true));
	// session.onLogout(() => setIsLoggedIn(false));

	return(
		<SessionProvider>
			{(!isLoggedIn())
		  		? <LoginPage logIn={logIn} />
				: <MainPage/>}
		</SessionProvider>
	);
}

export default App;
