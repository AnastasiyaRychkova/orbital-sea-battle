import React, {FC} from 'react';
import cn from '../className';
import styles from './ModalWindow.module.css';

interface IProps {
	className: string,
	children: React.ReactNode,
}


const ModalWindow: FC<IProps> = ({
	className,
	children,
}) => {
	return (
		<aside className={cn( styles, ['modalWindow'], className )} data-closed="false">
			<section className={styles.window}>
				{children}
			</section>
		</aside>
	);
};

export default ModalWindow;