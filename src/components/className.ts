type Styles = {
	readonly [key: string]: string;
};


export default function cn(
	styles: Styles,
	props: Array<string|undefined>,
	otherClasses?: string,
	): string
{
	let className = '';

	props.forEach(( prop ) => {
		if( prop )
			className += styles[prop] + ' ';
	});

	if( otherClasses )
		className += otherClasses;

	return className;
}



export function cnObj(
	styles: Styles,
	base: string,
	props: object,
	otherClasses?: string
	): string
{
	let className = styles[base];

	for( const [key, value] of Object.entries( props ) ) {
		if( typeof key === "boolean" ) {
			if( value )
				className += ' ' + styles[key];
		}
		else
			className += ' ' + styles[value];
	}

	if( otherClasses )
		className += ' ' + otherClasses;

	return className;
}