import React, { useEffect, useState } from 'react';
import { Provider, observer } from 'mobx-react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import uiStore from '../../../core/browser/UIStore';
import process from '../ExpProcess';

import Start from './StartPage';
import ShootingPage from './ShootingPage';
import FeedbackPage from './FeedbackPage';
import EndPage from './EndPage';
import PageManager from './PageManager';


const lastVisitedUrl = process.checkPoint;

const ExperimentPage = observer(() => {
	const [initialized, setInitialized] = useState( false );
	useEffect(() => {
		setInitialized( true );
	}, [initialized]);

	return (
		<Provider ui={uiStore}>
			<Router>
				{!initialized &&
				<Navigate to={lastVisitedUrl} replace={true} />}
				<PageManager />
				<Routes>
					<Route path="/" element={<Start/>} />
					<Route path="/lesson/*" element={<ShootingPage/>} />
					<Route path="/feedback/*" element={<FeedbackPage/>} />
					<Route path="/end" element={<EndPage/>} />
				</Routes>
			</Router>
		</Provider>
	);
});

export default ExperimentPage;