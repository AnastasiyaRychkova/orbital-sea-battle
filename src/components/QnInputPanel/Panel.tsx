import React from 'react';
import InputValue from './InputValue';
import styles from './style.module.css';
import Toggle from './Toggle';
import Range from './Range';
import { ToggleTheme, ToggleType } from './types';
import SignButton from './SignButton';

function Panel() {
	return (
		<form className={styles.panel}>
			<InputValue name="n" storeKey="n" withSwitcher={true}>
				<Toggle
					values={['1','2','3','4','5','6','7']}
					name="n"
					width="13.5em"
					storeKey="n"
					type={ToggleType.radio}
					theme={ToggleTheme.default} />
			</InputValue>
			<InputValue name="l" storeKey="l" withSwitcher={true}>
				<Toggle
					values={['s', 'p', 'd', 'f']}
					name="l"
					storeKey="l"
					type={ToggleType.radio}
					theme={ToggleTheme.squareL} />
			</InputValue>
			<InputValue name="m" sub="L" storeKey="m" withSwitcher={true}>
				<Range
					min={-3}
					max={3}
					name="m"
					width="14em"
					storeKey="m" />
			</InputValue>
			<InputValue name="m" sub="S" storeKey="s" withSwitcher={true}>
				<SignButton
					name="s"
					storeKey="s"
					label="1/2" />
			</InputValue>
		</form>
	);
}

export default Panel;