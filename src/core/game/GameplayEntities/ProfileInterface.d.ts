import { Alias } from "../Aliases";

interface IProfile
{
	name: string

	alias: Alias

	id: number

	rename( newName: string ): void

	changeAlias( newAlias: Alias ): void
}


export default IProfile;