import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PeriodicTable.module.css';
import ammo from '../../img/components/ammunition.svg'

import { periodicTable } from "../../core/game/Services/Chemistry";

import { TableMode } from "./PeriodicTableUnit";

interface IProps
{
	/** Режим таблицы */
	mode: TableMode;

	/** Показывается ли блок */
	isVisible?: boolean

	/** Номер выбранного элемент, 0 если не выбран */
	number: number;
}

/** Блок таблицы с отображением выбранного элемента */
export const SelectedElement = ( props: IProps ) => {
	const { t } = useTranslation();
	
	const element = periodicTable.element(
		(props.number === 0)
		? 1
		: props.number
	);
	
	return (
		<div
			className = { styles.cell + " " + styles["selected-element"] }
			style = { (props.isVisible) ? { } : { visibility: "hidden" } }
		>
			<div className = { styles.cell + " " + styles["element-preview"] }>
				<span className = {
					styles["element-preview__name"]
					+ " long-small"
				}>
					{ element.name }
				</span>
				<span className = {
					styles["element-preview__symbol"]
					+ " text-xl bold"
				}>
					{ element.symbol }
				</span>
				<span className = { 
					styles["element-preview__number"]
					+ " text-normal"
				}>
					{ element.number }
				</span>
			</div>
			<div className={ styles["selected-element__name"] }>
				<span className = "text-small" >
					{
						t(
							props.mode === "guessing"
							? "components.table.enemy"
							: "components.table.code"
						)
					}
				</span>
				<span className = "header-4 bold" >
					{ t( "periodic_table." + element.number ) }
				</span>
			</div>
			{
				props.mode === "guessing" ? null :
					<div className = { styles["selected-element__number"] }>
						<span className = "text-small" >
							{ t( "components.table.ammo" ) }
						</span>
						<div className={ styles.ammunition }>
							<img
								className = { styles.ammunition__img }
								src = { ammo }
								alt = ""
							/>
							<span className = "header-4 bold" >
								{ element.number }
							</span>
						</div>
					</div>
			}
		</div>
	);
}
