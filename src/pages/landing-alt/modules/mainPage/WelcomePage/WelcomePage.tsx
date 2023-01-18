import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { ButtonWithIcon } from 'components/Button/WithIcon/Button';
import { IconButton } from 'components/Button/IconButton/Button';

import imgPlayVideo from '../../../img/common/play-video.svg';
import imgShip from '../../../img/mainPage/ship.svg';
import style from './WelcomePage.module.scss';
import styleButton from '../../buttons/Button.module.scss';


const WelcomePage = () => {
	const { t } = useTranslation( 'translation', { keyPrefix: 'pages.landing' } );

	return (
		<div className={style['welcome-page']}
			id="welcome"
		>
			<div className={style.header}>
				<h1 className="header-1">Orbital Battleship</h1>
				<span className="header-5 bold">
					{t( 'educational' )}
				</span>
			</div>
			<div className={style.content}>
				<img src={imgShip}
					className={cn( style.ship, style.left )}
					alt=""
				/>
				<img src={imgShip}
					className={cn( style.ship, style.right )}
					alt=""
				/>
				<div className={style.video}>
					<button className={styleButton['button-icon']}>
						<img
							src={imgPlayVideo}
							className={cn( style['play-video'] )}
							alt=""
						/>
					</button>
				</div>
				<ButtonWithIcon

					glyph="play"
					value={t( 'play' )}
					priority="primary"
				/>
			</div>
			<IconButton
				glyph="scroll"
			/>
		</div>
	);
};

export default WelcomePage;
