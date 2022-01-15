import React, {FC} from 'react';
import cn from 'classnames';
import type { BoxType } from '../../lib/game/Diagram/ObjectState.d';
import styles from './diagram.module.css';

import {
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH,
} from './properties';



interface IProps {
	x: number,
	y: number,
	box: BoxType,
}


const ContainerSelection: FC<IProps> = ({
	x,
	y,
	box,
}) => {
	return (
		<rect
			className={cn({
				[styles.container]: true,
				[styles.filtered]: box.filtered,
			})}
			x={x}
			y={y}
			width={CONTAINER_WIDTH}
			height={CONTAINER_HEIGHT}
			strokeWidth="1"
		/>
	);
};


export default ContainerSelection;