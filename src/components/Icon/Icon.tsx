import React, {FC} from 'react';
import { Glyph } from './glyph/type';
import getGlyph from './glyph/index';
import styles from './Icon.module.css';
import cn from '../className';

interface IProps {
	/** Название иконки */
	type: Glyph,

	/** Стили, переданные родителями */
	className?: string,
}

const Icon: FC<IProps> = ({ type, className }) => {
	return (
		<span className={cn( styles, ['icon'], className )}>
			{getGlyph( type )}
		</span>
	);
};

export default Icon;