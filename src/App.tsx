import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Landing from './pages/landing/Landing';
import { Landing } from './pages/landing-alt/Landing';
import SimpleGame from './pages/play/SimpleGamePage';
import Page404 from './pages/404/Page404';
import { GameRulesPage } from 'pages/rules/GameRulesPage';


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/"
					element={<Landing />}
				/>
				<Route path="play/*"
					element={<SimpleGame />}
				/>
				<Route path="rules"
					element={<GameRulesPage />}
				/>
				<Route path="*"
					element={<Page404 />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
