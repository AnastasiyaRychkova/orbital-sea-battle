import React, {FC} from 'react';
import { QN } from "../../core/game/Chemistry";
import cn from '../className';
import InputValue from './InputValue';
import ConfirmButton from './ConfirmButton';
import { ToggleTheme } from './types';
import type { IDiagramState } from '../../core/game/Diagram/types';
import type { CellQN } from "../../core/game/Chemistry/types";
import styles from './style.module.css';

interface IProps {
	className?: string,
	diagram: IDiagramState,
	fireFn: ( cell: CellQN ) => void,
}

const Panel: FC<IProps> = ({
	diagram,
	fireFn,
	className
}) => {
	return diagram.filter ? (
		<form className={cn(styles, ['panel'], className)}>
			<div className={styles.inputsRow}>
				<div className={styles.inputPair}>
					<InputValue
						filter={diagram.filter}
						name="n"
						storeKey="n"
						values={[
							QN.n(1),
							QN.n(2),
							QN.n(3),
							QN.n(4),
							QN.n(5),
							QN.n(6),
							QN.n(7)
						]}
						theme={ToggleTheme.default} />
					<InputValue
						filter={diagram.filter}
						name="l"
						storeKey="l"
						values={[
							QN.l('s'),
							QN.l('p'),
							QN.l('d'),
							QN.l('f')
						]}
						theme={ToggleTheme.squareL} />
				</div>
				<div className={styles.inputPair}>
					<InputValue
						filter={diagram.filter}
						name="m"
						sub="L"
						storeKey="m"
						values={[
							QN.m(3),
							QN.m(2),
							QN.m(1),
							QN.m(0),
							QN.m(-1),
							QN.m(-2),
							QN.m(-3)
						]}
						theme={ToggleTheme.default} />
					<InputValue
						filter={diagram.filter}
						name="m"
						sub="S"
						storeKey="s"
						values={[
							QN.s(1),
							QN.s(-1)
						]}
						theme={ToggleTheme.squareM} />
				</div>
			</div>
			<ConfirmButton
				fireFn={fireFn}
				diagram={diagram}
			/>
		</form>
	) : null;
}

export default Panel;