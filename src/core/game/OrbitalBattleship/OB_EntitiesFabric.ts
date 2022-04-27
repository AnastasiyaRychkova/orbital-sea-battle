import Diagram, { IDiagram } from "../Diagram/Diagram";
import Filter, { IFilter } from "../Diagram/Filter/Filter";
import User, { IUserInitObj } from "../GameplayEntities/User";
import OB_AIPLayer from "./OB_AIPLayer";
import OB_AIPLayerBehaviour, {InitializeObject as AIBehaviourInitObj} from "./OB_AIPlayerBehaviour";
import OB_IEnemy from "./OB_EnemyInterface";
import OB_LocalPlayer, { OB_ILocalPlayer } from "./OB_LocalPlayer";
import ShotsAnalyzer from "./OB_ShotsAnalyzer";
import type { InitializeObject as PlayerInitObj } from "./OB_Player";

const entitiesFabric = {
	user( initObject: IUserInitObj ): User
	{
		return new User( initObject );
	},

	localPlayer( init: PlayerInitObj ): OB_ILocalPlayer
	{
		return new OB_LocalPlayer( init );
	},

	aiPlayer( init: PlayerInitObj ): OB_IEnemy
	{
		return new OB_AIPLayer( init );
	},

	aiPlayerBehaviour( init: AIBehaviourInitObj ): OB_AIPLayerBehaviour
	{
		return new OB_AIPLayerBehaviour( init );
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