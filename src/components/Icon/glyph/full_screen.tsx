import * as React from 'react';

function fullScreen( props: React.SVGProps<SVGSVGElement> ) {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 100 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M16 84l17.556-17.555M84 15.794L66.445 33.35M68.5 13H87v18.5M87 68.5V87H68.5M31.5 87H13V68.5M13 31.5V13h18.5"
				stroke="currentColor"
				strokeWidth={6}
				strokeLinecap="square"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default fullScreen;
