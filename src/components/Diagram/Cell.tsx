import React, {FC} from 'react';
import { observer } from 'mobx-react';
import cn from 'classnames';
import {
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH
} from './properties';
import styles from './cell.module.css';
import type { ICell } from '../../core/game/Diagram/DObjectState.d';



interface IProps {
	x: number,
	y: number,
	cell: ICell,
}


const Cell: FC<IProps> = observer(({
	x,
	y,
	cell,
}) =>
{
	/* const fn = () => {
			props.controller!.cellClickFunction( props.qn )
		}; */

	return (
		<use href="#cell"
			className={cn({
				[styles.cell]: true,
				[styles.selected]: cell.selected,
				[styles.damage]: cell.damage,
				[styles.filtered]: cell.filtered,
				[styles.highlighted]: cell.highlighted,
			})}
			x={x}
			y={y}
			onClick={cell.onClick}

			transform={cell.qn.s.value < 0
						? "rotate( 180 "+(x + CONTAINER_WIDTH/4)+" "+(y + CONTAINER_HEIGHT/2)+")"
						: "rotate(0)"}
		/>
	);
});

export default Cell;
