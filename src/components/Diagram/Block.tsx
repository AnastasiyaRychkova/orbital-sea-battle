import React, {FC} from 'react';
import { observer } from 'mobx-react';
import { MainQN, OrbitalQN, BlockQN } from '../../core/game/ChemicalElement/QuantumNumbers';
import Container from './Container';
import ShipName from './ShipName';
import ShipSelection from './ShipSelection';
import type { Coordinates } from './types';
import type{ IBlock } from '../../core/game/Diagram/DObjectState.d';

import {
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH,
} from './properties';

const COLUMN_SPACING = 30;
const LINE_SPACING = 30;
const NAME_X_OFFSET = -8;
const NAME_Y_OFFSET = 64;

const COL_WIDTH: readonly number[] = [ 1, 3, 5, 7, 7, 5, 3 ];
const COL_WIDTH_INTEGRAL: readonly number[] = [ 0, 1, 4, 9, 16, 23, 28 ];



interface IProps {
	block: IBlock,
}


const Ship: FC<IProps> = observer(( {
	block,
} ) => {
	const location = calcCoordinates( block.qn );
	const name = makeName( block.qn );
	const maxM = block.qn.l.value;

	return (
		<g>
			<ShipSelection
				location={location}
				block={block} >
				{
					Object.entries( block.children )
						.map( ([ key, box ] ) => (
						<Container
							key={name + key}
							x={location.x + (maxM - box.qn.m.value) * CONTAINER_WIDTH}
							y={location.y}
							box={box}
							/>
					) )
				}
			</ShipSelection>
			<ShipName
				x={location.x + NAME_X_OFFSET}
				y={location.y + NAME_Y_OFFSET}
				name={name}
			/>
		</g>

	);
});

export default Ship;




function makeName( qn: BlockQN ): string
{
	return qn.n.toString() + qn.l.toString();
}

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

/**
 * Вычисляет координаты верхнего левого угла корабля
 * @param qn Квантовые числа блока
 * @returns Координаты верхнего левого угла корабля
 */
function calcCoordinates( qn: BlockQN ): Coordinates
{
	return {
		x: getX( qn.n, qn.l ),
		y: getY( qn.n, qn.l ),
	};
}

/**
 * Вычисляет координату X верхнего левого угла корабля
 * @param n Главное число корабля
 * @param l Орбитальное число корабля
 * @returns Координату X верхнего левого угла корабля
 */
function getX( n: MainQN, l: OrbitalQN ): number
{
	const i = n.value - 1;
	return ( COL_WIDTH_INTEGRAL[i] + ( COL_WIDTH[i] - calcLength( l ) ) / 2 ) * CONTAINER_WIDTH + i * COLUMN_SPACING;
}

/**
 * Вычисляет координату Y верхнего левого угла корабля
 * @param n Главное число корабля
 * @param l Орбитальное число корабля
 * @returns Координату Y верхнего левого угла корабля
 */
function getY( n: MainQN, l: OrbitalQN ): number
{
	return ( 8 - n.value - l.value ) * ( CONTAINER_HEIGHT + LINE_SPACING );
}