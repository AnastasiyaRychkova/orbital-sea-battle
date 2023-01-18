import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Logo } from 'components/Logo/Logo';
import { ButtonWithIcon } from 'components/Button/WithIcon/Button';
import { IconButton } from 'components/Button/IconButton/Button';

import style from './Header.module.scss';


const Header = () => {
	const { t } = useTranslation( 'translation', { keyPrefix: 'pages.landing' } );
	return (
		<header className={style.header}>
			<a href="#welcome"
				className={style.logo}
			>
				<Logo />
			</a>
			<nav>
				<ul className={style.nav}>
					<li>
						<a
							href="#about"
							className={cn(
								'button-normal',
								style.navLink,
							)}
						>
							{t( 'header.game' )}
						</a>
					</li>
					<li>
						<a href="#rules"
							className={cn( 'button-normal', style.navLink )}
						>
							{t( 'header.rules' )}
						</a>
					</li>
					<li>
						<a href="#project"
							className={cn( 'button-normal', style.navLink )}
						>
							{t( 'header.project' )}
						</a>
					</li>
					<li>
						<ButtonWithIcon
							value={t( 'play' )}
							glyph="play"
							priority="secondary"
							small
							to="play"
						/>
					</li>
				</ul>
			</nav>
			<IconButton
				className={style.burger}
				glyph="menu"
			/>
		</header>
	);
};

export default Header;
