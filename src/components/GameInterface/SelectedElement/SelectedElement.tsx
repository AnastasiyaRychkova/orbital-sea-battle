import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SelectedElement.module.css';
import buttons from '../Buttons.module.css';
import texts from '../../../style/text.module.css';
import sprite from "../../../img/sprite.svg";

import { ChemicalElement } from '../../../core/game/Chemistry/ChemicalElement';
import { observer } from 'mobx-react';

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
	
	// const element = periodicTable.element( props.number );
	
	return (
		<>
			<button className = {
					styles["icon-box"]
					+ " " +
					styles["selected-element-small"]
					+ " " +
					buttons["button-content-center"]
				}
			>
				<span className = { texts["text-bold-T-Normal"] }>
					{ props.element.symbol }
				</span>
			</button>
			
			<div className = { styles["selected-element-wrapper"] }
			>	
				<div className = { styles["selected-element-medium"] }>
					<div className ={ styles["element-preview"] }>
						<span className = {
							styles["element-preview__name"] + " " +
							texts["text-long-Lt-Small"]
						}>
							{ props.element.name }
						</span>
						<span className = {
							styles["element-preview__symbol"] + " " +
							texts["text-bold-T-XL"]
						}>
							{ props.element.symbol }
						</span>
						<span className = {
							styles["element-preview__number"] + " " +
							texts["text-reg-T-m-Normal"]
						}>
							{ props.element.number }
						</span>
					</div>

						<div className = { styles["selected-element__name"] } >
							<span className = { texts["text-reg-T-m-Small"] }>
								{ t("components.table.code") }
							</span>
							<span className = { texts["text-header-bold-h4"] }>
								{ t( "periodic_table." + props.element.number ) }
							</span>
						</div>

						<div className = {
							styles["selected-element__number"] + " " +
							texts["text-bold-T-Small"]
						} >
							<span className ={ texts["text-reg-T-m-Small"] }>
								{ t( "components.table.ammo" ) }
							</span>
							<div className = { styles["electrons"] }>
								<svg
									role="presentation" width="20" height="20" className = { styles["electrons__img"] }
								>
									<use href = { sprite + "#ballons" } />
								</svg>
								<span className = { texts["text-header-bold-h4"] }>
									{ props.chosen + "/" + props.element.number }
								</span>
							</div>
						</div>
					</div>

					<div>
						{/* <button className ="collapse collapse-vertical button-icon button-paging">
						<svg role="presentation" width="20" height="20" className ="icon-small icon-stroke__color">
							<use href="img/sprite.svg#arrow-left">
						</use></svg>
						</button> */}
					</div>	
			</div>
		</>
	);
});


export default SelectedElement;
