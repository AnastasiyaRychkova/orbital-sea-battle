import * as React from 'react';

function typing( props: React.SVGProps<SVGSVGElement> ) {
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
				d="M8.556 30.8c.09 0 .18-.009.27-.023l7.57-1.327a.44.44 0 00.238-.126l19.075-19.076a.449.449 0 000-.634L28.23 2.13a.445.445 0 00-.319-.13.445.445 0 00-.32.13L8.517 21.207a.457.457 0 00-.126.239l-1.328 7.569a1.507 1.507 0 00.423 1.34c.297.288.671.446 1.071.446zm3.034-7.848L27.91 6.635l3.298 3.299L14.888 26.25l-4 .706.701-4.005zM36.56 34.58H3.44c-.796 0-1.44.644-1.44 1.44v1.62c0 .198.162.36.36.36h35.28c.198 0 .36-.162.36-.36v-1.62c0-.797-.644-1.44-1.44-1.44z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default typing;
