import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styles from './Shooting.module.css';
import Body from '../../../components/Body/Body';
import PeriodicTable from '../../../components/PeriodicTableUnit/PeriodicTableUnit';
import Panel from '../../../components/QnInputPanel/Panel';
import DiagramComponent from '../../../components/Diagram/Diagram';
import { GameTopInterface, GameBottomInterface } from '../../../components/GameInterface/GameInterface';
import TabSwitcher from '../../../components/TabSwitcher/TabSwitcher';

import type { TabNumber } from '../../../components/TabSwitcher/TabSwitcher';

import type { OB_IEnemy, OB_ILocalPlayer } from '../../../core/game/OrbitalBattleship/OB_Entities';

interface IProps {
	/** Локальный игрок */
	player: OB_ILocalPlayer;

	/** Противник */
	enemy: OB_IEnemy;

	/** Функция для выхода */
	back: () => void;

	/** Функция для угадывания элемента */
	guessElement: (elementNumber: number) => void;
}

/** Игровая страница c трёмя вкладками */
const Page: FC<IProps> = observer(( {
	player,
	enemy,
	back,
	guessElement,
} ) => {
	const { t } = useTranslation();

	const [tabNumber, swap] = useState<TabNumber>( 2 );

	return (
		<Body>
			
			<GameTopInterface
				player = { player.user }
				enemy = { enemy.user }
				// FIXME:
				turn = { "local" }
				playerStatus = { t("status.choosing") }
				enemyStatus = { t("status.choosing") }
			/>
		
			<div className = {
				styles.tab + " " +
				( tabNumber === 1 ? "" : styles.closed )
			} >
				
				<h1>TAB1</h1>
				
			</div>

			<div className = {
				styles.tab + " " +
				( tabNumber === 2 ? "" : styles.closed )
			} >
				
				<h2>TAB2</h2>
				
			</div>

			<div className = {
				styles.tab + " " +
				( tabNumber === 3 ? "" : styles.closed )
			} >
				<PeriodicTable
					mode = "guessing"
					onSubmit = { guessElement }
				/>
			</div>
			
			<GameBottomInterface
				giveUp = { back }
			>
				<TabSwitcher
					tabNumber = { tabNumber }
					change = { swap }
				/>
			</GameBottomInterface>
		</Body>	
	);
});

export default Page;