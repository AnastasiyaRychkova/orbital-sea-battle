import React from 'react';
import styles from './ResultsHeader.module.css';
import texts from '../../style/text.module.css';
import { useTranslation } from 'react-i18next';

import sprite from "../../img/sprite.svg";

interface IProps {
	/** Выиграл ли локальный игрок */
	areYouWinningSon: boolean;
}

export default function ResultsHeader( props: IProps ) {
	const { t } = useTranslation();

	const isWinner = props.areYouWinningSon;

	return (
		<div className = { styles["results-header"] } >
			<svg className = {
				styles["icon-results-decoration"] + " " +
				( isWinner ? styles["local-winner"] : styles["loser"] )
			} >
				<use href = { sprite + "#ship" } />
			</svg>

			<h1 className = {
				texts["headers-bold-h3"] + " " +
				styles["text-style"] + " " +
				styles["results-header"] + " " +
				( isWinner ? styles.win : styles.lose )
			} >
				{ t(
					isWinner
					? "components.mission.passed"
					: "components.mission.failed"
				) }
			</h1>

			<svg className = {
				styles["icon-results-decoration"] + " " +
				( isWinner ? styles["loser"] : styles["enemy-winner"]  )
			} >
				<use
					className = { styles.mirror }
					href = { sprite + "#ship" }
				/>
			</svg>
		</div>
	)
}