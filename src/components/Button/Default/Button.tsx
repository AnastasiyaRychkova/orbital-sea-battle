import React, {FC, MouseEventHandler} from 'react';
import cn from '../../className';
import styles from './Button.module.css';

type Priority = 'primary' | 'secondary';

interface IProps {
	/** Надпись на кнопке */
	value: string,

	/** Параметр стиля (главная или второстепенная)*/
	priority: Priority,

	/** Функция по нажатию */
	onClick?: MouseEventHandler<HTMLButtonElement>,

	/** Стили, переданные родителями */
	className?: string,
}

const Button: FC<IProps> = ({
	value,
	priority,
	className,
	onClick,
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn( styles, ['button', priority], className )} >
				<span className={styles.text}>
					{value}
				</span>
		</button>
	);
};

export default Button;