import { promiseWithError, promiseWithValue } from "../../util/util";
import browserDB, { BIndexedDBDataBase } from "../../browser/BIndexedDB";
import type IUser from "../GameplayEntities/UserInterface";
import type { UserRow } from "./storeTypes";
import Profile from "../GameplayEntities/Profile";

const DB_NAME = 'OrbitalBattleship'
const USERS = 'users';
const META = 'meta';

let db: BIndexedDBDataBase | null = null;


export default {
	async connect()
	{
		try {
			db = await openDB();
		} catch( error ) {
			console.log( (error as Error).message );
			// TODO: MemoStorage (if IndexedDB is not available)
		}
	},

	async createAccount( user: IUser ): Promise<boolean>
	{
		if( !db )
			return promiseWithError( 'Data base is not available' );
		return await db.addNewRow( USERS, _createUserRow( user ) );
	},

	async loadProfiles(): Promise<Profile[]>
	{
		if( !db || !db.hasStore( USERS ) )
			return [];

		let users: Profile[] = [];
		try {
			users = await db.getAll( USERS );
			return users;
		}
		catch( error ) {
			console.log( 'Loading profiles failed: ' + (error as Error).message );
		}

		return users;
	}
}

function openDB(): Promise<BIndexedDBDataBase>
{
	if( !browserDB.isAvailable() )
		return promiseWithError( 'IndexedDB is not available' );
	
	return browserDB.open( DB_NAME, {
		version: 1,
		stores: [
			{
				name: USERS,
				key: 'id',
				indexes: [
					['name', false],
					['lastVisit', true],
					['created', true],
				],
			},
			{
				name: META,
				key: 'userId',
			}
		]
	} );
}

function closeDB()
{

}

// TODO: Сохранение в БД Skin Collection
function _createUserRow( user: IUser ): UserRow
{
	return {
		id: user.id,
		name: user.name,
		lastVisit: user.lastVisit,
		created: user.created,
		alias: user.alias.id,
		balance: user.balance,
		skin: '',
		skinCollection: [],
	}
}