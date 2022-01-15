import React, {FC} from 'react';
import InputValue from './InputValue';
import ConfirmButton from './ConfirmButton';
import styles from './style.module.css';
import { ToggleTheme } from './types';
import cn from '../className';

interface IProps {
	className?: string,
}

const Panel: FC<IProps> = ({className}) => {
	return (
		<form className={cn(styles, ['panel'], className)}>
			<div className={styles.inputsRow}>
				<div className={styles.inputPair}>
					<InputValue
						name="n"
						storeKey="n"
						values={['1','2','3','4','5','6','7']}
						theme={ToggleTheme.default} />
					<InputValue
						name="l"
						storeKey="l"
						values={['s', 'p', 'd', 'f']}
						theme={ToggleTheme.squareL} />
				</div>
				<div className={styles.inputPair}>
					<InputValue
						name="m"
						sub="L"
						storeKey="m"
						values={['+3','+2','+1','0','-1','-2','-3']}
						theme={ToggleTheme.default} />
					<InputValue
						name="m"
						sub="S"
						storeKey="s"
						values={['+1/2','−1/2']}
						theme={ToggleTheme.squareM} />
				</div>
			</div>
			<ConfirmButton/>
		</form>
	);
}

export default Panel;