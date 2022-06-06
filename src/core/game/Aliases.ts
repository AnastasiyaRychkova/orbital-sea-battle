export type AliasId = 'mdl'
| 'gfm'
| 'mrn'
| '_ai';

export interface Alias
{
	name: string;
	id: AliasId;
}


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
		_base = new Map<AliasId, Alias>( [
			['mdl', {
				name: 'Менделеев',
				id: 'mdl',
			}],
			['gfm', {
				name: 'Гофман',
				id: 'gfm',
			}],
			['mrn', {
				name: 'Мёрнер',
				id: 'mrn',
			}],
			['_ai', {
				name: 'Droid',
				id: '_ai'
			}],
		] );
	},
}

Aliases.load();

export default Aliases;