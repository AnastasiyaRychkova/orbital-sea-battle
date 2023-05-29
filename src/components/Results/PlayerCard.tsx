import React from 'react';
import styles from './PlayerCard.module.css';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../ProgressBar/ProgressBar';

import IProfile from '../../core/game/GameplayEntities/ProfileInterface';

import { periodicTable } from '../../core/game/Services/Chemistry';

interface IProps {
	/** Игрок */
	player: IProfile;

	/** Номер элемента */
	number: number;

	/** Стили, переданные родителями */
	className?: string;
}

export default function PlayerCard(props: IProps) {
	const { t } = useTranslation();

	const element = periodicTable.element(props.number);

	return (
		<div className={styles.card + ' ' + props.className}>
			<div className={styles.player}>
				<img
					src={'/img/aliases/' + props.player.alias.id + '.png'}
					alt=""
					className={styles.pic}
				/>

				<div className={styles.name}>
					<span className="text-medium bold">
						{props.player.name}
					</span>

					<span className="text-small">
						{t('aliases.' + props.player.alias.id)}
					</span>
				</div>

				<div
					className={styles.element}
					title={t('periodic_table.' + props.number)}
				>
					<span className="text-small bold">{props.number}</span>

					<span
						className={styles.element__name + ' text-medium bold'}
					>
						{element.symbol}
					</span>
				</div>
			</div>
		</div>
	);
}
