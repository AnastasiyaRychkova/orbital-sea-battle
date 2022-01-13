import { observer } from 'mobx-react';
import React, {FC} from 'react';
import cn from '../className';
import styles from './ModalWindow.module.css';

interface IProps {
	className?: string,
	children: React.ReactNode,
}


const ModalWindow: FC<IProps> = observer( ({
	className,
	children,
}) => {
	return (
		<aside className={styles.modalWindow} data-closed="false">
			<section className={cn( styles, ['window'], className )}>
				{children}
			</section>
		</aside>
	);
});

export default ModalWindow;