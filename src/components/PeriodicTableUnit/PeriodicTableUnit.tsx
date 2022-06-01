import React, { FC } from 'react';
// import { useTranslation } from 'react-i18next';
import styles from './PeriodicTable.module.css';

import { periodicTable } from '../../core/game/Services/Chemistry';

import useElement from './useElement';
import { SelectedElement } from './SelectedElement';
import { Cell, EmptyCell, PeriodCell, GroupCell, SeriesCell } from './Cells';
import { SelectButton } from './SelectButton';

/** Режим работы таблицы: выбор элемента или угадывание */
export type TableMode = 'choosing' | 'guessing';

interface IProps
{
	/** Режим таблицы */
	mode?: TableMode;

	/** Функция по нажатию (для передачи номера выбранного элемента) */
	onClick: (elementNumber: number) => void,
}

/** Модуль периодической таблицы с выбором элемента */
const PeriodicTableUnit: FC<IProps> = ( {
	mode = "choosing",
	onClick
} ) => {
	// const { t } = useTranslation();

	const [element, select] = useElement();

	const cells = [];
	let key = 0; // Each child in a list should have a unique "key" prop

	let n = 1;

	const addElement = () => {
		cells.push(
			<Cell
				number = { n }
				symbol = { periodicTable.element(n).symbol }
				onClick = { select.bind(null, n++) }
				key = { key++ } 
			/>
		);
	}
	
	const addEmpty = () => {
		cells.push( <EmptyCell key={key++} /> );
	}

	const LA = 57;
	const AC = 89;

	// нулевая строка
	addEmpty();
	cells.push( <GroupCell number={1} isTop={true} key={key++} /> );
	for ( let i = 0; i < 9; i++ )
		addEmpty();
	cells.push( <GroupCell number={18} isTop={true} key={key++} /> );
	
	// первая строка
	cells.push( <PeriodCell number={1} key={key++} /> );
	addElement();
	cells.push( <GroupCell number={2} key={key++} /> );
	addEmpty();
	addEmpty();
	cells.push(
		<SelectedElement
			key = { key++ }
			mode = { mode }
			number = { element }
		/>
	);
	addEmpty();
	for ( let i = 13; i < 18; i++ )
		cells.push( <GroupCell number={i} key={key++} /> );
	addElement();

	// 2-я строка
	cells.push( <PeriodCell number={2} key={key++} /> );
	addElement();
	addElement();
	for ( let i = 3; i < 13; i++ )
		addEmpty();
	for ( let i = 13; i < 19; i++ )
		addElement();
	
	// 3-я строка
	cells.push( <PeriodCell number={3} key={key++} /> );
	addElement();
	addElement();
	for ( let i = 3; i < 13; i++ )
		cells.push( <GroupCell number={i} key={key++} /> );
	for ( let i = 13; i < 19; i++ )
		addElement();

	// 4-я и 5-я
	for ( let p = 4; p < 6; p++ )
	{
		cells.push( <PeriodCell number={p} key={key++} /> );
		for ( let i = 1; i < 19; i++ )
			addElement();
	}

	// 6-я и 7-я
	for ( let p = 6; p < 8; p++ )
	{
		cells.push( <PeriodCell number={p} key={key++} /> );
		for ( let g = 1; g < 19; g++ )
		{
			if ( n === LA || n === AC )
			{
				cells.push( 
					<SeriesCell
						start={ n }
						finish={ n+=14 }
						key={key++}
					/>
				)
				n++;
			}
			else
			{
				addElement();
			}
		}
	}

	cells.push( <div className={ styles.gap } key={key++}></div> );

	// 8-я и 9-я
	for ( let p = 8; p < 10; p++ )
	{
		addEmpty();
		addEmpty();
		addEmpty();
		n = (p === 8) ? LA : AC;
		for ( let i = 0; i < 15; i++ )
		{
			addElement();
		}
		addEmpty();
	}

	return (
		<>
			<div className={ styles["container-table"] }>
				{ cells }
			</div>
			<div className={ styles["interface-bottom"] }>
				<SelectButton
					mode = { mode }
					onClick = { () => {
							if ( element != 0 )
								onClick( element );
						}
					}
				/>
			</div>
		</>
	);
}

export default PeriodicTableUnit;