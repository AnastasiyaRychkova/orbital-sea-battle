import User, { IUserInitObj } from "../GameplayEntities/User";
import OB_LocalPlayer, { OB_ILocalPlayer } from "./entities/OB_LocalPlayer";
import OB_LocalPlayerController, { OB_ILocalPlayerController } from "./entities/OB_LocalPlayerController";
import OB_AIPLayer from "./entities/OB_AIPLayer";
import OB_AIEnemyBehaviour from "./entities/OB_AIEnemyBehaviour";
import Diagram, { IDiagram } from "../Diagram/Diagram";
import Filter, { IFilter } from "../Diagram/Filter/Filter";

import type { OB_IEnemy, OB_IGameState } from './OB_Entities.d';



const entitiesFabric = {

	user( initObject: IUserInitObj ): User
	{
		return new User( initObject );
	},

	localPlayer( user: User ): OB_ILocalPlayer
	{
		return new OB_LocalPlayer( user );
	},

	localPlayerController( game: OB_IGameState ): OB_ILocalPlayerController
	{
		return new OB_LocalPlayerController( game );
	},

	aiPlayer( user: User ): OB_IEnemy
	{
		return new OB_AIPLayer( user );
	},

	aiPlayerBehaviour( game: OB_IGameState ): OB_AIEnemyBehaviour
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