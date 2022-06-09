import React, {FC} from 'react';
import { observer } from "mobx-react";
import PanelMobile from './mobile/Panel';
import PanelDesktop from './Panel';
import { IDiagramState } from '../../core/game/OrbitalBattleship/OB_Entities';
import { CellQN } from '../../core/game/ChemicalElement/QuantumNumbers';

type UiStore = {
	mobile: boolean,
}


interface IProps {
	ui: UiStore,
	className?: string,
	diagramState: IDiagramState,
	fireFn: ( cell: CellQN ) => void,
}

const Filter: FC<IProps> = (observer(({
	ui,
	diagramState,
	fireFn,
	className,
}) => {
	return ui && ui.mobile
		? ( <PanelMobile 
				diagram={diagramState}
				className={className}
				fireFn={fireFn}
				/> )
		: ( <PanelDesktop
				diagram={diagramState}
				className={className}
				fireFn={fireFn}
				/> );
}));

export default Filter;