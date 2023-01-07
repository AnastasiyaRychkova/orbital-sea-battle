import React from 'react';
import style from './ElemNumberInput.module.css';

type NumberInputProps = {
	number: number,
	className?: string,
	changeFn: ( number: number ) => void,
	blurFn: () => void,
};

function ElemNumberInput( props: NumberInputProps ) {
	const { number: elemNumber, changeFn } = props;
	return (
		<input
			type="number"
			inputMode="numeric"
			className={style.input + ( props.className ? ' ' + props.className : '' )}
			value={elemNumber}
			onChange={( e: any ) => { changeFn( e.target.value ); }}
			onBlur={props.blurFn}
		/>
	);
}

export default ElemNumberInput;