import * as React from 'react';

export const Advantage1 = ( props: React.SVGProps<SVGSVGElement> ) => {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 95 95"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.547 41.563l17.14-29.688 17.14 29.688h-14.17v41.562h-5.938V41.562H12.547z"
				fill="currentColor"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M82.453 53.438l-17.14 29.687-17.14-29.688h14.17V11.876h5.938v41.563h14.172z"
				fill="currentColor"
			/>
			<path stroke="currentColor"
				strokeWidth={5}
				d="M2.5 2.5h90v90h-90z"
			/>
		</svg>
	);
};
