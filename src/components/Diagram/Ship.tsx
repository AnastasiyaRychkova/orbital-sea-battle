import React from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';

import {
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH,
	COLUMN_SPACING,
	LINE_SPACING,
	NAME_X_OFFSET,
	NAME_Y_OFFSET,
} from './properties';

import Container from './Container';
import ShipName from './ShipName';

import { MainQN, OrbitalQN, MagneticQN, ShipQN } from '../../lib/game/ChemicalElement/QuantumNumbers';
import type { Coordinates } from './types';
import IGameFieldController from '../../lib/game/Diagram/GameFieldControllerInterface';

import styles from './diagram.module.css';


const COL_WIDTH: readonly number[] = [ 1, 3, 5, 7, 7, 5, 3 ];
const COL_WIDTH_INTEGRAL: readonly number[] = [ 0, 1, 4, 9, 16, 23, 28 ];

interface IProps {
	qn: ShipQN,
	controller?: IGameFieldController,
}

type ShipProps = {
	name: string,
	length: number,
	coordinates: Coordinates,
}


const Ship = inject( "controller" )(observer(( props: IProps ) =>
{
	const { n = new MainQN( 1 ),
		l = new OrbitalQN( 's' ) } = props.qn;

	const shipProps: ShipProps = {
			name: makeName( n, l ),
			length: calcLength( l ),
			coordinates: calcCoordinates( n, l ),
		}

	return (
		<g>
			{ buildShip( n, l, shipProps ) }

			<ShipName
				x={shipProps.coordinates.x + NAME_X_OFFSET}
				y={shipProps.coordinates.y + NAME_Y_OFFSET}
				name={shipProps.name}
			/>
			<rect
				className={makeShipClass( props )}
				x={shipProps.coordinates.x}
				y={shipProps.coordinates.y}
				width={CONTAINER_WIDTH * shipProps.length}
				height={CONTAINER_HEIGHT}
				fill="none"
			/>
		</g>
	);
}));

export default Ship;




function makeName( n: MainQN, l: OrbitalQN ): string
{
	return n.toString() + l.toString();
}

function makeShipClass( props: IProps ): string
{
	return classNames({
		[styles.selected]: props.controller!.filter.isShipSelected( props.qn ),
		[styles.ship]: true,
	});
}

function buildShip( n: MainQN,
					l: OrbitalQN,
					{	length,
						coordinates,
						name
					}: ShipProps ): Array<JSX.Element>
{
	let m = calcSmallestMagneticNumber( length );
	const ship = [];
	let { x, y } = coordinates;

	for (let i = 0; i < length; i++) {
		ship.push(
			<Container
				key={name + m}
				x={x}
				y={y}
				qn={{n: n,
					l: l,
					m: new MagneticQN( m ),}}
			/>
		);

		m++;
		x += CONTAINER_WIDTH;
	}

	return ship;
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
 * @param n Главное число корабля
 * @param l Орбитальное число корабля
 * @returns Координаты верхнего левого угла корабля
 */
function calcCoordinates( n: MainQN, l: OrbitalQN ): Coordinates
{
	return {
		x: getX( n, l ),
		y: getY( n, l ),
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

/**
 * Вычисляет наименьшее магнитное число для корабля
 * @param length Длина корабля
 * @returns Магнитное число самого левого контейнера в корабле
 */
function calcSmallestMagneticNumber( length: number ): number
{
	/* 
	len	m
	1	0
	3	-1
	5	-2
	7	-3
	*/
	return Math.floor( length / 2 ) * (-1);
}