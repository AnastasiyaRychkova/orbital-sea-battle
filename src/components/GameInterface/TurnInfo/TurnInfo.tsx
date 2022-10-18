import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TurnInfo.module.css';

import spLocal from '../../../img/components/sputnik-local.svg';
import spEnemy from '../../../img/components/sputnik-enemy.svg';
import spNone from '../../../img/components/sputnik-none.svg';

import IProfile from '../../../core/game/GameplayEntities/ProfileInterface'

/** Чей сейчас ход: ничей / свой / чужой */
export type Turn = 'none' | 'local' | 'enemy';


interface ITurnProps {
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

interface IPlayerProps {
	/** Имя */
	name: string;

	/** Статус текущего хода */
	isActive: boolean;

	/** ID для аватара/псевдонима */
	alias: any;

	/** Текущее действие */
	status: string;

	/** Является ли блоком соперника */
	isOpponent?: boolean;
}

/** Блок с информацией об одном игроке */
const PlayerInfo: FC<IPlayerProps> = ( {
	name,
	isActive,
	alias,
	status,
	isOpponent = false
} ) => {
	const { t } = useTranslation();

	return (
		<div className = {
			styles.player + " " +
			( isActive ? styles["player-active"] : "" )
		} >
			<img
				className = {
					styles.avatar + " " +
					( isActive
					? ( isOpponent
						? styles["avatar-opponent"]
						: styles["avatar-active"]
					) : "" )
				}
				alt = { t( "aliases." + alias.id ) }
				src = { "/img/aliases/" + alias.id + ".png" }
			/>

			<div className = { styles.info } >		
				<span className = {
					styles.name +
					" text-small bold " + 
					( isActive
					? ( isOpponent
						? styles["text-offline"]
						: styles["text-online"]
					) : "" )
				} >
					{ name }
				</span>
				
				<span className = { styles.status } >
					{ status }
				</span>
			</div>
		</div>
	);
}

export default function TurnInfo( props: ITurnProps ) {
	return (
		<div className = { styles.players } >
				<PlayerInfo
					name = { props.player.name }
					isActive = { props.turn === "local" }
					alias = { props.player.alias }
					status = { props.playerStatus }
				/>

				<img
					className = { styles["sputnik-img"] }
					alt = ""
					src = {
						(props.turn === "none")
						? spNone
						: ( props.turn === "enemy" ? spEnemy : spLocal )
					}
				/>

				<PlayerInfo
					name = { props.enemy.name }
					isActive = { props.turn === "enemy" }
					alias = { props.enemy.alias }
					status = { props.enemyStatus }
					isOpponent = { true }
				/>
		</div>
	);
}
