import React, {FC, MouseEventHandler} from 'react';
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

	/** Функция по нажатию */
	onClick?: MouseEventHandler<HTMLButtonElement>,

	/** Стили, переданные родителями */
	className?: string,
}

const Button: FC<IProps> = ({
	value,
	glyph,
	priority,
	theme,
	className,
	onClick,
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn( styles, ['button', priority, theme], className )} >
				<Icon type={glyph} className={styles.icon}/>
				<span className={styles.text}>
					{value}
				</span>
		</button>
	);
};

export default Button;