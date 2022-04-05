import React, {FC} from 'react';
import InputValue from './InputValue';
import ConfirmButton from './ConfirmButton';
import styles from './style.module.css';
import { ToggleTheme } from './types';
import cn from '../className';
import { MainQN, OrbitalQN, MagneticQN, SpinQN } from '../../lib/game/ChemicalElement/QuantumNumbers';

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
						values={[
							new MainQN(1),
							new MainQN(2),
							new MainQN(3),
							new MainQN(4),
							new MainQN(5),
							new MainQN(6),
							new MainQN(7)
						]}
						theme={ToggleTheme.default} />
					<InputValue
						name="l"
						storeKey="l"
						values={[
							new OrbitalQN('s'),
							new OrbitalQN('p'),
							new OrbitalQN('d'),
							new OrbitalQN('f')
						]}
						theme={ToggleTheme.squareL} />
				</div>
				<div className={styles.inputPair}>
					<InputValue
						name="m"
						sub="L"
						storeKey="m"
						values={[
							new MagneticQN(3),
							new MagneticQN(2),
							new MagneticQN(1),
							new MagneticQN(0),
							new MagneticQN(-1),
							new MagneticQN(-2),
							new MagneticQN(-3)
						]}
						theme={ToggleTheme.default} />
					<InputValue
						name="m"
						sub="S"
						storeKey="s"
						values={[
							new SpinQN(1),
							new SpinQN(-1)
						]}
						theme={ToggleTheme.squareM} />
				</div>
			</div>
			<ConfirmButton/>
		</form>
	);
}

export default Panel;