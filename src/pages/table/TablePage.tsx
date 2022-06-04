import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TablePage.module.css';
import PeriodicTable from '../../components/PeriodicTableUnit/PeriodicTableUnit';
import Instruction from '../../components/Instruction/Instruction';

import Profile from '../../core/game/GameplayEntities/Profile'

import { GameTopInterface } from '../../components/GameInterface/GameInterface';

export default function TablePage() {
	const { t } = useTranslation();
	
	function guess( n: number )
	{
		console.log( n );
	}

	const tempA = new Profile( {
		name: "Иван Иванов",
	} )

	const tempB = new Profile( {
		name: "Дроид",
		aliasId: "_ai",	
	} )

	return (
		<div className={ styles.body2 } >

			{/* <Instruction message="Для начала нужно выбрать план погрузки" onClick={ ()=>{} } /> */}

			<GameTopInterface
				player = { tempA }
				playerStatus = { "ходит" }
				enemy = { tempB }
				enemyStatus = { "ожидает" }
				turn = { "local" }
			/>
			
			<PeriodicTable
				// mode = "guessing"
				onSubmit = { guess }
				// exceptions = { true }
				// disabledElements = { [] }
			/>

		</div>
	);
}