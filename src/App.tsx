import React from 'react';
import { 
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import TheoryPage from './pages/theory/TheoryPage'
import MainPage from './pages/main/MainPage'
import Page404 from './pages/404/Page404'
import Stub from './pages/404/Stub'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={MainPage} />
				<Route path="/theory" component={TheoryPage} />
				<Route path="/training" component={Stub} />
				<Route path="/privacy" component={Stub} />
				<Route component={Page404} />
			</Switch>
		</Router>
	);
}

export default App;
