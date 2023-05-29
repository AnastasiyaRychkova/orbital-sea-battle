import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonWithIcon } from 'components/Button/WithIcon/Button';

import style from '../Header.module.scss';


export const LangSwitcher = () => {
	const { i18n } = useTranslation();
	return (
		<ButtonWithIcon
		className={style.lang}
			value={i18n.language}
			glyph="world"
			priority="tertiary"
			small
			onClick={() => {
				i18n.changeLanguage( i18n.language !== 'ru' ? 'ru' : 'en' )
			}}
		/>
	);
};
