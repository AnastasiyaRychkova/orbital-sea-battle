import React, {FC, MouseEventHandler} from 'react';
import { Link } from "react-router-dom";
import cn from '../../className';
import styles from './Button.module.css';

type Priority = 'primary' | 'secondary';

interface IButtonProps {
	/** Надпись на кнопке */
	value: string,

	/** Параметр стиля (главная или второстепенная)*/
	priority: Priority,

	/** Функция по нажатию */
	onClick?: MouseEventHandler<HTMLElement>,

	/** Отключена ли кнопка */
	disabled?: boolean,

	/** URL */
	to?: string,

	/** Нужно ли переопределить путь */
	replace?: boolean,

	/** Стили, переданные родителями */
	className?: string,
}

const Button: FC<IButtonProps> = ({
	value,
	priority,
	className,
	onClick,
	to = '#',
	replace = false,
	disabled = false,
}) => {
	return to === '#'
	? (
		<button
			onClick={onClick}
			className={cn( styles, ['button', priority, (disabled ? 'disabled' : undefined)], className )} >
				<span className="button-medium">
					{value}
				</span>
		</button>
	)
	: (
		<Link
			to={to}
			replace={replace}
			onClick={onClick}
			className={cn( styles, ['button', priority, (disabled ? 'disabled' : undefined)], className )} >
				<span className="button-medium">
					{value}
				</span>
		</Link>
	);
};

export default Button;