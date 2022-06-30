import React, { FC, useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styles from './Diagram.module.css';
import Body from '../../../components/Body/Body';
import { GameTopInterface, GameBottomInterface, All } from '../../../components/GameInterface/GameInterface';
import GiveUpButton from '../../../components/GameInterface/GiveUp/GiveUpButton';
import SelectedElement from '../../../components/GameInterface/SelectedElement/SelectedElement';
import DropSidedInfo from '../../../components/DropSidedInfo/DropSidedInfo';
import IconButton from '../../../components/Button/WithIcon/Button';
import FillingPanel from '../../../components/FillingPanel/FillingPanel';
import DiagramComponent from '../../../components/Diagram/Diagram';

import type { IGameState } from '../../../core/game/OrbitalBattleship/OB_Entities';
import { useAppPath } from '../../../components/Router/Router';

interface IProps {
	game: IGameState;

	/** Функция для выхода */
	back: () => void;

	/** Функция для продолжения игры */
	forward: () => void;
}

type ModeType = 'cell' | 'block';


/** Страница с заполнением диаграммы */
const FillingDiagram: FC<IProps> = observer(( {
	game,
	back,
	forward,
} ) => {
	const { t } = useTranslation();

	const player = game.player;
	const enemy = game.enemy;
	const diagram = player.diagram!;

	const state = useAppPath().lastPart;
	const [editMode, setEditMode] = useState( 'block' );
	diagram.mode = state !== 'diagram' ? 'none' : editMode;

	const toggleMode = useCallback( () => {
		setEditMode( editMode === 'cell' ? 'block' : 'cell' );
	}, [editMode] );


	return (
		<Body>
			<div className = { styles["diagram-container"] } >
				<DiagramComponent
					diagram = { diagram }
					zooming = { true }
					style = { 'ships' }
					className = { styles["diagram"] }
				/>
			</div>
			
			<All>
				<GameTopInterface
					player = { player.user }
					playerStatus = { t("status.filling") }
					enemy = { enemy.user }
					enemyStatus = { t("status.filling") }
					turn = { "none" }
					leftCorner = {
						<>
							<DropSidedInfo
								message = { t("info.filling.m") }
								comment = { t("info.filling.c") }
							/>
							
							<SelectedElement
								element = { player.selectedElement! }
								chosen = { diagram.observableState.cellCounter || 0 }
							/>
						</>
					}
				/>
		
				<GameBottomInterface>
					<GiveUpButton onClick = { back } />

					<FillingPanel
						mode = { editMode as ModeType }
						change = { toggleMode }
					/>

					<IconButton
						value = { t("actions.start") }
						glyph = 'play'
						priority = 'primary'
						theme = 'muted'
						onClick = { forward }
						disabled = { state !== 'diagram' || diagram.observableState.cellCounter === 0 }
						className = { styles.startBtn }
					/>
				</GameBottomInterface>
			</All>
		</Body>	
	);
});


export default FillingDiagram;