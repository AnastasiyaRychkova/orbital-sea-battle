import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styles from './Diagram.module.css';
import Body from '../../../components/Body/Body';
import { GameTopInterface, GameBottomInterface, All } from '../../../components/GameInterface/GameInterface';
import SelectedElement from '../../../components/GameInterface/SelectedElement/SelectedElement';
import StartMissionButton from '../../../components/GameInterface/StartMission/StartMissionButton';
import FillingPanel from '../../../components/FillingPanel/FillingPanel';
import DiagramComponent from '../../../components/Diagram/Diagram';

import type { OB_IEnemy, OB_ILocalPlayer } from '../../../core/game/OrbitalBattleship/OB_Entities';

interface IProps {
	/** Локальный игрок */
	player: OB_ILocalPlayer;

	/** Противник */
	enemy: OB_IEnemy;

	/** Функция для выхода */
	back: () => void;

	/** Функция для продолжения игры */
	forward: () => void;
}


/** Страница с заполнением диаграммы */
const FillingDiagram: FC<IProps> = observer(( {
	player,
	enemy,
	back,
	forward,
} ) => {
	const { t } = useTranslation();

	const diagram = player.diagram!;
	if( diagram.mode === 'none' )
		diagram.mode = 'cell';
	const toggleMode = useCallback( () => {
		diagram.mode = diagram.mode === 'cell' ? 'block' : 'cell';
	}, [] );

	return (
		<Body>
			<All>
				<GameTopInterface
					player = { player.user }
					playerStatus = { t("status.filling") }
					enemy = { enemy.user }
					enemyStatus = { t("status.filling") }
					turn = { "none" }
					leftCorner = {
						<SelectedElement
							element = { player.selectedElement! }
							chosen = { diagram.observableState.cellCounter || 0 }
						/>
					}
				/>
		
				<GameBottomInterface
					giveUp = { back }
				>
					<FillingPanel
						mode = { diagram.mode }
						change = { toggleMode }
					/>

					<StartMissionButton onClick={ forward } />

				</GameBottomInterface>
			</All>

			<div className = { styles["diagram-container"] } >
				<DiagramComponent
					diagram = { diagram }
					zooming = { true }
					style = { 'ships' }
					className = { styles["diagram"] }
				/>
			</div>
		</Body>	
	);
});

export default FillingDiagram;