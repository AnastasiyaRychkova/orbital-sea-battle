import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styles from './Shooting.module.css';
import PeriodicTable from '../../../components/PeriodicTableUnit/PeriodicTableUnit';
import useElement from '../../../components/PeriodicTableUnit/useElement';
import SelectedElementMobile from '../../../components/PeriodicTableUnit/SelectedElementMobile';
import DiagramComponent from '../../../components/Diagram/Diagram';
import { GameTopInterface, GameBottomInterface, All } from '../../../components/GameInterface/GameInterface';
import DropSidedInfo from '../../../components/DropSidedInfo/DropSidedInfo';
import MiniInfo from '../../../components/MiniInfo/MiniInfo';
import GiveUpButton from '../../../components/GameInterface/GiveUp/GiveUpButton';
import TabSwitcher from '../../../components/TabSwitcher/TabSwitcher';
import type { TabNumber } from '../../../components/TabSwitcher/TabSwitcher';
import Filter from '../../../components/QnInputPanel/Filter';
import UI from '../../../core/browser/UIStore';

import type { IGameState } from '../../../core/game/OrbitalBattleship/OB_Entities';
import { useAppPath } from '../../../components/Router/Router';
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

	const [number, select] = useElement();

	return (
		<div className = { styles.box } >
			<div className = {
				styles.tab + " " +
				styles.container + " " +
				( tabNumber === 1 ? styles.normal : styles.prev )
			} >
				<DiagramComponent
					diagram = { player.diagram! }
					zooming = { true }
					mode = { 'ships' }
					className = { styles["diagram"] }
					/>	
			</div>

			<div className = {
				styles.tab + " " +
				styles.container + " " +
				( tabNumber === 2
					? styles.normal
					: ( ( tabNumber === 1 ) ? styles.next : styles.prev )
				)
			} >
				<DiagramComponent
					diagram = { enemy.diagram! }
					zooming = { true }
					mode = { 'normal' }
					className = { styles["diagram"] }
					/>

				<Filter
					ui={UI}
					diagramState={enemy.diagram!.observableState}
					fireFn={fireFn}
					className={styles.filter}
					/>
			</div>

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

					cornerElements = {<>
						<DropSidedInfo
							message = { t("info.shooting." + tabNumber + ".m") }
							comment = { t("info.shooting." + tabNumber + ".c") }
							link={{
								text: t( 'pages.landing.rules.action' ),
								to: "/rules"
							}}
						/>

						<SelectedElementMobile 
							number = { number }
							className = { (tabNumber === 3 ? "" : styles.closed) }
						/>
					</>}
					
					// leftElements = {<>
					// 	<MiniInfo
					// 		provider = { "00:00" }
					// 		glyph = "clock"
					// 		hasShadow = { true }
					// 	/>
					// 	<MiniInfo
					// 		provider = { "1" }
					// 		glyph = "diagram"
					// 		caption = { "ход" }
					// 		// caption = { t("labels.shots") }
					// 		hasShadow = { true }
					// 	/>
					// </>}

					// rightElements = {<>
					// 	<MiniInfo
					// 		provider = { "? / 118" }
					// 		glyph = "accuracy"
					// 		caption = { "подходит" }
					// 		hasShadow = { true }
					// 	/>
					// </>}
				/>

				<div className = {
					styles.tab + " " +
					styles.relative + " " +
					( tabNumber === 3 ? styles.normal : styles.next )
				} >
					<PeriodicTable
						mode = "guessing"
						use = { [number, select] }
						onSubmit = { guessElement }
					/>
				</div>

				<GameBottomInterface>
					<GiveUpButton onClick = { back } />
					<TabSwitcher
						tabNumber = { tabNumber }
						change = { swap }
					/>
				</GameBottomInterface>

			</All>
		</div>

	);
});

export default Page;