import Profile, { IProfileInitObj, IProfile } from "../GameplayEntities/Profile";
import User, { IUserInitObj, IUser } from "../GameplayEntities/User";
import OB_LocalPlayer, { OB_ILocalPlayer } from "./entities/OB_LocalPlayer";
import OB_LocalPlayerController, { OB_ILocalPlayerController } from "./entities/OB_LocalPlayerController";
import OB_AIPLayer from "./entities/OB_AIPLayer";
import OB_AIEnemyBehaviour from "./entities/OB_AIEnemyBehaviour";
import { Diagram, Filter } from "../Diagram";

import type { IDiagram, IFilter } from "../Diagram/types";
import type { OB_IEnemy, IGameState } from './OB_Entities.d';



const entitiesFabric = {

	profile( initObject: IProfileInitObj ): IProfile
	{
		return new Profile( initObject );
	},

	user( profile: IProfile, initObject?: IUserInitObj ): IUser
	{
		return new User( profile, initObject || {} );
	},

	localPlayer( user: IUser ): OB_ILocalPlayer
	{
		return new OB_LocalPlayer( user );
	},

	localPlayerController( game: IGameState ): OB_ILocalPlayerController
	{
		return new OB_LocalPlayerController( game );
	},

	aiPlayer( user: IUser ): OB_IEnemy
	{
		return new OB_AIPLayer( user );
	},

	aiPlayerBehaviour( game: IGameState ): OB_AIEnemyBehaviour
	{
		return new OB_AIEnemyBehaviour( game );
	},

	diagram( filter?: IFilter, highlight?: IFilter ): IDiagram
	{
		return new Diagram( filter, highlight );
	},

	filter(): IFilter
	{
		return new Filter();
	},
}

export default entitiesFabric;