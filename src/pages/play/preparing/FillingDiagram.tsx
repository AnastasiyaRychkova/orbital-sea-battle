import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Diagram.module.css';
import Body from '../../../components/Body/Body';
import { GameTopInterface, GameBottomInterface, All } from '../../../components/GameInterface/GameInterface';
import DiagramComponent from '../../../components/Diagram/Diagram';

import IProfile from '../../../core/game/GameplayEntities/ProfileInterface';
import Diagram from '../../../core/game/Diagram/Diagram';
import { ChemicalElement } from '../../../core/game/ChemicalElement/ChemicalElement';

interface IProps {
	/** Локальный игрок */
	player: IProfile;

	/** Противник */
	enemy: IProfile;

	/** Выбранный элемент */
	element: ChemicalElement;

	/** Функция для выхода */
	back: () => void;

	/** Функция для продолжения игры */
	forward: () => void;
}

/** Страница с заполнением диаграммы */
export default function FillingDiagram( props: IProps ) {
	const { t } = useTranslation();

	const diagramState = new Diagram();
	diagramState.mode = 'cell';

	return (
		<Body>
			<All>
				<GameTopInterface
					player = { props.player }
					playerStatus = { t("status.filling") }
					enemy = { props.enemy }
					enemyStatus = { t("status.filling") }
					turn = { "local" }
					// leftCorner = {  }
				/>
		
				<GameBottomInterface
					giveUp = { props.back }
				>
					<></>
				</GameBottomInterface>
			</All>

			<div className = { styles["diagram-container"] } >
				<DiagramComponent
					diagram = { diagramState }
					zooming = { true }
					style = { 'ships' }
					className = { styles["diagram"] }
				/>
			</div>
		</Body>	
	);
}