import React from 'react';
import { observer } from 'mobx-react';
import styles from './diagram.module.css';

interface IProps {
	number: number,
	x: number,
	y: number,
}


const SequenceNumber = observer(( props: IProps ) => {

	return (
		<text
			className={ styles.sequencer }
			x={props.x}
			y={props.y}
			textAnchor="end"
		>
			{props.number}
		</text>
	);
});

export default SequenceNumber;