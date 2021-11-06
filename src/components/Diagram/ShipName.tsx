import React from 'react';
import { observer } from 'mobx-react';
/* import DiagramStateType from '../../lib/game/Diagram/DiagramInterface';
import classNames from 'classnames'; */
import styles from './diagram.module.css';

interface IProps {
	name: string,
	x: number,
	y: number,
}

/* function makeShipNameClass( diagram: DiagramStateType ): string
{
	return classNames({
		[styles.ship_name]: true,
		[styles.ship_name_disabled]: diagram.shipNameClickFunction,
	});
} */

const ShipName = observer(( props: IProps ) => {

	return (
		<text
			className={ styles.shipName }
			x={props.x}
			y={props.y}
		>
			{props.name}
		</text>
	);
});

export default ShipName;