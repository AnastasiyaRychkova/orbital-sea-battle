import React, {FC, MouseEventHandler} from 'react';
import styles from './Button.module.css';
import Icon from '../../Icon/Icon';

import cn from '../../className';

import type { Glyph } from '../../Icon/glyph/type';


export type Theme = 'backing' | 'inversive';

interface IProps {
	/** Название иконки */
	glyph: Glyph,

	/** Стиль кнопки */
	theme?: Theme,

	/** Функция по нажатию */
	onClick?: MouseEventHandler<HTMLButtonElement>,

	/** Стили, переданные родителями */
	className?: string,
}


const Button: FC<IProps> = ({
	glyph,
	theme,
	onClick,
	className,
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn( styles, ['button', theme], className )} >
				<Icon type={glyph} />
		</button>
	);
};

export default Button;