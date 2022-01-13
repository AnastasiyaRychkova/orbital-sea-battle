import React from 'react';
import { useLocation } from 'react-router-dom';
import page from '../ExpPage';
import type { URL } from '../ExpPage.d';

const PageManager: React.FC = () => {
	const location = useLocation();
	page.apply( location.pathname as URL );
	console.log('Location:', location.pathname );
	/* useEffect(() => {
		page.apply( location.pathname as URL );
		console.log('Location:', location.pathname );
	}, [location]); */

	return (null);
};

export default PageManager;