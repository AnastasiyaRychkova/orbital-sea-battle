import IndexedDBStore from "./IndexedDBStore";
import type { StoreType } from "./storeTypes";
import type { IProfile } from "../../GameplayEntities/Profile";
import type { IUser } from "../../GameplayEntities/User";

let browserStore: StoreType | null = null;

const Store: StoreType = {

	isAvailable()
	{
		// return true;
		return IndexedDBStore.isAvailable();
	},

	async connect()
	{
		if( browserStore && browserStore.isAvailable() )
			return;

		if( IndexedDBStore.isAvailable() )
		{
			try {
				browserStore = IndexedDBStore;
				browserStore.connect();
				console.log( 'IndexedDB is connected' );
			} catch( error ) {
				console.log( 'Failed to connect to IndexedDB' );
				// TODO: LocalStorage as game store
			}
		}
	},

	async createAccount( user: IUser ): Promise<void>
	{
		if( !browserStore )
			throw new Error( "No connection with DB" );

		browserStore?.createAccount( user );
	},

	async loadProfiles(): Promise<IProfile[]>
	{
		if( !browserStore )
			throw new Error( "No connection with DB" );

		return browserStore.loadProfiles();
	},

	async loadUser( profile: IProfile ): Promise<IUser>
	{
		if( !browserStore )
			throw new Error( "No connection with DB" );

		return browserStore.loadUser( profile );
	},

	disconnect()
	{
		if( !browserStore )
			return;

		browserStore.disconnect();
		browserStore = null;
	},
}



export default Store;