import React from 'react';
import { useTranslation } from 'react-i18next';
import Body from '../../../components/Body/Body';
import PeriodicTable from '../../../components/PeriodicTableUnit/PeriodicTableUnit';
import SelectedElementMobile from '../../../components/PeriodicTableUnit/SelectedElementMobile';
import { GameTopInterface, GameBottomInterface } from '../../../components/GameInterface/GameInterface';
import DropSidedInfo from '../../../components/DropSidedInfo/DropSidedInfo';

import IProfile from '../../../core/game/GameplayEntities/ProfileInterface'
import useElement from '../../../components/PeriodicTableUnit/useElement';


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

	const [number, select] = useElement();

	return (
		<Body>
			<GameTopInterface
				player = { props.player }
				playerStatus = { t("status.choosing") }
				enemy = { props.enemy }
				enemyStatus = { t("status.choosing") }
				turn = { 'none' }
				cornerElements = {
					<>
						<DropSidedInfo
							message = { t("info.selecting.m") }
							comment = { t("info.selecting.c") }
						/>

						<SelectedElementMobile number = { number } />
					</>
				}
			/>
		
			<PeriodicTable
				mode = "choosing"
				use = { [number, select] }
				onSubmit = { props.forward }	
			/>

			<GameBottomInterface>
			</GameBottomInterface>
		</Body>	
	);
}