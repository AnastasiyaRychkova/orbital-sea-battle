import React from 'react';
import styles from './TabSwitcher.module.css';
import icons from '../../style/icons.module.css';

import { useTranslation } from 'react-i18next';

import sprite from "../../img/sprite.svg";



{/* <svg ...> <use href = { sprite + "#message" } /> </svg> */}

interface IPagingButtonProps {
	onClick: () => void;
	isSelected: boolean;
	icon: string;
}

function PagingButton( props: IPagingButtonProps ) {
	return (
		<button
			className = { styles["button-icon"] + " " + styles["button-paging"] }
		>
			<svg
				className = {
					icons["icon-tiny"]
					+ " " +
					icons["icon-secondary"]
					+ " " +
					( props.isSelected ? icons["icon-secondary--selected"] : "" )
				}
				onClick = { () => { if (!props.isSelected) props.onClick(); } }
			>
					<use href = { sprite + props.icon } />
			</svg>
		</button>
	);
}

interface IArrowProps {
	visible: boolean;
	onClick: () => void;
	direction: "right" | "left";
}

function Arrow( props: IArrowProps ) {
	if ( props.visible )
		return (
			<button className = {
					styles["button-icon"]
					+ " " +
					styles[ ( "paging-" + props.direction ) ]
					+ " " +
					styles["button-paging"]
				}
			>
				<svg
					role = "presentation" width = "20" height = "20"
					className = {
						( props.direction === "right" ? icons["icon-flip"] : "" )
						+ " " +
						icons["icon-small"]
						+ " " +
						icons["icon-stroke__color"]
					}
				>
					<use href = { sprite + "#arrow-left" } />
				</svg>
			</button>
		);
	return ( <></> );
}


interface IProps {
	/** Номер выбранной вкладки */
	tabNumber: 1 | 2 | 3;

	/** Действие при выборе вкладки с отображением собственной диаграммы */
	first: () => void;

	/** При выборе вкладки со стрельбой */
	second: () => void;

	/** При выборе вкладки с угадываем элемента соперника */
	third: () => void;
}

/** Компонент для переключения вкладок игрового окна */
export default function TabSwitcher( props: IProps ) {

	const prev = ( props.tabNumber === 3) ? props.second : props.first;

	const next = ( props.tabNumber === 1) ? props.second : props.third;

	return ( 
		<>
			<Arrow
				visible = { props.tabNumber !== 1 }
				onClick = { prev }
				direction = "left"
			/>
			
			<Arrow
				visible = { props.tabNumber !== 3 }
				onClick = { next }
				direction = "right"
			/>

			<nav className = { styles["nav-3"] }>
				<PagingButton
					onClick = { props.first }
					icon = "#choose"
					isSelected = { props.tabNumber === 1 }
				/>
				<PagingButton
					onClick = { props.second }
					icon = "#shoot"
					isSelected = { props.tabNumber === 2 }
				/>
				<PagingButton
					onClick = { props.third }
					icon = "#guess"
					isSelected = { props.tabNumber === 3 }
				/>
			</nav>
		</>
	);
}