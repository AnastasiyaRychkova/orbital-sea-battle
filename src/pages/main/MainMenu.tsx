import React from 'react';
import styles from './MainMenu.module.css';
import MenuButton from '../../components/MenuButton/MenuButton'
import MenuButtonDisabled from '../../components/MenuButton/MenuButtonDisabled'

function MainMenu()
{
	return (
		<nav className={ styles.menu }>
			<div className={ styles.column }>
				<MenuButtonDisabled path="/game" text="Play"/>
				<MenuButton path="/training" text="Training"/>
				<MenuButtonDisabled path="/about" text="About"/>
				<MenuButtonDisabled path="/rules" text="Rules"/>
				<MenuButton path="/theory" text="Theory"/>
				<MenuButtonDisabled path="/diagram" text="Diagram"/>
			</div>
		</nav>
	);
}


export default MainMenu;