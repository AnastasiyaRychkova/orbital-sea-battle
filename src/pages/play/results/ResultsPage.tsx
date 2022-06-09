import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ResultsPage.module.css';
import texts from '../../../style/text.module.css';
import Body from '../../../components/Body/Body';
import ResultsHeader from '../../../components/Results/ResultsHeader';
import PlayerCard from '../../../components/Results/PlayerCard';
import MiniInfo from '../../../components/MiniInfo/MiniInfo';
import Button from '../../../components/Button/Default/Button';
import FullScreenButton from '../../../components/GameInterface/FullScreen/FullScreenButton';

import IProfile from '../../../core/game/GameplayEntities/ProfileInterface'
import { GSResults } from '../../../core/game/OrbitalBattleship/interfaces/OB_GameStateInterface'
import { GameScore } from '../../../core/game/OrbitalBattleship/types'

interface IProps {
	/** Локальный игрок */
	player: IProfile;

	/** Противник */
	enemy: IProfile;

	/** Результаты игры */
	results: GSResults;

	/** Общий счёт */
	score: GameScore ;

	/** Функция для выхода */
	exit: () => void;

	/** Функция для реванша */
	rematch: () => void;
}



// FIXME: этим функциям тут не место
// но нужно перевести милисекунды из GSResults в строку
function _2digit( value: number ): string
{
	return (value >= 10 ? '' : '0') + Math.floor( value ).toString();
}
function timeToString( time: number ): string
{
	return `${_2digit( time / 3600000 % 60 )}:${_2digit( time / 60000 % 60 )}:${_2digit(time / 1000 % 60)}`;
}



/** Страница с результатами игры */
export default function ResultsPage( props: IProps ) {
	const { t } = useTranslation();

	return (
		<Body>
			<div className = { styles["position-top-right"] }>
				<FullScreenButton/>
			</div>
			
			<div className = { styles["results-content"] } >

				<ResultsHeader areYouWinningSon = {
					props.results.isLocalPlayerWinner
				} />

				<div className = { styles["game-results"] } >
					<div className = { styles["player"] } >
						<PlayerCard
							player = { props.player }
							number = { props.results.player.elemNumber }
						/>

						<div className = { styles.statistics } >
							<MiniInfo
								provider = { props.results.player.steps }
								glyph = "accuracy"
								caption = { t("labels.shots") }
							/>
							<MiniInfo
								provider = { props.results.player.certainty }
								glyph = "hit"
								caption = { t("labels.certainty") }
							/>
						</div>
					</div>

					<div className = { styles.result } >
						<span className = {
							texts["headers-bold-h1"] + " " +
							styles["text-style"]
						} >
							{ props.score.player + ":" + props.score.enemy }
						</span>

						<div className = { styles["result-time"] } >
							<span className = { texts["text-button-B-Tiny"] } >
								{ t("labels.time") }
							</span>

							<span className = { texts["text-bold-T-Normal"] } >
								{ timeToString( props.results.duration ) }
							</span>
						</div>
					</div>

					<div className = { styles.player } >
						<PlayerCard
							player = { props.enemy }
							number = { props.results.enemy.elemNumber }
						/>
						
						<div className = {
							styles["statistics"] + " " +
							styles["st-right"]
						} >
							<MiniInfo
								provider = { props.results.enemy.steps }
								glyph = "accuracy"
								caption = { t("labels.shots") }
							/>
							<MiniInfo
								provider = { props.results.enemy.certainty }
								glyph = "hit"
								caption = { t("labels.certainty") }
							/>
						</div>
					</div>
				</div>

				<div className = { styles.actions } >
					<Button
						value = { t("actions.rematch") }
						priority = { "primary" }
						onClick = { props.rematch }
					/>
					<Button
						value = { t("actions.giveup") }
						priority = { "secondary" }
						onClick = { props.exit }
					/>
				</div>
			</div>
		</Body>	
	);
}