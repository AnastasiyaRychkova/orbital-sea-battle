import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ExperimentPage from './pages/diagram_shooting/components/ExperimentPage';
import './style/reset.css';
// import Test from './pages/testing/Test';
// import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<ExperimentPage />
	</React.StrictMode>,
	document.getElementById('root')
);
