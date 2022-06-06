import browserDB, { BIndexedDBDataBase } from "../../../browser/BIndexedDB";
import Profile, { IProfile } from "../../GameplayEntities/Profile";
import User, { IUser } from "../../GameplayEntities/User"
import { StoreType, UserRow } from "./storeTypes"

const DB_NAME = 'OrbitalBattleship'
const USERS = 'users';
const META = 'meta';

const IDB_ERROR = 'IndexedDB is not available';
const NO_DB_ERROR = 'Data base is not available';

let _db: BIndexedDBDataBase | null = null;



const IndexedDBStore: StoreType = {

	isAvailable(): boolean {
		return browserDB.isAvailable();
	},

	async connect(): Promise<void>
	{
		if( !browserDB.isAvailable() )
			throw new Error( NO_DB_ERROR );

		_db = await _openDB();
	},

	async createAccount( user: IUser ): Promise<void>
	{
		if( !browserDB.isAvailable() )
			throw new Error( IDB_ERROR );

		if( !_db )
			throw new Error( NO_DB_ERROR );

		await _db.addNewRow( USERS, _createUserRow( user ) );

	},

	async loadProfiles(): Promise<IProfile[]>
	{
		if( !browserDB.isAvailable() )
			throw new Error( IDB_ERROR );

		if( !_db )
			throw new Error( NO_DB_ERROR );

		const rows = await _db.getAll( USERS );
		return rows.map( _userRowToProfile );
	},

	async loadUser(profile: IProfile): Promise<IUser>
	{
		if( !browserDB.isAvailable() )
			throw new Error( IDB_ERROR );

		if( !_db )
			throw new Error( NO_DB_ERROR );

		const userRow = await _db?.getRow( USERS, profile.id ) as UserRow;
		return new User( profile, {
			balance: userRow.balance,
		} );
	},

	disconnect: function () {
		browserDB.closeDB( DB_NAME );
	}
}




async function _openDB(): Promise<BIndexedDBDataBase>
{	
	return browserDB.openDB( DB_NAME, {
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
		level: user.level,
		points: user.points,
	}
}

function _userRowToProfile( userRow: UserRow ): Profile
{
	const profile = new Profile( {
		name: userRow.name,
		aliasId: userRow.alias,
		id: userRow.id,
		level: userRow.level,
		points: userRow.points,
		lastVisit: userRow.lastVisit,
		created: userRow.created,
	} );
	return profile;
}




export default IndexedDBStore;