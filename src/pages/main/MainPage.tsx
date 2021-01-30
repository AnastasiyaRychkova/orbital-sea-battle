import React from 'react';
import styles from './MainPage.module.css';
import GameName from '../../components/GameName/GameName'
import MenuButton from '../../components/MenuButton/MenuButton'
import MenuButtonDisabled from '../../components/MenuButton/MenuButtonDisabled'
import PrivacyLink from './PrivacyLink'

export default function MainPage() {
	return (
		<div className={ styles.background }>
			<div className={ styles.circle }>
				<div className={ styles.content }>
					<GameName />
					<nav className={ styles.menu }>
						<div className={ styles.column }>
							<MenuButtonDisabled path="/game" text="ИГРАТЬ"/>
							<MenuButton path="/training" text="ТРЕНИРОВКА"/>
							<MenuButtonDisabled path="/about" text="О ПРОЕКТЕ"/>
							<MenuButtonDisabled path="/rules" text="ПРАВИЛА"/>
							<MenuButton path="/theory" text="ТЕОРИЯ"/>
						</div>
					</nav>
					<PrivacyLink />
				</div>
			</div>
		</div>
	);
}