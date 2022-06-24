import React, { FC } from 'react';
import { observer } from 'mobx-react';
import styles from './Interface.module.css';

import TurnInfo, { Turn } from './TurnInfo/TurnInfo';
import AbilityButton from './AbilityButton/AbilityButton';
import FullScreenButton from './FullScreen/FullScreenButton';

import IProfile from '../../core/game/GameplayEntities/ProfileInterface'

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
const GameTopInterface: FC<IGameTopProps> = observer(( props ) => {
	return (
		<div className = { styles.interface } >
			
			<div>
				<AbilityButton onClick = { ()=>{} } />

				<div className = { styles.corner }>
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
});


interface IGameBottomProps {
	children: React.ReactNode;
}

/** Нижняя часть интерфейса */
const GameBottomInterface: FC<IGameBottomProps> = observer(( props ) => {
	return (
		<div className = { styles.bottom }>
			<div className = { styles.menu }>
				{ props.children }
			</div>
		</div>
	);
});


interface IAllProps {
	children: React.ReactNode;
}

/** Обёртка для всех частей игрового интерфейса */
const All: FC<IAllProps> = observer(( props ) => {
	return (
		<div className = { styles.all }>
			{ props.children }
		</div>
	);
})

export {
	GameTopInterface,
	GameBottomInterface,
	All,
}