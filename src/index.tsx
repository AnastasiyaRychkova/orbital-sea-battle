import React from 'react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import './style/fonts/fonts.css';
import './style/root.css';
import './style/text.css';
import './style/index.css';

import App from './App';
import LoadingIcon from './components/Loading/LoadingIcon';

ReactDOM.render(
	<React.StrictMode>
		<Suspense fallback={ <LoadingIcon /> }>
			<I18nextProvider i18n={ i18n }>
				<App />
			</I18nextProvider>
		</Suspense>
	</React.StrictMode>,
	document.getElementById( 'root' )
);
