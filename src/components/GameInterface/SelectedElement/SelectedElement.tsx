import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import styles from './SelectedElement.module.css';
import sprite from "../../../img/sprite.svg";
import Button from '../../Button/IconButton/Button';

import { ChemicalElement } from '../../../core/game/Chemistry/ChemicalElement';

interface IProps
{
	/** Выбранный элемент */
	element: ChemicalElement;

	/** Число отмеченных стрелок */
	chosen: number;
}

/** Блок с отображением выбранного элемента */
const SelectedElement = observer(( props: IProps ) => {
	const { t } = useTranslation();

	const [isOpen, toggle] = useState( false );

	const selectedElementUnit = (
		<div className = { styles["unit"] }>
			<div className ={ styles["element-preview"] }>
				<span className = {
					styles["element-preview__name"]
					+ " long-small"
				}>
					{ props.element.name }
				</span>
				<span className = {
					styles["element-preview__symbol"]
					+ " text-xl bold"
				}>
					{ props.element.symbol }
				</span>
				<span className = {
					styles["element-preview__number"]
					+ " text-normal"
				}>
					{ props.element.number }
				</span>
			</div>

			<div className = { styles["unit__name"] } >
				<span className = "text-small" >
					{ t("components.table.code") }
				</span>
				<span className = "header-4 bold" >
					{ t( "periodic_table." + props.element.number ) }
				</span>
			</div>

			<div className = { styles["unit__number"] }>
				<span className = "text-small" >
					{ t( "components.table.ammo" ) }
				</span>
				<div className = { styles.ammunition }>
					<svg
						role = "presentation"
						width = "20"
						height = "20"
						className = { styles.ammunition__img }
					>
						<use href = { sprite + "#ballons" } />
					</svg>
					<span className = { "header-4 bold" }>
						{ props.chosen + "/" + props.element.number }
					</span>
				</div>
			</div>
		</div>
	);
	

	return (
		<>
			<div className = { styles.small } >
				<button
					className = {
						styles.block + " " +
						( isOpen ? styles.hidden : "" )
					}
					onClick = { () => { toggle(true); } }
				>
					<span className = { styles.symbol } >
						{ props.element.symbol }
					</span>
				</button>

				<div className = {
					styles.wrapper + " " +
					( isOpen ? "" : styles.hidden )
				}>
					<div className = { styles.backing }> 
						{ selectedElementUnit }
					</div>
					<Button
						className = { styles.collapse }
						glyph = { "left" }
						onClick = { () => { toggle(false); } }
					/>
				</div>
			</div>
				
			<div className = { styles.full } >
				{ selectedElementUnit }
			</div>
		</>
	);
});


export default SelectedElement;
