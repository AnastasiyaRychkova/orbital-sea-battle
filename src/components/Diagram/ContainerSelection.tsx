import React, {FC} from 'react';
import cn from 'classnames';
import type { BoxType } from '../../lib/game/Diagram/DObjectState.d';
import styles from './diagram.module.css';

import {
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH,
} from './properties';
import { observer } from 'mobx-react';



interface IProps {
	x: number,
	y: number,
	box: BoxType,
}


const ContainerSelection: FC<IProps> = observer(({
	x,
	y,
	box,
}) => {
	return (
		<rect
			className={cn({
				[styles.container]: true,
				[styles.filtered]: box.filtered,
				[styles.highlighted]: box.highlighted,
			})}
			x={x}
			y={y}
			width={CONTAINER_WIDTH}
			height={CONTAINER_HEIGHT}
			strokeWidth="1"
		/>
	);
});


export default ContainerSelection;