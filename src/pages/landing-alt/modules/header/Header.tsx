import React, { useState } from 'react';

import { Logo } from 'components/Logo/Logo';
import { Menu } from './menu/Menu';

import { LangSwitcher } from './lang-switcher/LangSwitcher';
import { IconButton } from 'components/Button/IconButton/Button';

import style from './Header.module.scss';


const Header = () => {
	
	const [ isOpened, setIsOpened ] = useState( false );


	return (
		<header className={style.header}>
			<div className={style.logoSection}>
				<a href="#welcome"
					className={style.logo}
				>
					<Logo />
				</a>
				<LangSwitcher />
			</div>
			<Menu isOpened={isOpened} />
			<IconButton
				className={style.burger}
				glyph="menu"
				onClick={() => setIsOpened( ( state ) => !state )}
			/>
		</header>
	);
};

export default Header;
