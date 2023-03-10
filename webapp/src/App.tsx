import { useState } from 'react';
import Welcome from './components/Welcome';
import './App.css';
import LoginPage from './components/login/LoginPage';
import {SessionProvider, useSession} from "@inrupt/solid-ui-react";

function App(): JSX.Element {

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	//With this we can control the login status for solid
	const { session } = useSession();

	session.onLogin(() => setIsLoggedIn(true));
	session.onLogout(() => setIsLoggedIn(false));
  
	return(
		<SessionProvider>
			{(!isLoggedIn) ? <LoginPage /> : <Welcome message="Aquí iría el mapa"/>}
		</SessionProvider>
	)
}

export default App;
