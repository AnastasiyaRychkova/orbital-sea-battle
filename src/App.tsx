import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

// import Landing from './pages/landing/Landing';
import Landing from './pages/landing-alt/pages/mainPage/MainPage';
import SimpleGame from './pages/play/SimpleGamePage';
import Page404 from './pages/404/Page404';
import Stub from './pages/404/Stub';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={ <Landing/> } />
				<Route path="play/*" element={ <SimpleGame/> } />
				<Route path="theory" element={ <Stub/> } />
				<Route path="*" element={ <Page404/> } />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
