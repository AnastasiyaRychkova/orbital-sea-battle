import * as React from 'react';

function edit( props: React.SVGProps<SVGSVGElement> ) {
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
				d="M32.312 2L38 7.688l-4.336 4.338-5.688-5.688L32.312 2zM11.48 28.52h5.687l13.816-13.815-5.688-5.688L11.48 22.833v5.687z"
				fill="currentColor"
			/>
			<path
				d="M32.335 34.208H11.779c-.05 0-.1.019-.15.019-.062 0-.125-.017-.19-.019H5.793V7.665h12.981l3.792-3.792H5.792A3.794 3.794 0 002 7.665v26.543C2 36.301 3.7 38 5.792 38h26.543a3.792 3.792 0 003.792-3.792V17.774l-3.792 3.792v12.642z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default edit;
