import React from 'react';
import styles from './GameInterface.module.css';

import IProfile from '../../core/game/GameplayEntities/ProfileInterface'

import TurnInfo, { Turn } from './TurnInfo';
import AbilityButton from './AbilityButton/AbilityButton';
import FullScreenButton from './FullScreen/FullScreenButton';
import GiveUpButton from './GiveUp/GiveUpButton';

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

	/** Элементы в левом углу */
	leftCorner?: React.ReactNode;
}

/** Верхняя часть игрового интерфейса */
export function GameTopInterface( props: IGameTopProps ) {
	return (
		<div className = { styles.interface } >
			
			<div>
				<AbilityButton onClick = { ()=>{} } />

				<div className = {
						styles["interface__function__info"]
						+ " " +
						styles["interface__function-big-gap"]
					}
				>
					{ props.leftCorner }
				</div>
				
			</div>

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


interface IGameBottomProps {
	/** Функция для выхода */
	giveUp: () => void,

	children: React.ReactNode;
}

/** Нижняя часть интерфейса с кнопкой "Сдаться" */
export function GameBottomInterface( props: IGameBottomProps ) {
	return (
		<div className = { styles["bottom-control-panel"] } >
			<div className = { styles["default-menu-left-center-right"] } >

				<GiveUpButton onClick = { props.giveUp } />
		
				{ props.children }
			
			</div>
		</div>
	);
}


interface IAllProps {
	children: React.ReactNode;
}

export function All( props: IAllProps ) {
	return (
		<div className={ styles["all-interface"] } >
			{ props.children }
		</div>
	);
}