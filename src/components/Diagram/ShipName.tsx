import React from 'react';
import { observer } from 'mobx-react';
import styles from './diagram.module.css';

interface IProps {
	name: string,
	x: number,
	y: number,
	anchor?: 'start' | 'middle' | 'end',
}


const ShipName = observer(( props: IProps ) => {

	return (
		<text
			className={ styles.shipName }
			x={props.x}
			y={props.y}
			textAnchor={props.anchor || 'start'}
		>
			{props.name}
		</text>
	);
});

export default ShipName;