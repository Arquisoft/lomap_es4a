import './App.css';
import LoginPage from './components/login/LoginPage';
import MainPage from "./components/MainPage";
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
