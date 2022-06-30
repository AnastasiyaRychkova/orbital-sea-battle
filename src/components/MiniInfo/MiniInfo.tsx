import React, {FC} from 'react';
import { observer } from 'mobx-react';
import cn from '../className';
import Icon from "../Icon/Icon";
import styles from './MiniInfo.module.css';

import type { Glyph } from '../Icon/glyph/type';

type InfoProvider = string | number;

interface IProps {
	/** Объект, предоставляющий выводимую информацию */
	provider: InfoProvider,

	/** Подпись под значением */
	caption?: string,

	/** Название иконки */
	glyph: Glyph,

	/** Стили, переданные родителем */
	className?: string,
}


/** __Окно с краткой информацией__
 * 
 * Принимает `Provider`, который выдает значение в виде строки 
 * через метод `valueAsString()`
 */
const MiniInfo: FC<IProps> = observer(({
	provider,
	caption,
	glyph,
	className,
}) => {
	return (
		<div className = {cn( styles, ['miniInfo'], className )}>
			<Icon type = { glyph } className = { styles.icon } />
			<div className = { styles.message }>
				<span className = "button-medium">
					{ provider }
				</span>
				{ caption &&
					<span className = "button-tiny">
						{ caption }
					</span>
				}
			</div>
		</div>
	);
});

export default MiniInfo;