import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonWithIcon } from 'components/Button/WithIcon/Button';

import style from './WelcomePage.module.scss';


const WelcomePage = () => {
	const { t } = useTranslation( 'translation', { keyPrefix: 'pages.landing' } );

	return (
		<div className={style['welcome-page']}
			id="welcome"
		>
			<img src="img/landing/ship.svg"
				className={style.ship}
				alt=""
			/>
			<div className={style.header}>
				<h1 className="header-1">Orbital Battleship</h1>
				<span className="header-5 bold">
					{t( 'educational' )}
				</span>
			</div>
			<ButtonWithIcon
				className={style.play}
				glyph="play"
				value={t( 'play' )}
				priority="primary"
				to="play"
			/>
		</div>
	);
};

export default WelcomePage;
