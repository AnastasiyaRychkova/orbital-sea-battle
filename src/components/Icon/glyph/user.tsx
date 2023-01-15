import * as React from 'react';

function user( props: React.SVGProps<SVGSVGElement> ) {
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
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.774 27.88C8.549 26.035 10.958 25 13.47 25h14.06c2.512 0 4.92 1.036 6.696 2.88C36.002 29.722 37 32.222 37 34.83V39h-2.87v-4.17c0-1.817-.695-3.56-1.933-4.845a6.48 6.48 0 00-4.667-2.006H13.47a6.48 6.48 0 00-4.667 2.006A6.985 6.985 0 006.87 34.83V39H4v-4.17c0-2.607.998-5.107 2.774-6.95zM20.5 4.727c-3.657 0-6.621 2.809-6.621 6.273 0 3.464 2.964 6.273 6.621 6.273 3.657 0 6.621-2.809 6.621-6.273 0-3.464-2.964-6.273-6.621-6.273zM11 11c0-4.97 4.253-9 9.5-9S30 6.03 30 11s-4.253 9-9.5 9-9.5-4.03-9.5-9z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default user;
