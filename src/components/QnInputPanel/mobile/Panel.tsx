import { observer } from 'mobx-react';
import React, {FC, useEffect} from 'react';
import cn from '../../className';
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
						values={['1','2','3','4','5','6','7']}
						open={store.openTab === 'n'}
						openTabHandle={store.openTabHandle} />
					<InputValue
						name='l'
						storeKey='l'
						values={['s', 'p', 'd', 'f']}
						open={store.openTab === 'l'}
						openTabHandle={store.openTabHandle} />
					<InputValue
						name='m'
						sub='L'
						storeKey='m'
						values={['+3','+2','+1','0','-1','-2','-3']}
						open={store.openTab === 'm'}
						openTabHandle={store.openTabHandle} />
					<InputValue
						name='m'
						sub='S'
						storeKey='s'
						values={['+1/2','−1/2']}
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