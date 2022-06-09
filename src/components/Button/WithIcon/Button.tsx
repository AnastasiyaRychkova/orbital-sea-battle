import React, {FC, MouseEventHandler} from 'react';
import { Link } from "react-router-dom";
import cn from '../../className';

import Icon from '../../Icon/Icon';
import styles from './Button.module.css';
import type { Glyph } from '../../Icon/glyph/type';

type Priority = 'primary' | 'secondary';
type Theme = 'muted' | 'bright' | 'dark';

interface IProps {
	/** Надпись на кнопке */
	value: string,

	/** Название иконки */
	glyph: Glyph,

	/** Параметр стиля (главная или второстепенная)*/
	priority: Priority,

	/** Стиль кнопки */
	theme: Theme,

	disabled?: boolean,

	/** Функция по нажатию */
	onClick?: MouseEventHandler<HTMLElement>,
	
	/** URL */
	to?: string,
	
	/** Нужно ли переопределить путь */
	replace?: boolean,

	/** Стили, переданные родителями */
	className?: string,
}

const Button: FC<IProps> = ({
	value,
	glyph,
	priority,
	theme,
	disabled = false,
	className,
	onClick,
	to = '#',
	replace = false,
}) => {
	return to === '#'
	? (
		<button
			type='button'
			disabled = {disabled}
			onClick={onClick}
			className={cn( styles, ['button', priority, theme], className )} >
				<Icon type={glyph} className={styles.icon}/>
				<span className={styles.text}>
					{value}
				</span>
		</button>
	)
	
	: (
		<Link
			to={to}
			replace={replace}
			onClick={onClick}
			className={cn( styles, ['button', priority, theme], className )} >
				<Icon type={glyph} className={styles.icon}/>
				<span className={styles.text}>
					{value}
				</span>
		</Link>
	);
};


export default Button;