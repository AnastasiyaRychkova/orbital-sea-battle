type Styles = {
	readonly [key: string]: string;
};


export default function cn(
	styles: Styles,
	classes: Array<string | undefined>,
	sideClasses?: string
): string {
	let className = classes.reduce((arr, classStr) => {
		if (classStr) arr.push(styles[classStr]);
		return arr;
	}, [] as string[]);

	if (sideClasses) {
		className.push(sideClasses);
	}

	return className.join( ' ' );
}



export function cnObj(
	styles: Styles,
	base: string,
	props: object,
	otherClasses?: string
): string {
	let className = styles[base];

	for (const [key, value] of Object.entries(props)) {
		if (typeof key === 'boolean') {
			if (value) className += ' ' + styles[key];
		} else className += ' ' + styles[value];
	}

	if (otherClasses) className += ' ' + otherClasses;

	return className;
}
