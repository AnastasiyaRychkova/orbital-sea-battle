import React, { FC } from 'react';
import cn from '../className';
import Icon from '../Icon/Icon';
import styles from './DropSidedInfo.module.css';
import { ButtonWithIcon } from 'components/Button/WithIcon/Button';

interface IProps {
	/** Основное сообщение */
	message: string;

	/** Пояснение */
	comment: string;

	link?: {
		text: string;
		to: string;
	};

	/** Раскрыт ли по умолчанию */
	isOpen?: boolean;

	/** Стили, переданные родителями */
	className?: string;
}



/** Информационный блок */
const DropSidedInfo: FC<IProps> = ({
	message,
	comment,
	link,
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
					{link ?
					<ButtonWithIcon
						className={styles.btn}
						priority="tertiary"
						value={link.text}
						to={link.to}
						inNewTab
						glyph="info"
						small
					/> : null}
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
