import React, {FC, MouseEventHandler} from 'react';
import cn from '../../className';
import Icon from '../../Icon/Icon';
import styles from './Button.module.css';


import type { Glyph } from '../../Icon/glyph/type';


export type Theme = 'default' | 'backing' | 'inversive';

interface IProps {
	/** Название иконки */
	glyph: Glyph,

	/** Стиль кнопки */
	theme?: Theme,

	/** Заблокирована лии она */
	disabled?: boolean,

	/** Функция по нажатию */
	onClick?: MouseEventHandler<HTMLButtonElement>,

	/** Стили, переданные родителями */
	className?: string,
}


const Button: FC<IProps> = ( {
	glyph,
	theme = 'default',
	disabled,
	onClick,
	className,
} ) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={cn( styles, ['button', theme], className )}
		>
			<Icon className={styles.icon}
				type={glyph}
			/>
		</button>
	);
};

export default Button;
export { Button as IconButton };
