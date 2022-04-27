import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TestPage from './pages//testing/Test';
import './style/reset.css';
// import Test from './pages/testing/Test';
// import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<TestPage />
	</React.StrictMode>,
	document.getElementById('root')
);
