import { promiseWithError, promiseWithValue } from '../util/util';
import BIndexedDBDataBase, { StoreParameters } from "./BIndexedDBDataBase";

type DBScheme = {
	version: number,
	stores: StoreParameters[]
}

type DbType = {
	version: number,
	opened: boolean,
	db: BIndexedDBDataBase | null,
}

const indexedDB = window.indexedDB || (window as any).mozIndexedDB || (window as any).webkitIndexedDB || (window as any).msIndexedDB;
/* window.IDBTransaction = window.IDBTransaction || (window as any).webkitIDBTransaction || (window as any).msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || (window as any).webkitIDBKeyRange || (window as any).msIDBKeyRange; */


const _bases = new Map<string, DbType>();

(function loadDataBases()
{
	if( indexedDB === undefined )
		return;

	const promise = indexedDB.databases();
	promise.then( databases => {
		databases.forEach( ( db ) => {
			if( db.name )
				_addNewDBNote( db.name, db.version );
		} )
	} )
	.catch( ( reason ) => {
		console.log( 'IndexedDB databases list is not available: ' + reason );
	} );
})();

/**
 * Сохранить в оперативной памяти быстрые запись и ссылку на базу данных
 * @param dbName Название базы данных
 * @param version Версия базы данных
 */
function _addNewDBNote( dbName: string, version: number = 0 )
{
	const note = {
			version,
			opened: false,
			db: null,
		};
	_bases.set( dbName, note );
	return note;
}

function _closeDBHandler( dbName:string ) {
	const db = _bases.get( dbName );
	if( !db )
		return;
	db.opened = false;
}



/** Обертка для браузерного IndexedDB */
export default {

	/** Есть ли поддержка IndexedDB в браузере */
	isAvailable(): boolean
	{
		return indexedDB !== undefined;
	},

	/**
	 * Была ли создана конкретная база данных в хранилище браузере
	 * @param dbName Название базы данных
	 * @returns Была ли создана база данных
	 */
	wasDBCreated( dbName: string ): boolean
	{
		return _bases.get( dbName )?.opened || false;
	},

	/**
	 * Открыть базу данных
	 * @param dbName Название базы данных
	 * @param scheme Схема базы (версия и данные для инициализации хранилищ)
	 * @returns База данных (BIndexedDBDataBase) или ошибка
	 */
	async openDB( dbName: string, scheme: DBScheme ): Promise<BIndexedDBDataBase>
	{
		if( !this.isAvailable() )
			return promiseWithError( 'IndexedDB is not available' );

		let database = _bases.get( dbName );
		if( !database )
			database = _addNewDBNote( dbName, scheme.version );

		if( database.opened && database.db )
			return promiseWithValue( database.db );

		const promise = new Promise<BIndexedDBDataBase>( ( resolve, reject ) => {
			
			const request = indexedDB.open( dbName, scheme.version );

			request.onsuccess = () => {
				database!.db = new BIndexedDBDataBase( request.result );
				database!.version = scheme.version;
				database!.opened = true;
				resolve( database!.db );
			};

			request.onerror = () => {
				reject( request.error );
			};

			request.onupgradeneeded = ( event: IDBVersionChangeEvent ) => {
				const db = new BIndexedDBDataBase( request.result );
				database!.db = db;
				database!.version = scheme.version;
				database!.opened = true;

				db.open( _closeDBHandler );
				if( db.isEmpty() )
					db.init( scheme.stores );
				else
					db.update( scheme.stores );

				database!.version = scheme.version;

				resolve( db );
			};
			
		} );
		
		return promise;
	},

	closeDB( dbName: string ): void
	{
		const base = _bases.get( dbName );
		if( !base )
			return;
		base.db?.close();
	}
}

export type {
	BIndexedDBDataBase,
	StoreParameters,
}
