import React, {FC} from 'react';
import cn from 'classnames';
import { glyphs, GlyphType } from './glyph/index';
import styles from './Icon.module.css';

interface IProps extends React.SVGProps<SVGSVGElement> {
	/** Название иконки */
	type: GlyphType,

	/** Размер в em? */
	emSize?: boolean,

	/** Стили, переданные родителями */
	className?: string,
}

const Icon: FC<IProps> = ( {
	type,
	emSize,
	className,
	...args
} ) => {
	return (
		<span className={cn(
			styles.icon,
			{[styles.em]: emSize},
			className
		)}
		>
			{glyphs[type]( args )}
		</span>
	);
};

export default Icon;