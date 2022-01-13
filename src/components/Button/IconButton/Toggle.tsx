import React, {FC} from 'react';
import styles from './Button.module.css';
import Icon from '../../Icon/Icon';

import cn from '../../className';

import type { Glyph } from '../../Icon/glyph/type';


export type Theme = 'backing' | 'inversive';

interface IProps {
	/** Состояние переключателя для инициализации */
	state: boolean

	/** Название иконки для включенного состояния */
	glyphOn: Glyph,

	/** Название иконки для выключенного состояния */
	glyphOff: Glyph,

	/** Функция переключения состояния */
	toggleFunc?: () => void,
	
	/** Стиль кнопки */
	theme?: Theme,

	/** Стили, переданные родителями */
	className?: string,
}


const Toggle: FC<IProps> = ({
	state,
	glyphOn,
	glyphOff,
	theme,
	toggleFunc,
	className,
}) => {
	return (
		<button
			type="button"
			onClick={toggleFunc}
			className={cn( styles, ['button', theme], className )} >
				<Icon type={state ? glyphOn : glyphOff} />
		</button>
	);
};

export default Toggle;