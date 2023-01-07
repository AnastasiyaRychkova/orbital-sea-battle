import React from 'react';
import ElemNumberInput from './ElemNumberInput';
import style from './ElemIcon.module.css';

type ElemIconProps = {
	element: {
		number: number;
		name: string;
		symbol: string;
	};
	changeFn: ( number: number ) => void;
	blurFn: () => void;
};


function ElemIcon( props: ElemIconProps ) {
	const { element } = props;
	return (
		<div className={style.icon}>
			<ElemNumberInput
				className={style.number}
				number={element.number}
				changeFn={props.changeFn}
				blurFn={props.blurFn}
			/>
			<span className={style.symbol}>{element.symbol}</span>
			<span className={style.name}>{element.name}</span>
		</div>
	);
}

export default ElemIcon;
