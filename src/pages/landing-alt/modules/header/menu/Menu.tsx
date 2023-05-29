import React, { FC } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { ButtonWithIcon } from 'components/Button/WithIcon/Button';
import styles from './Menu.module.scss';

interface MenuProps {
	isOpened: boolean;
}

export const Menu: FC<MenuProps> = ( {
	isOpened,
} ) => {
	const { t } = useTranslation( 'translation', { keyPrefix: 'pages.landing' } );

	return (
		<nav
			className={cn(
				styles.menu,
				{[styles.menu_closed]: !isOpened}
			)}
		>
			<ul className={styles.nav}>
				<li>
					<a
						href="#about"
						className={cn( 'button-normal', styles.navLink )}
					>
						{t( 'header.game' )}
					</a>
				</li>
				<li>
					<a
						href="#rules"
						className={cn( 'button-normal', styles.navLink )}
					>
						{t( 'header.rules' )}
					</a>
				</li>
				<li>
					<a
						href="#project"
						className={cn( 'button-normal', styles.navLink )}
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
	);
};
