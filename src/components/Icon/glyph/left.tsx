import React from 'react';

const left = ( props: React.SVGProps<SVGSVGElement> ) => {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 22 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M15.0996 2.5999L6.69961 10.9999L15.0996 19.3999"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="transparent"
				stroke="currentColor"
			/>
		</svg>
	);
};

export default left;
