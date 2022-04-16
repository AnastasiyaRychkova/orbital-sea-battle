import React, {FC} from 'react';
import cn from 'classnames';
import { OrbitalQN } from '../../core/game/ChemicalElement/QuantumNumbers';
import type { BlockType } from '../../core/game/Diagram/DObjectState';
import type { Coordinates } from './types';
import styles from './diagram.module.css';

import {
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH,
} from './properties';
import { observer } from 'mobx-react';



interface IProps {
	location: Coordinates,
	block: BlockType,
	children: React.ReactNode,
}


const ShipSelection: FC<IProps> = observer(({
	location,
	block,
	children,
}) => {
	const length = calcLength( block.qn.l );

	return (
		<>
		<rect
			className={cn({
				[styles.highlighted]: block.highlighted,
				[styles.shipFill]: true,
			})}
			x={location.x}
			y={location.y}
			width={CONTAINER_WIDTH * length}
			height={CONTAINER_HEIGHT}
		/>
		
		{children}
		
		<rect
			className={cn({
				[styles.filtered]: block.filtered,
				[styles.highlighted]: block.highlighted,
				[styles.shipStroke]: true,
			})}
			x={location.x}
			y={location.y}
			width={CONTAINER_WIDTH * length}
			height={CONTAINER_HEIGHT}
			fill="none"
			/>
		</>
	);
});


/**
 * Вычисление длины корабля по его орбитальному числу
 * @param l Орбитальное число корабля
 * @returns Длина корабля
 */
 function calcLength( l: OrbitalQN ): number {
	/* 
	Определение члена арифметической последовательности
	с a1 = 1 и шагом d = 2 (1, 3, 5, 7)
	an = a1 + d(n - 1)
	an = 1 + 2((l + 1) - 1)
	*/
	return 2 * l.value + 1;
}



export default ShipSelection;