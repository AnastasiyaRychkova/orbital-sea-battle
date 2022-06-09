import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styles from './Shooting.module.css';
import Body from '../../../components/Body/Body';
import PeriodicTable from '../../../components/PeriodicTableUnit/PeriodicTableUnit';
import Panel from '../../../components/QnInputPanel/Panel';
import DiagramComponent from '../../../components/Diagram/Diagram';
import { GameTopInterface, GameBottomInterface, All } from '../../../components/GameInterface/GameInterface';
import TabSwitcher from '../../../components/TabSwitcher/TabSwitcher';

import type { TabNumber } from '../../../components/TabSwitcher/TabSwitcher';

import type { IGameState } from '../../../core/game/OrbitalBattleship/OB_Entities';
import { useAppPath } from '../../../components/Router/Router';
import Filter from '../../../components/QnInputPanel/Filter';
import UI from '../../../core/browser/UIStore';
import { CellQN } from '../../../core/game/Services/Chemistry';

interface IProps {
	game: IGameState;

	/** Функция для выхода */
	back: () => void;

	/** Функция для угадывания элемента */
	guessElement: (elementNumber: number) => void;

	/** Функция выстрела */
	fireFn: ( cell: CellQN ) => void;
}

/** Игровая страница c тремя вкладками */
const Page: FC<IProps> = observer(( {
	game,
	back,
	guessElement,
	fireFn,
} ) => {
	const { t } = useTranslation();
	const player = game.player;
	const enemy = game.enemy;

	const [tabNumber, swap] = useState<TabNumber>( 2 );
	const state = useAppPath().lastPart;

	return (
		<Body>
			<All>
				<GameTopInterface
					player = { player.user }
					enemy = { enemy.user }
					turn = { state === 'moving' ? 'local' : ( state === 'enemy_waiting' ? 'enemy' : 'none' ) }
					playerStatus = { t( "status." +
						( state === 'moving' ? 'moving' : 'waiting') 
					) }
					enemyStatus = { t( "status." +
						( state === 'enemy' ? 'moving' : 'waiting') 
					) }
				/>

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
			</All>
			
			<div className = {
				styles.tab + " " +
				styles.container + " " +
				( tabNumber === 1 ? "" : styles.closed )
			} >
				
				<DiagramComponent
					diagram = { player.diagram! }
					zooming = { true }
					style = { 'normal' }
					className = { styles["diagram"] }
					/>
				
			</div>

			<div className = {
				styles.tab + " " +
				styles.container + " " +
				( tabNumber === 2 ? "" : styles.closed )
			} >
				<DiagramComponent
					diagram = { enemy.diagram! }
					zooming = { true }
					style = { 'normal' }
					className = { styles["diagram"] }
					/>

				<Filter
					ui={UI}
					diagramState={enemy.diagram!.observableState}
					fireFn={fireFn}
					className={styles.filter}
					/>
			</div>

			
		</Body>

	);
});

export default Page;