import { observer } from 'mobx-react';
import React, {FC, useEffect} from 'react';
import cn from '../../className';
import { QN } from '../../../core/game/Chemistry';
import ConfirmButton from '../ConfirmButton';
import InputValue from './InputValue';
import styles from './Panel.module.css';
import PanelController from './PanelController';
import type { IDiagramState } from '../../../core/game/Diagram/types';
import type { CellQN } from '../../../core/game/Chemistry/types';

interface IProps {
	className?: string,
	diagram: IDiagramState,
	fireFn: ( cell: CellQN ) => void,
}

const store = new PanelController();

const Panel: FC<IProps> = observer( ({ 
	className,
	diagram,
	fireFn,
}) => {

	useEffect(() => {
		const handleClickOutside = ( event: Event ): void => {
			
			if( store.open
				&& event.target instanceof Element 
				&& !event.target.closest( 'form[name=filter]' )
			)
				store.closeTabHandler();
		};

		document.addEventListener( 'click', handleClickOutside );
		return () => {
			document.removeEventListener( 'click', handleClickOutside );
		}
	})

	return (
		<form className={cn( styles, ['filter'], className )} data-open={store.open} name='filter'>
			<div className={styles.inputsRow}>
				<div className={styles.tabs}>
					<InputValue
						filter={diagram.filter!}
						name='n'
						storeKey='n'
						values={[
							QN.n(1),
							QN.n(2),
							QN.n(3),
							QN.n(4),
							QN.n(5),
							QN.n(6),
							QN.n(7)
						]}
						open={store.openTab === 'n'}
						openTabHandle={store.openTabHandle} />
					<InputValue
						filter={diagram.filter!}
						name='l'
						storeKey='l'
						values={[
							QN.l('s'),
							QN.l('p'),
							QN.l('d'),
							QN.l('f')
						]}
						open={store.openTab === 'l'}
						openTabHandle={store.openTabHandle} />
					<InputValue
						filter={diagram.filter!}
						name='m'
						sub='L'
						storeKey='m'
						values={[
							QN.m(3),
							QN.m(2),
							QN.m(1),
							QN.m(0),
							QN.m(-1),
							QN.m(-2),
							QN.m(-3)
						]}
						open={store.openTab === 'm'}
						openTabHandle={store.openTabHandle} />
					<InputValue
						filter={diagram.filter!}
						name='m'
						sub='S'
						storeKey='s'
						values={[
							QN.s(1),
							QN.s(-1)
						]}
						open={store.openTab === 's'}
						openTabHandle={store.openTabHandle} />
				</div>
				<div className={styles.spacer} aria-hidden="true"></div>
			</div>
			<ConfirmButton mobile
				fireFn={fireFn}
				diagram={diagram}
				/>
		</form>
	);
});

export default Panel;