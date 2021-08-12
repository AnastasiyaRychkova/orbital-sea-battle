import React from 'react';
import { observer } from "mobx-react";
import NumericButton from './NumericButton';
import store from './Store';
import styles from './Volume.module.css';

interface IProps {
	from: number,
	to: number,
	name: string,
	width: string,
	storeKey: 'n'|'m',
}

// function make( props: IProps ): JSX.Element[] {
// 	const res = [];
// 	const checkedValue = store.getValue( props.storeKey );

// 	for( let i = props.to; i >= props.from; i-- ) {
// 		res.push(
// 			<NumericButton
// 				number={i}
// 				toggle={props.name}
// 				checked={i === checkedValue}
// 				key={i}
// 				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
// 					store.setValue( props.storeKey, parseInt(e.target.value, 10) );
// 				}}/>
// 		);
// 	}
// 	return res;
// }

const Volume = observer(( props: IProps ) =>
	<div className={styles.scale} style={{width: props.width}}>
		{/* { make( props ) } */}
	</div>
);

export default Volume;