import React from 'react';
import styles from './TabSwitcher.module.css';
import Button from '../Button/IconButton/Button';
import sprite from "../../img/sprite.svg";

export type TabNumber = 1 | 2 | 3;


interface IPagingButtonProps {
	onClick: () => void;
	isSelected: boolean;
	icon: string;
}

function PagingButton( props: IPagingButtonProps ) {
	return (
		<button
			className = {
				styles.paging + " " +
				( props.isSelected ? styles.selected : "" )
			}
			onClick = { () => { if (!props.isSelected) props.onClick(); } }
		>
			<svg className = { styles.tiny }>
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
			<Button
				className = {
					styles.small + " " +
					styles[ props.direction ]
				}
				glyph = { "left" }
				onClick = { props.onClick }
			/>
		);
	return ( <></> );
}


interface IProps {
	/** Номер выбранной вкладки */
	tabNumber: TabNumber;

	/** Действие при выборе вкладки */
	change: (newTab: TabNumber) => void;
}

/** Компонент для переключения вкладок игрового окна */
export default function TabSwitcher( props: IProps ) {

	const first = props.change.bind(null, 1);
	const second = props.change.bind(null, 2);
	const third = props.change.bind(null, 3);

	const prev = ( props.tabNumber === 3) ? second : first;
	const next = ( props.tabNumber === 1) ? second : third;

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

			<nav className = { styles.nav }>
				<PagingButton
					onClick = { first }
					icon = "#choose"
					isSelected = { props.tabNumber === 1 }
				/>
				<PagingButton
					onClick = { second }
					icon = "#shoot"
					isSelected = { props.tabNumber === 2 }
				/>
				<PagingButton
					onClick = { third }
					icon = "#guess"
					isSelected = { props.tabNumber === 3 }
				/>
			</nav>
		</>
	);
}