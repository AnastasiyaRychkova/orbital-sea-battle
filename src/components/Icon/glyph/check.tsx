import * as React from 'react';

function check( props: React.SVGProps<SVGSVGElement> ) {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M18.466 27.064l9.553-11.552-1.871-1.548-7.852 9.495-4.723-4.722-1.717 1.717 6.61 6.61z"
				fill="currentColor"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M37 20c0 9.389-7.611 17-17 17S3 29.389 3 20 10.611 3 20 3s17 7.611 17 17zm-2.429 0c0 8.048-6.523 14.571-14.571 14.571S5.429 28.048 5.429 20 11.952 5.429 20 5.429 34.571 11.952 34.571 20z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default check;
