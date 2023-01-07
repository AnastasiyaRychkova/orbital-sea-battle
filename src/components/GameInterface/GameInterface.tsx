import React, { FC } from 'react';
import { observer } from 'mobx-react';
import styles from './Interface.module.css';

import TurnInfo, { Turn } from './TurnInfo/TurnInfo';
import AbilityButton from './AbilityButton/AbilityButton';
import FullScreenButton from './FullScreen/FullScreenButton';

import IProfile from '../../core/game/GameplayEntities/ProfileInterface';

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

	/** Элементы в левом верхнем углу */
	cornerElements?: React.ReactNode;

	/** Информационный блок слева */
	leftElements?: React.ReactNode;

	/** Информационный блок справа */
	rightElements?: React.ReactNode;
}



/** Верхняя часть игрового интерфейса */
const GameTopInterface: FC<IGameTopProps> = observer( ( props ) => {
	return (
		<div className={styles.interface}>
			<div>
				<AbilityButton onClick={() => { }} />

				<div className={styles.corner}>
					{props.cornerElements}

					{( props.leftElements !== undefined ||
						props.rightElements !== undefined ) && (
							<div className={styles['info-corner']}>
								{props.rightElements}
								{props.leftElements}
							</div>
						)}
				</div>
			</div>

			{props.leftElements !== undefined && (
				<div className={styles.info}>{props.leftElements}</div>
			)}

			<TurnInfo
				player={props.player}
				enemy={props.enemy}
				playerStatus={props.playerStatus}
				enemyStatus={props.enemyStatus}
				turn={props.turn}
			/>

			{props.rightElements !== undefined && (
				<div className={styles.info}>{props.rightElements}</div>
			)}

			<FullScreenButton />
		</div>
	);
} );



interface IGameBottomProps {
	children: React.ReactNode;
}

/** Нижняя часть интерфейса */
const GameBottomInterface: FC<IGameBottomProps> = observer( ( props ) => {
	return (
		<div className={styles.bottom}>
			<div className={styles.menu}>{props.children}</div>
		</div>
	);
} );

interface IAllProps {
	children: React.ReactNode;
}

/** Обёртка для всех частей игрового интерфейса */
const All: FC<IAllProps> = observer( ( props ) => {
	return <div className={styles.all}>{props.children}</div>;
} );

export { GameTopInterface, GameBottomInterface, All };
