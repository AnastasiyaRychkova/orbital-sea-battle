import { observer } from 'mobx-react';
import React, { FC } from 'react';
import styles from './Body.module.css';

interface IProps {
	children: React.ReactNode;
}

const Body: FC<IProps> = observer(( props ) => {
	return (
		<div className={ styles.body2 } >
			{ props.children }
		</div>
	);
});

export default Body;