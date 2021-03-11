import React from 'react';
import styles from './GeneralBackground.module.css';

interface IProps {
	children: React.ReactNode,
}

function GeneralBackground( props: IProps )
{
	return (
		<div className={ styles.background }>
			{ props.children }
		</div>
	);
}

export default GeneralBackground;