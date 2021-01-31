import React from 'react';
import style from '../../style/ScrolledContainer.module.css';
import containerStyle from './DiagramContainer.module.css';

function DiagramContainer( props: any ) {
	return (
		<section className={containerStyle.container+' '+style.container}>
			{ props.children }
		</section>
	);
}

export default DiagramContainer;