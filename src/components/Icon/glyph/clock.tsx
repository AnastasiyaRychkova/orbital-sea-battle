import React from 'react';

const clock = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 100 100">
			<path fill="currentColor" d="M46 28a28 28 0 0122.653 44.458L46 56V28z"/>
			<circle cx="46" cy="56" r="38" stroke="currentColor" strokeWidth="6"/>
			<g>
			<rect width="20" height="8" x="82.257" y="15" fill="currentColor" rx="2" transform="rotate(50 82.257 15)"/>
			<rect width="10" height="12" x="82.406" y="21.401" fill="currentColor" transform="rotate(50 82.406 21.401)"/>
			</g>
			<g>
			<rect width="20" height="8" x="36" y="2" fill="currentColor" rx="2"/>
			<rect width="10" height="12" x="41" y="6" fill="currentColor"/>
			</g>
		</svg>
	);
};

export default clock;