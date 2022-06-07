import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import Landing from './pages/landing/Landing';
import SimpleGame from './pages/play/SimpleGamePage';
import Page404 from './pages/404/Page404';
import Stub from './pages/404/Stub';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={ <Landing/> } />
				<Route path="play" element={ <SimpleGame/> } />
				<Route path="theory" element={ <Stub/> } />
				<Route path="*" element={ <Page404/> } />
			</Routes>
		</Router>
	);
}

export default App;
