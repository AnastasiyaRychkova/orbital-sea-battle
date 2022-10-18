import React from 'react';
import styles from './ResultsHeader.module.css';
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
		<div className = { styles.container } >

			<svg className = {
				styles.icon + " " +
				( isWinner ? styles.win : styles.none)
			} >
				<use href = { sprite + "#ship" } />
			</svg>

			<h1 className = {
				styles.container +
				" header-3 bold " +
				( isWinner ? styles.win : styles.lose )
			} >
				{ t(
					isWinner
					? "components.mission.passed"
					: "components.mission.failed"
				) }
			</h1>

			<svg className = {
				styles.icon + " " +
				( isWinner ? styles.none : styles.lose)
			} >
				<use
					className = { styles.mirror }
					href = { sprite + "#ship" }
				/>
			</svg>
		</div>
	)
}