import React, {FC} from 'react';
import { observer } from 'mobx-react';
// import cn from 'classnames';
import styles from './diagram.module.css';

import {
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH,
	SHIP_BORDER,
	BACK_WIDTH,
} from './properties';
import type { IBlock } from '../../core/game/Diagram/DObjectState.d';
import type { Coordinates } from './types';



interface IProps {
	location: Coordinates,
	length: number,
	block: IBlock,
}


const ShipSilhouette: FC<IProps> = observer(({
	location,
	length,
	block,
}) => {
	return (
		<g onClick={block.onClick}>
			<use href='#ship_back'
				className={styles.shipSilhouette}
				x={location.x}
				y={location.y}
				/>
			<rect
				className={styles.shipSilhouette}
				x={location.x + BACK_WIDTH}
				y={location.y}
				width={CONTAINER_WIDTH * length}
				height={CONTAINER_HEIGHT+SHIP_BORDER*2}
				/>
			<rect
				className={styles.containersBg}
				x={location.x + BACK_WIDTH}
				y={location.y + SHIP_BORDER}
				width={CONTAINER_WIDTH * length}
				height={CONTAINER_HEIGHT}
				/>
			<use href='#ship_front'
				className={styles.shipSilhouette}
				x={location.x+BACK_WIDTH+CONTAINER_WIDTH*length}
				y={location.y}
				/>
		</g>
	);
});


export default ShipSilhouette;