import React from 'react';
// import { useTranslation } from 'react-i18next';
import styles from './GameInterface.module.css';

import IProfile from '../../core/game/GameplayEntities/ProfileInterface'

import FullScreenButton from './FullScreenButton';
import TurnInfo, { Turn } from './TurnInfo';

interface IGameTopProps {
	/** Локальный игрок */
	player: IProfile;

	/** Противник */
	enemy: IProfile;

	/** Текущее действие игрока строкой */
	playerStatus: string;

	/** Текущее действие противника строкой */
	enemyStatus: string;

	/** Чей сейчас ход: ничей 'none', игрока 'local' или противника 'enemy' */
	turn: Turn;
}

export function GameTopInterface( props: IGameTopProps ) {
	return (
		<div className = { styles.interface } >
			
			<div></div>

			<TurnInfo
				player = { props.player }
				enemy = { props.enemy }
				playerStatus = { props.playerStatus }
				enemyStatus = { props.enemyStatus }
				turn = { props.turn }
			/>

			<FullScreenButton />

		</div>
	);
}