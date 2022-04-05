import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics: React.FC = () => {
	const location = useLocation();

	useEffect(() => {
		console.log('Analytics');
	}, [location]);

	return (null);
};

export default Analytics;