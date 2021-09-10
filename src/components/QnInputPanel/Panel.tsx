import React from 'react';
import InputValue from './InputValue';
import styles from './style.module.css';
import Toggle from './Toggle';
import Range from './Range';
import { ToggleTheme, ToggleType } from './types';
import SignButton from './SignButton';
import ConfirmButton from './ConfirmButton';

function Panel() {
	return (
		<form className={styles.panel}>
			<InputValue name="n" storeKey="n" withSwitcher={true}>
				<Toggle
					values={['1','2','3','4','5','6','7']}
					width="13.5em"
					type={ToggleType.radio}
					theme={ToggleTheme.default} />
			</InputValue>
			<InputValue name="l" storeKey="l" withSwitcher={true}>
				<Toggle
					values={['s', 'p', 'd', 'f']}
					type={ToggleType.radio}
					theme={ToggleTheme.squareL} />
			</InputValue>
			<InputValue name="m" sub="L" storeKey="m" withSwitcher={true}>
				<Range
					min={-3}
					max={3}
					width="14em" />
			</InputValue>
			<InputValue name="s" sub="S" storeKey="s" withSwitcher={true}>
				<SignButton label="1/2" />
			</InputValue>
			<ConfirmButton></ConfirmButton>
		</form>
	);
}

export default Panel;