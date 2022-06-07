import React from 'react';
import { useTranslation } from 'react-i18next';
import Body from '../Body/Body';
import PeriodicTable from '../PeriodicTableUnit/PeriodicTableUnit';
import { GameTopInterface, GameBottomInterface } from '../GameInterface/GameInterface';

import IProfile from '../../core/game/GameplayEntities/ProfileInterface'


interface IProps {
	/** Локальный игрок */
	player: IProfile;

	/** Противник */
	enemy: IProfile;

	/** Функция для выхода */
	back: () => void;

	/** Функция для передачи номера выбранного элемента */
	forward: (elementNumber: number) => void;
}

/** Страница с выбором элемента */
export default function ChoosingTable( props: IProps ) {
	const { t } = useTranslation();

	return (
		<Body>
			<GameTopInterface
				player = { props.player }
				playerStatus = { t("status.choosing") }
				enemy = { props.enemy }
				enemyStatus = { t("status.choosing") }
				turn = { "local" }
			/>
		
			<PeriodicTable
				mode = "choosing"
				onSubmit = { props.forward }
			/>

			<GameBottomInterface
				giveUp = { props.back }
			>
			</GameBottomInterface>
		</Body>	
	);
}