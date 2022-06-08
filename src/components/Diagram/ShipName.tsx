import React from 'react';
import { observer } from 'mobx-react';
import styles from './diagram.module.css';

interface IProps {
	name: string,
	x: number,
	y: number,
}


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