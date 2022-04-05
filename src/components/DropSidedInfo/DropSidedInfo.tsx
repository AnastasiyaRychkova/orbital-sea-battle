import React, {FC} from 'react';
import cn from '../className';

import Icon from '../Icon/Icon';
import styles from './DropSidedInfo.module.css';


interface IProps {
	/** Надпись на кнопке */
	message: string,

	/** Надпись на кнопке */
	comment: string,

	/** Стили, переданные родителями */
	className?: string,
}


const DropSidedInfo: FC<IProps> = ({
	message,
	comment,
	className,
}) => {
	const id = 'task-' + Math.random().toFixed( 4 );
	return (
		<label className={cn( styles, ['task'], className )} role="button">
			<input type="checkbox" className={styles.checkbox} id={id}/>
			<Icon type="info" className={styles.infoIcon} />

			<div className={styles.content}>
				<div className={styles.description}>
					<span className={styles.messageText}>
						{message}
					</span>
					<span className={styles.commentText}>
						{comment}
					</span>
				</div>
				<label htmlFor={id} className={styles.closeBtn} role="button">
					<Icon type="cross" />
				</label>
			</div>
		</label>
	);
};

export default DropSidedInfo;