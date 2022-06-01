import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SelectButton.module.css';
import texts from '../../style/text.module.css';
import cn from '../className';

import { TableMode } from "./PeriodicTableUnit";

interface IProps
{
	/** Режим таблицы */
	mode: TableMode;

	/** Функция по нажатию */
	onClick: () => void,
}

/** Кнопка для выбора элемента в таблице */
export const SelectButton = ( props: IProps ) => {
	const { t } = useTranslation();

	return (
		<button
			className = { 
				cn( styles, ["button-primary", "button-select-element"] ) + " "
				+ cn( texts, ["text-button-B-Medium"] )
			}
			onClick = { props.onClick }
		>
			{
				t( (props.mode === "choosing")
					? "components.table.choose"
					: "components.table.guess"
				)
			}
		</button>
	);
};