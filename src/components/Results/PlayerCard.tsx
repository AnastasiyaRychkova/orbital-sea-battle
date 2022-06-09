import React from 'react';
import styles from './PlayerCard.module.css';
import texts from '../../style/text.module.css';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../ProgressBar/ProgressBar';

import IProfile from '../../core/game/GameplayEntities/ProfileInterface'

import { periodicTable } from "../../core/game/Services/Chemistry";


// FIXME:
const MAX_PLAYER_POINTS = 500;

interface IProps {
	/** Игрок */
	player: IProfile;

	/** Номер элемента */
	number: number;
}

export default function PlayerCard( props: IProps ) {
	const { t } = useTranslation();

	const element = periodicTable.element( props.number );

	return (
		<div className = { styles["player-result-card"] } >
			<div className = { styles["player-info"] } >
				
				<img
					src = { "/img/aliases/" + props.player.alias.id + ".png" }
					alt = ""
					className = { styles["profile-item-card"] }
				/>
				
				<div className = { styles.name } >
					<span className = { texts["text-bold-T-Medium-custom"] }>
						{ props.player.name }
					</span>

					<span className = { texts["text-reg-T-m-Small"] }>
						{ t( "aliases." + props.player.alias.id ) }
					</span>
				</div>

				<div
					className = { styles["pl-element"] }
					title = { t( "periodic_table." + props.number ) }
				>
					<span className = {
						styles["element__number"] + " " +
						texts["text-bold-T-Small"]
					} >
						{ props.number }
					</span>

					<span className = {
						styles["element__name"] + " " +
						texts["text-bold-T-Medium-custom"]
					} >
						{ element.symbol }
					</span>
				</div>
			</div>

			<div className = { styles["game-progress"] } >
				<div className = { styles["level"] } >
					<span className = { texts["text-bold-T-Normal"] }>
						{ props.player.level }
					</span>
				</div>

				<ProgressBar
					value = { ( 0.5 + props.player.points / MAX_PLAYER_POINTS ) }
					className = { styles["progress-bar"] }
				/>
			</div>
		</div>
	)
}