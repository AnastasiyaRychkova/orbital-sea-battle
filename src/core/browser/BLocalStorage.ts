const bLocalStorage = {
	get( key: string ): string | null
	{
		return _get( key );
	},

	getAsString( key: string ): string
	{
		return _get( key ) || '';
	},

	getAsBoolean( key: string ): boolean
	{
		return _get( key ) === 'true';
	},

	getAsInt( key: string ): number
	{
		return parseInt( _get( key ) || '0' );
	},

	getAsFloat( key: string ): number
	{
		return parseFloat( _get( key ) || '0.0' );
	},

	getAsObject( key: string ): object
	{
		return JSON.parse( _get( key ) || '{}' );
	},

	has( key: string ): boolean
	{
		return _get( key ) !== null;
	},

	setPrimitive( key: string, value: number | string | boolean | null ): void
	{
		typeof value === 'string'
			? _setString( key, value )
			: _set( key, value );
	},

	setObject( key: string, value: object ): void
	{
		_setString( key, JSON.stringify( value ) );
	},
}



function _get( key: string ): string | null
{
	return localStorage.getItem( key );
}

function _set( key: string, value: number | boolean | null ): void
{
	localStorage.setItem( key , String( value ) );
}

function _setString( key: string, value: string): void
{
	localStorage.setItem( key , value );
}



export default bLocalStorage;