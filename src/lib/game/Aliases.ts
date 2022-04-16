export interface Alias
{
	name: string;
	description: string;
}

const Aliases = {
	array: [] as Alias[],

	load(): void
	{
		this.array.push( {
			name: 'Менделеев',
			description: 'Химик',
		},
		{
			name: 'Гофман',
			description: 'Другой химик',
		} );
	},

	random(): Alias
	{
		return this.array[ Math.round( this.array.length * Math.random() ) ];
	},
}

Aliases.load();

export default Aliases;