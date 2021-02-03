import React from 'react';
import style from './ElemButton.module.css';

type ElemButtonProps = {
	element: string,
	direction: 'left'|'right',
	action: () => void,
};

function ElemButton( props: ElemButtonProps ) {
	return (
		<button
			type="button"
			className={style[props.direction+'_button']+' '+style.button}
			onClick={props.action}
		>
			{props.element}
		</button>
	);
}

export default ElemButton;