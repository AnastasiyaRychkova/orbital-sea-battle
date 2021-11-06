import React from 'react';
import styles from './Switcher.module.css';

interface IProps {
	id: string,
	switchOn: boolean,
	onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void,
}

function Switcher( props: IProps ) {
	return (
		<div className={styles.container}>
			<input
				className={styles.inputSwitcher}
				id={props.id}
				type="checkbox"
				checked={props.switchOn}
				onChange={props.onChange} />
			<label
				className={styles.switcher}
				htmlFor={props.id}></label>
			<label
				className={styles.switcherBillet}
				htmlFor={props.id} ></label>
		</div>
	);
}

export default Switcher;