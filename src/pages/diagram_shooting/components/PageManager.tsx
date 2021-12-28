import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import page from '../ExpPage';
import type { URL } from '../ExpPage.d';

const PageManager: React.FC = () => {
	const location = useLocation();

	useEffect(() => {
		page.apply( location.pathname as URL );
		console.log('Location:', location.pathname );
	}, [location]);

	return (null);
};

export default PageManager;