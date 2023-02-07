import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonWithIcon } from 'components/Button/WithIcon/Button';

import style from './Footer.module.scss';


const Footer = () => {
	const { t } = useTranslation( 'translation', { keyPrefix: 'pages.landing' } );
	return (
		<div className={style.wrap}>
			<div className={style.header}>
				<span className="header-1">Orbital Battleship</span>
				<span className="header-5 bold">
					{t( 'educational' )}
				</span>
			</div>
			<div className={style['background-radar']}>
				<ButtonWithIcon
					className={style['button-location']}
					value={t( 'play' )}
					glyph="play"
					priority="primary"
					to="play"
				/>
			</div>
			<footer className={style['footer-info']}>
				<span className="long-normal">
					{`© 2022 – ${new Date().getFullYear()} ${t( 'footer.copyright' )}`}
				</span>
				<div className={style.links}>
					<a
						className="long-normal"
						href="https://itmo.ru/images/pages/79/Pravila_ispolzovanija_informacii.pdf"
					>
						{t( 'footer.domain' )}
					</a>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
