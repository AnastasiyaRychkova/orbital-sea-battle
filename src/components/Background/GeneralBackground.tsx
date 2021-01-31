import React from 'react';
import styles from './GeneralBackground.module.css';

function GeneralBackground( props: any )
{
	return (
		<div className={ styles.background }>
			{ props.children }
		</div>
	);
}

export default GeneralBackground;