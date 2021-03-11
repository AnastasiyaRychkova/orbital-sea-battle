import React from 'react';
import style from '../../style/ScrolledContainer.module.css';
import containerStyle from './DiagramContainer.module.css';
import classNames from 'classnames';

interface IProps {
	children: React.ReactNode,
}

function DiagramContainer( props: IProps ) {
	return (
		<section className={classNames( containerStyle.container, style.container )}>
			{ props.children }
		</section>
	);
}

export default DiagramContainer;