import React from 'react';
import { observer } from 'mobx-react';
import styles from './SelectedElementMobile.module.css';

import { periodicTable } from "../../core/game/Services/Chemistry";

interface IProps
{
	/** Выбранный элемент */
	number: number;

	/** Стили, переданные родителем */
	className?: string,
}

/** Минимальный блок с отображением символа выбранного элемента */
const SelectedElementMobile = observer(( props: IProps ) => {

	if ( props.number === 0 )
		return null;
	const symbol = periodicTable.element( props.number ).symbol;
	
	return (
		<div className = {
			styles.block + " " +
			styles.closed + " " +
			( props.className !== undefined ? props.className : "" )
		}>
			<span className = { styles.symbol } >
				{ symbol }
			</span>
		</div>
	);
});

export default SelectedElementMobile;