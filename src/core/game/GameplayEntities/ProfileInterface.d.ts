import { AliasId } from "../Aliases";

interface IProfile
{
	name: string

	alias: Alias

	id: number

	points: number

	level: number

	lastVisit: Date

	created: Date

	rename( newName: string ): void

	changeAlias( newAliasId: AliasId ): void
}


export default IProfile;