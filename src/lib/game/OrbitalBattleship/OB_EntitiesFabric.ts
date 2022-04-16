import Diagram, { IDiagram } from "../Diagram/Diagram";
import Filter, { IFilter } from "../Diagram/Filter/Filter";
import User, { IUserInitObj } from "../GameplayEntities/User";
import AIPLayer, {InitializeObject as AIInitObj} from "./OB_AIPLayer";
import OB_IEnemy from "./OB_EnemyInterface";
import OB_IGameState from "./OB_GameStateInterface";
import OB_LocalPlayer, { OB_ILocalPlayer } from "./OB_LocalPlayer";
import ShotsAnalyzer from "./OB_ShotsAnalyzer";

const entitiesFabric = {
	user( initObject: IUserInitObj ): User
	{
		return new User( initObject );
	},

	localPlayer( user: User ): OB_ILocalPlayer
	{
		return new OB_LocalPlayer( user );
	},

	aiPlayer( init: AIInitObj ): OB_IEnemy
	{
		return new AIPLayer( init );
	},

	diagram( filter?: IFilter, highlight?: IFilter ): IDiagram
	{
		return new Diagram( filter, highlight );
	},

	filter(): IFilter
	{
		return new Filter();
	},

	shotsAnalyzer(): ShotsAnalyzer
	{
		return new ShotsAnalyzer();
	}
}

export default entitiesFabric;

export type {
	IDiagram,
	IFilter,
	ShotsAnalyzer,
	User,
	OB_ILocalPlayer,
	OB_IEnemy,
}