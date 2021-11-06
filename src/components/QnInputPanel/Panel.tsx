import React from 'react';
import InputValue from './InputValue';
import styles from './style.module.css';
import Toggle from './Toggle';
import { ToggleTheme, ToggleType } from './types';
import ConfirmButton from './ConfirmButton';

function Panel() {
	return (
		<form className={styles.panel}>
			<InputValue name="n" storeKey="n" withSwitcher={false}>
				<Toggle
					values={['1','2','3','4','5','6','7']}
					width="13.5em"
					type={ToggleType.checkbox}
					theme={ToggleTheme.default} />
			</InputValue>
			<InputValue name="l" storeKey="l" withSwitcher={false}>
				<Toggle
					values={['s', 'p', 'd', 'f']}
					type={ToggleType.checkbox}
					theme={ToggleTheme.squareL} />
			</InputValue>
			<InputValue name="m" sub="L" storeKey="m" withSwitcher={false}>
				<Toggle
					values={['-3','-2','-1','0','1','2','3']}
					width="14em"
					type={ToggleType.checkbox}
					theme={ToggleTheme.default} />
			</InputValue>
			<InputValue name="m" sub="S" storeKey="s" withSwitcher={false}>
				<Toggle
					values={['+1/2','-1/2']}
					type={ToggleType.checkbox}
					theme={ToggleTheme.squareM} />
			</InputValue>
			<ConfirmButton></ConfirmButton>
		</form>
	);
}

export default Panel;