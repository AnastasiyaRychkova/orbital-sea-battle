import React, { FC } from 'react';
import styles from './GameInterface.module.css';
import texts from '../../style/text.module.css';
// import icons from '../../style/icons.module.css';
// import sprite  from "../../img/sprite.svg";
import spLocal from '../../img/components/sputnik-local.svg';
import spEnemy from '../../img/components/sputnik-enemy.svg';
import spNone from '../../img/components/sputnik-none.svg';

import IProfile from '../../core/game/GameplayEntities/ProfileInterface'
// import { AliasId } from '../../core/game/Aliases'

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
	return (
		<div className = {
			styles.player + " " +
			( isActive ? styles["player-active"] : "" )
		} >
			<img
				className = {
					styles.player__avatar + " " +
					( isActive
					? ( isOpponent
						? styles["player__avatar-opponent"]
						: styles["player__avatar-active"]
					)
					: "" )
				} 
				src = { "/img/aliases/" + alias.id + ".png" }
			/>

			<div className = { styles.player__info } >		
				<span className = {
					texts["text-bold-T-Small"]
					+ " " +
					texts["truncate-text"]
					+ " " +
					( isActive
					? ( isOpponent
						? styles["text-offline"]
						: styles["text-online"]
					)
					: "" )
				} >
					{ name }
				</span>
				
				<div className = { styles.player__info__status }>
					<span className = { texts["text-bold-T-Tiny"] } >
						{ status }
					</span>
				</div>
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
