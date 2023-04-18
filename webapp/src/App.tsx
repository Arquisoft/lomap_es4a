import {useEffect, useState} from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";
import LoginPage from './components/login/LoginPage';
import MainPage from "./components/MainPage";
import {SelectChangeEvent} from "@mui/material";
import {isLoggedIn, login} from "./api/api";
import Box from "@mui/material/Box";
import {Route, Routes} from "react-router-dom";

function App(): JSX.Element {

	return(
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/mainpage" element={<MainPage />} />
		</Routes>
	);
}

export default App;
