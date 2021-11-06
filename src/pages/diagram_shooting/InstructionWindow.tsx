import React from 'react';
import styles from './InstructionWindow.module.css';

interface IProps {
	children: React.ReactNode,
}

function InstructionWindow( props: IProps ) {
	return (
		<div className={styles.page}>
			<div className={styles.window}>
			{ props.children }
			</div>
		</div>
	);
}

export default InstructionWindow;