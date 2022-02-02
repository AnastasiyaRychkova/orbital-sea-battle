import { observer } from 'mobx-react';
import React, {FC, useEffect} from 'react';
import cn from '../../className';
import { MainQN, OrbitalQN, MagneticQN, SpinQN } from '../../../lib/game/ChemicalElement/QuantumNumbers';
import ConfirmButton from '../ConfirmButton';
import InputValue from './InputValue';
import styles from './Panel.module.css';
import PanelController from './PanelController';

interface IProps {
	className?: string,
}

const store = new PanelController();

const Panel: FC<IProps> = observer( ({ className }) => {

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
						name='n'
						storeKey='n'
						values={[
							new MainQN(1),
							new MainQN(2),
							new MainQN(3),
							new MainQN(4),
							new MainQN(5),
							new MainQN(6),
							new MainQN(7)
						]}
						open={store.openTab === 'n'}
						openTabHandle={store.openTabHandle} />
					<InputValue
						name='l'
						storeKey='l'
						values={[
							new OrbitalQN('s'),
							new OrbitalQN('p'),
							new OrbitalQN('d'),
							new OrbitalQN('f')
						]}
						open={store.openTab === 'l'}
						openTabHandle={store.openTabHandle} />
					<InputValue
						name='m'
						sub='L'
						storeKey='m'
						values={[
							new MagneticQN(3),
							new MagneticQN(2),
							new MagneticQN(1),
							new MagneticQN(0),
							new MagneticQN(-1),
							new MagneticQN(-2),
							new MagneticQN(-3)
						]}
						open={store.openTab === 'm'}
						openTabHandle={store.openTabHandle} />
					<InputValue
						name='m'
						sub='S'
						storeKey='s'
						values={[
							new SpinQN(1),
							new SpinQN(-1)
						]}
						open={store.openTab === 's'}
						openTabHandle={store.openTabHandle} />
				</div>
				<div className={styles.spacer} aria-hidden="true"></div>
			</div>
			<ConfirmButton mobile />
		</form>
	);
});

export default Panel;