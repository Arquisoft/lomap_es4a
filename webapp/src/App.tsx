import { useState } from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";
import LoginPage from './components/login/LoginPage';
import {SessionProvider, useSession} from "@inrupt/solid-ui-react";
import MainPage from "./components/MainPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App(): JSX.Element {

	const [isLoggedIn, setIsLoggedIn] = useState(false);


	//With this we can control the login status for solid
 	const { session } = useSession();

	const queryClient = new QueryClient();

	session.onLogin(() => setIsLoggedIn(true));
	session.onLogout(() => setIsLoggedIn(false));

	return(
		<SessionProvider>
			<Router>
				<Routes>
					<Route path="/" element={<LoginPage/>} />
					<Route path="/map" element={<QueryClientProvider client={queryClient}><MainPage session={session}/></QueryClientProvider>} />
				</Routes>
			</Router>
		</SessionProvider>
	);	
}

export default App;
