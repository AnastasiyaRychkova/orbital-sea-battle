import React from 'react';
import { Provider, observer } from 'mobx-react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import uiStore from '../../../client/UIStore';

import Start from './StartPage';
import ShootingPage from './ShootingPage';
import Analytics from '../../../components/Analytics/Analytics';
import PageManager from './PageManager';


const ExperimentPage = observer(() => {
	return (
		<Provider ui={uiStore}>
			<Router>
				<PageManager />
				<Switch>
					<Route exact path="/" component={Start} />
					<Route path="/lesson" component={ShootingPage} />
				</Switch>
				<Analytics />
			</Router>
		</Provider>
	);
});

export default ExperimentPage;