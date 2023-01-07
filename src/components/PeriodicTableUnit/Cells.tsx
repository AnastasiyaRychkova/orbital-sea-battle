import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from '../className';
import styles from './PeriodicTable.module.css';



/** Пустая ячейка */
export function EmptyCell() {
	return <div className={styles.cell}></div>;
}



interface IPeriodProps {
	/** Номер периода */
	number: number;
}

/** Ячейка с номером периода */
export const PeriodCell: FC<IPeriodProps> = ({ number }) => {
	return (
		<div className={cn(styles, ['cell', 'period'])}>
			<span className="text-small bold">{number}</span>
		</div>
	);
};



interface IGroupProps {
	/** Номер группы */
	number: number;

	/** Нужен ли класс top */
	isTop?: boolean;
}

/** Ячейка с номером группы */
export const GroupCell: FC<IGroupProps> = ({ number, isTop = false }) => {
	return (
		<div
			className={cn(styles, ['cell', 'group', isTop ? 'top' : undefined])}
		>
			<span className="text-small bold">{number}</span>
		</div>
	);
};



interface ISeriesProps {
	/** Старт номеров семейства */
	start: number;

	/** Конец */
	finish: number;
}

/** Ячейка для обозначения номеров элементов из одного семейства */
export const SeriesCell: FC<ISeriesProps> = ({ start, finish }) => {
	return (
		<div className={cn(styles, ['cell', 'series', 'border'])}>
			<span className={styles.element__number + ' text-small bold'}>
				{start + '-' + finish}
			</span>
		</div>
	);
};



interface ICellProps {
	/** Номер элемента */
	number: number;

	/** Обозначение элемента */
	symbol: string;

	/** Функция по нажатию */
	onClick?: () => void;

	/** Выбран ли данный элемент */
	isSelected?: boolean;

	/** Отключена ли возможность выбора данного элемента */
	isDisabled?: boolean;

	/** Является ли исключением */
	exception?: boolean;
}

/** Ячейка с химическим элементом */
export const Cell: FC<ICellProps> = ({
	number,
	symbol,
	onClick,
	isSelected = false,
	isDisabled = false,
	exception = false,
}) => {
	const { t } = useTranslation();

	return (
		<button
			className={cn(styles, [
				'cell',
				'element',
				'border',
				isDisabled ? 'element--disabled' : undefined,
				isSelected ? 'element--selected' : undefined,
				exception && !isDisabled && !isSelected
					? 'element--exception'
					: undefined,
			])}
			onClick={isDisabled ? () => {} : onClick}
			title={t('periodic_table.' + number)}
		>
			<span className={styles.element__number + ' text-small bold'}>
				{number}
			</span>

			<span className={styles.element__name + ' text-big bold'}>
				{symbol}
			</span>
		</button>
	);
};
