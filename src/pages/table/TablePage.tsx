import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TablePage.module.css';
import PeriodicTable from '../../components/PeriodicTableUnit/PeriodicTableUnit';
import Instruction from '../../components/Instruction/Instruction';

export default function TablePage() {
	const { t } = useTranslation();
	
	function choose( n: number )
	{
		console.log( "choose", n );
	}

	function guess( n: number )
	{
		console.log( "guess", n );
	}

	return (
		<div className={ styles.body2 } >
			{/* <Instruction message="Hello world" onClick={ ()=>{} } /> */}
			
			<PeriodicTable mode="choosing" onClick={ choose } />

			{/* <PeriodicTable mode="guessing" onClick={ guess } /> */}
		</div>
	);
}