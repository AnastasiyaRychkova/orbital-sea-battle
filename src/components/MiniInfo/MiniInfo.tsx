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

	/** Расположение элементов внутри */
	orientation?: "horizontal" | "vertical";

	/** Имеет ли тень */
	hasShadow?: boolean;

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
	orientation = "horizontal",
	hasShadow = false,
	className,
}) => {
	return (
		<div className = { cn( styles, ["box", orientation, (hasShadow ? "shadow" : "")], className ) }>
			
			<Icon type = {glyph} className = {styles.icon} />

			<div className = {styles.value}>
				<span className = "button-medium">
					{ provider }
				</span>
			</div>

			{ caption &&
				<div className = {styles.caption + " button-tiny"}>
					{ caption }
				</div>
			}
		</div>
	);
});

export default MiniInfo;