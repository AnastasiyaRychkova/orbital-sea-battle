import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PeriodicTable.module.css';
import texts from '../../style/text.module.css';
import cn from '../className';
// import ammo from '../../img/components/ammunition.svg'

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
			className = { cn( styles, ["cell", "selected-element"] ) }
			style = { (props.isVisible) ? { } : { visibility: "hidden" } }
		>
			<div className={ cn( styles, ["cell", "element-preview"] ) }>
				<span className={ cn( styles, ["element-preview__name"] ) + " " + cn( texts, ["text-long-Lt-Small"] ) }>
					{ element.name }
				</span>
				<span className={ cn( styles, ["element-preview__symbol"] ) + " " + cn( texts, ["text-bold-T-XL"] ) }>
					{ element.symbol }
				</span>
				<span className={ cn( styles, ["element-preview__number"] ) + " " + cn( texts, ["text-reg-T-m-Normal"] ) }>
					{ element.number }
				</span>
			</div>
			<div className={ cn( styles, ["selected-element__name"] ) }>
				<span className={ cn( texts, ["text-reg-T-m-Small"] ) }>
					{
						t(
							props.mode === "guessing"
							? "components.table.enemy"
							: "components.table.code"
						)
					}
				</span>
				<span className={ cn( texts, ["text-header-bold-h4"] ) }>
					{ t( "periodic_table." + element.number ) }
				</span>
			</div>
			{
				props.mode === "guessing" ? null :
					<div className={ cn( styles, ["selected-element__number"] ) + " " + cn( texts, ["text-bold-T-Small"] ) }>
						<span className={ cn( texts, ["text-reg-T-m-Small"] ) }>
							{ t( "components.table.ammo" ) }
						</span>
						<div className={ cn( styles, ["ammunition"] ) }>
							
							{/* <img
								className = { styles.ammunition__img }
								src = { ammo }
								alt = ""
							/> */}

							<span className={ cn( texts, ["text-header-bold-h4"] ) }>
								{ element.number }
							</span>
						</div>
					</div>
			}
		</div>
	);
}
