export interface Alias
{
	name: string;
	description: string;
	id: string;
}

export type AliasId = string;

let _base = new Map<string, Alias>();

const Aliases = {

	get array(): Alias[]
	{
		return Array.from(_base.values() );
	},

	random(): Alias
	{
		return Array.from(_base.values() )[ Math.round( this.array.length * Math.random() ) ];
	},

	getById( id: AliasId ): Alias | undefined
	{
		return _base.get( id );
	},

	load(): void
	{
		_base = new Map<string, Alias>( [
			['mdl', {
				name: 'Менделеев',
				description: 'Химик',
				id: 'mdl',
			}],
			['gfm', {
				name: 'Гофман',
				description: 'Другой химик',
				id: 'gfm',
			}],
		] );
	},
}

Aliases.load();

export default Aliases;