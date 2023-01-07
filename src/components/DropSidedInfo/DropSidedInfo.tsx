import React, { FC } from 'react';
import cn from '../className';
import Icon from '../Icon/Icon';
import styles from './DropSidedInfo.module.css';

interface IProps {
	/** Основное сообщение */
	message: string;

	/** Пояснение */
	comment: string;

	/** Раскрыт ли по умолчанию */
	isOpen?: boolean;

	/** Стили, переданные родителями */
	className?: string;
}



/** Информационный блок */
const DropSidedInfo: FC<IProps> = ({
	message,
	comment,
	isOpen = false,
	className,
}) => {
	const id = 'info-' + Math.random().toString(16).slice(-4);

	return (
		<label
			className={cn(styles, ['task'], className)}
			role="button"
		>
			<input
				type="checkbox"
				className={styles.checkbox}
				id={id}
				defaultChecked={isOpen}
				// checked в раскрытом состоянии
			/>
			<Icon
				type="info"
				className={styles.infoIcon}
			/>

			<div className={styles.content}>
				<div className={styles.description}>
					<span className="button-medium">{message}</span>
					<span className="long-normal">{comment}</span>
				</div>
				<label
					htmlFor={id}
					className={styles.closeBtn}
					role="button"
				>
					<Icon type="cross" />
				</label>
			</div>
		</label>
	);
};

export default DropSidedInfo;
