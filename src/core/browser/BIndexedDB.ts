import { promiseWithError } from '../util/util';
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

window.indexedDB = window.indexedDB || (window as any).mozIndexedDB || (window as any).webkitIndexedDB || (window as any).msIndexedDB;
window.IDBTransaction = window.IDBTransaction || (window as any).webkitIDBTransaction || (window as any).msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || (window as any).webkitIDBKeyRange || (window as any).msIDBKeyRange;


const _bases = new Map<string, DbType>();

(function loadDataBases()
{
	if( window.indexedDB === undefined )
		return;

	const promise = window.indexedDB.databases();
	promise.then( databases => {
		databases.forEach( ( db ) => {
			if( db.name )
				addNewDBNote( db.name, db.version );
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
function addNewDBNote( dbName: string, version: number = 0 )
{
	_bases.set(
		dbName,
		{
			version,
			opened: false,
			db: null,
		}
	);
}



/** Обертка для браузерного IndexedDB */
export default {

	/** Есть ли поддержка IndexedDB в браузере */
	isAvailable(): boolean
	{
		return window.indexedDB !== undefined;
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
	open( dbName: string, scheme: DBScheme ): Promise<BIndexedDBDataBase>
	{
		if( !this.isAvailable() )
			return promiseWithError( 'IndexedDB is not available' );

		const database = _bases.get( dbName );
		if( !database )
			addNewDBNote( dbName, scheme.version );

		const promise = new Promise<BIndexedDBDataBase>( ( resolve, reject ) => {
			
			const request = window.indexedDB.open( dbName, scheme.version );

			request.onsuccess = () => {
				database!.db = new BIndexedDBDataBase( request.result );
				database!.version = scheme.version;
				database!.opened = true;
				resolve( database!.db );
			};

			request.onerror = ( event ) => {
				reject( request.error );
			};

			request.onupgradeneeded = ( event: IDBVersionChangeEvent ) => {
				const db = new BIndexedDBDataBase( request.result );
				database!.db = db;
				database!.version = scheme.version;
				database!.opened = true;

				db.start();
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
}

export type {
	BIndexedDBDataBase,
	StoreParameters,
}
