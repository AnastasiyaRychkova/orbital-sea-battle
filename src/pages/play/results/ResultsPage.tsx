import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ResultsPage.module.css';
import Body from '../../../components/Body/Body';
import ResultsHeader from '../../../components/Results/ResultsHeader';
import PlayerCard from '../../../components/Results/PlayerCard';
import MiniInfo from '../../../components/MiniInfo/MiniInfo';
import Button from '../../../components/Button/WithIcon/Button';
import FullScreenButton from '../../../components/GameInterface/FullScreen/FullScreenButton';

import { IGameState } from '../../../core/game/OrbitalBattleship/OB_Entities';

interface IProps {
	
	game: IGameState

	/** Функция для реванша */
	rematch: () => void;
}



// FIXME: этим функциям тут не место
// но нужно перевести миллисекунды из GSResults в строку
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
	console.log( "Results:", props.game.result );
	const results = props.game.result!;
	const player = props.game.player.user;
	const enemy = props.game.enemy.user;
	const score = props.game.score;

	const { t } = useTranslation();

	return (
		<Body>
		<div className = { styles.scrollable }>

			<div className = { styles["top-right"] }>
				<FullScreenButton/>
			</div>
			
			<div className = { styles.content }>

				<ResultsHeader areYouWinningSon = {
					results.isLocalPlayerWinner
				} />

				<div className = { styles.box } >
					
					<PlayerCard
						player = { player }
						number = { results.player.elemNumber }
						className = { styles.player }
					/>

					<div className = { styles.stats + " " + styles.left }>
						<MiniInfo
							provider = { results.player.steps }
							glyph = "accuracy"
							caption = { t("labels.shots") }
							orientation = "vertical"
						/>
						
						{/* <MiniInfo
							provider = { results.player.certainty.toFixed(4) }
							glyph = "hit"
							caption = { t("labels.certainty") }
							orientation = "vertical"
						/> */}
					</div>

					<div className = { styles.score } >
						<span className = { "header-1 bold " + styles.glow }>
							{ score.player + ":" + score.enemy }
						</span>

						<div className = { styles.time } >
							<span className = "button-tiny" >
								{ t("labels.time") }
							</span>

							<span className = "text-normal bold" >
								{ timeToString( results.duration ) }
							</span>
						</div>
					</div>

					<PlayerCard
						player = { enemy }
						number = { results.enemy.elemNumber }
						className = { styles.enemy }
					/>

					<div className = { styles.stats + " " + styles.right }>
						<MiniInfo
							provider = { results.enemy.steps }
							glyph = "accuracy"
							caption = { t("labels.shots") }
							orientation = "vertical"
						/>
						
						{/* <MiniInfo
							provider = { results.enemy.certainty.toFixed(4) }
							glyph = "hit"
							caption = { t("labels.certainty") }
							orientation = "vertical"
						/> */}
					</div>

				</div>

				<div className = { styles.actions } >
					<Button
						value = { t("actions.rematch") }
						glyph = { "repeat" }
						priority = {"primary"}
						theme = { "muted" }
						onClick = { props.rematch }
					/>
					<Button
						value = { t("actions.exit") }
						glyph = { "flag" }
						priority = { "secondary" }
						theme = { "dark" }
						to='/'
						replace = { true }
					/>
				</div>
			</div>

		</div>
		</Body>
	);
}