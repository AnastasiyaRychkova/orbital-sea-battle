import React, {FC} from 'react';
import { glyphs, GlyphType } from './glyph/index';
import styles from './Icon.module.css';
import cn from '../className';

interface IProps extends React.SVGProps<SVGSVGElement> {
	/** Название иконки */
	type: GlyphType,

	/** Стили, переданные родителями */
	className?: string,
}

const Icon: FC<IProps> = ( {
	type,
	className,
	...args
} ) => {
	return (
		<span className={cn( styles, ['icon'], className )}>
			{glyphs[type]( args )}
		</span>
	);
};

export default Icon;