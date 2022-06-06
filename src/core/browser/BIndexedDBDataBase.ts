/**
 * * 0: field name
 * * 1: is unique
 */
type IndexedField = [ string, boolean ];

export type StoreParameters = {
	name: string,
	key: string,
	autoIncrement?: boolean,
	indexes?: IndexedField[],
}


/**
 * Обертка для базы данных браузерной IndexedDB
 */
class BIndexedDBDataBase
{
	#db: IDBDatabase

	constructor( db: IDBDatabase )
	{
		this.#db = db;
	}

	open( onClose?: ( name: string ) => void )
	{
		this.#db.onversionchange = event => {
			this.close();
			console.log("A new version of this page is ready. Please reload or close this tab!");
		};

		if( onClose )
			this.#db.onclose = () => { onClose( this.#db.name ) };
	}

	close()
	{
		this.#db.close();
	}

	/**
	 * Есть ли хранилище в базе данных
	 * @param name Название хранилища
	 */
	hasStore( name: string ): boolean
	{
		return this.#db.objectStoreNames.contains( name );
	}

	/** В базе данных нет хранилищ? */
	isEmpty(): boolean
	{
		return this.#db.objectStoreNames.length === 0;
	}

	/**
	 * Создать хранилища по схеме
	 * @param scheme Объект инициализации для хранилищ
	 */
	init( scheme: StoreParameters[] )
	{
		const storeNames: string[] = [];

		scheme.forEach( ( storeScheme ) => {
			if( !storeNames.includes( storeScheme.name ) )
			{
				this._createStore( storeScheme );
				storeNames.push( storeScheme.name );
			}
		} );
	}

	/**
	 * Создать хранилище в базе данных
	 * @param storeScheme Объект инициализации для хранилища
	 */
	private _createStore( storeScheme: StoreParameters ): void
	{
		const store = this.#db.createObjectStore(
			storeScheme.name,
			{
				keyPath: storeScheme.key,
				autoIncrement: storeScheme.autoIncrement,
			}
		);
		// Создать индексы для хранилища (для ускорения поиска)
		if( storeScheme.indexes && storeScheme.indexes.length > 0 )
			storeScheme.indexes.forEach((indexScheme) => {
				store.createIndex(
					indexScheme[0],
					indexScheme[0],
					{ unique: indexScheme[1] }
				);
			});
	}

	/**
	 * Обновить конфигурацию хранилищ
	 * @param scheme Объект инициализации для хранилищ
	 */
	update( scheme: StoreParameters[] )
	{
		throw new Error("Method not implemented");
		
	}

	getRow( storeName: string, keyValue: any ): Promise<any>
	{
		const promise = new Promise<any[]>(( resolve, reject ) => {
			const request = this.#db.transaction( [storeName], 'readonly' )
									.objectStore( storeName )
									.get( keyValue );

			request.onsuccess = () => {
				resolve( request.result );
			}
			request.onerror = () => {
				reject( request.error?.message );
			}
		} );
		return promise;
	}

	getAll( storeName: string ): Promise<any[]>
	{
		const promise = new Promise<any[]>(( resolve, reject ) => {
			const request = this.#db.transaction( [storeName], 'readonly' )
									.objectStore( storeName )
									.getAll();

			request.onsuccess = () => {
				resolve( request.result );
			}
			request.onerror = () => {
				reject( request.error?.message );
			}
		});
		return promise;
	}

	/**
	 * Создать новую запись в хранилище. Если такая запись уже есть, то операция будет отклонена.
	 * @param storeName Название хранилища
	 * @param row Строка в хранилище
	 * @returns Удалось ли выполнить операцию
	 */
	addNewRow( storeName: string, row: object ): Promise<boolean>
	{
		const promise = new Promise<boolean>(( resolve, reject ) => {
			const transaction = this.#db.transaction( [storeName], 'readwrite' );
			const request = transaction.objectStore( storeName )
										.add( row );

			// ---
			let completed: boolean = false;
			request.onsuccess = () => {
				completed = true;
			}
			request.onerror = () => {
				completed = false;
			}
			transaction.oncomplete = () => {
				completed ? resolve( completed ) : reject( completed );
			}
		});

		return promise;
	}

	updateOrCreateRow( storeName: string, row: object ): Promise<boolean>
	{
		const promise = new Promise<boolean>(( resolve, reject ) => {
			const transaction = this.#db.transaction( [storeName], 'readwrite' );
			const request = transaction.objectStore( storeName )
										.put( row );

			// ---
			let completed: boolean = false;
			request.onsuccess = () => {
				completed = true;
			}
			request.onerror = () => {
				completed = false;
			}
			transaction.oncomplete = () => {
				completed ? resolve( completed ) : reject( completed );
			}
		});

		return promise;
	}

	updateRowProp( storeName: string, rowKey: any, prop: string, value: any ): Promise<boolean>
	{
		const promise = new Promise<boolean>(( resolve, reject ) => {
			const transaction = this.#db.transaction( [storeName], 'readwrite' );
			const store = transaction.objectStore( storeName );
			const getRequest = store.get( rowKey );

			// ---
			let completed: boolean = false;
			getRequest.onerror = () => {
				completed = false;
			}

			getRequest.onsuccess = event => {
				const row = (event.target as any).result;
				row[prop] = value;
				const updateRequest = store.put( row );

				// ---
				updateRequest.onsuccess = () => {
					completed = true;
				}
				updateRequest.onerror = () => {
					completed = false;
				}
			}

			transaction.oncomplete = () => {
				completed ? resolve( completed ) : reject( completed );
			}
		});

		return promise;
	}
}



export default BIndexedDBDataBase;