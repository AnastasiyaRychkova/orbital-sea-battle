import React, { useState } from 'react';

import { Logo } from 'components/Logo/Logo';
import { Menu } from './menu/Menu';

import { IconButton } from 'components/Button/IconButton/Button';

import style from './Header.module.scss';


const Header = () => {
	
	const [ isOpened, setIsOpened ] = useState( false );


	return (
		<header className={style.header}>
			<a href="#welcome"
				className={style.logo}
			>
				<Logo />
			</a>
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
