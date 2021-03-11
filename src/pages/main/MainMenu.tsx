import React from 'react';
import styles from './MainMenu.module.css';
import MenuButton from '../../components/MenuButton/MenuButton'
import MenuButtonDisabled from '../../components/MenuButton/MenuButtonDisabled'

function MainMenu()
{
	return (
		<nav className={ styles.menu }>
			<div className={ styles.column }>
				<MenuButtonDisabled path="/game" >Play</MenuButtonDisabled>
				<MenuButton path="/training" >Training</MenuButton>
				<MenuButtonDisabled path="/about" >About</MenuButtonDisabled>
				<MenuButtonDisabled path="/rules" >Rules</MenuButtonDisabled>
				<MenuButton path="/theory" >Theory</MenuButton>
				<MenuButton path="/diagram" >Diagram</MenuButton>
			</div>
		</nav>
	);
}


export default MainMenu;