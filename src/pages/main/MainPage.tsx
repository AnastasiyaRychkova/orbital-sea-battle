import React from 'react';
import styles from './MainPage.module.css';
import GameName from '../../components/GameName/GameName'
import PrivacyLink from './PrivacyLink'
import MainMenu from './MainMenu';
import GeneralBackground from '../../components/Background/GeneralBackground';

export default function MainPage() {
	return (
		<GeneralBackground>
			<div className={ styles.circle }>
				<div className={ styles.content }>
					<GameName />
					<MainMenu />
					<PrivacyLink />
				</div>
			</div>
		</GeneralBackground>
	);
}