import React from 'react';
import styles from './GameName.module.css';

export default function GameName()  {
	return (
		<>
			<h1 className={ styles.name }>
				<span className={ styles.name_orbital }>
					ORBITAL
				</span> 
				<span className={ styles.name_battleship}>
					BATTLESHIP
				</span>
			</h1>
		</>
	);
}