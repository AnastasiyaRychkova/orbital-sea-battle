import React, {FC} from 'react';
import { observer } from 'mobx-react';
import Cell from './Cell';
import ContainerSelection from './ContainerSelection';
import type { BoxType } from '../../lib/game/Diagram/DObjectState.d';
import { CELL_WIDTH } from './properties';


interface IProps {
	x: number,
	y: number,
	box: BoxType,
}


const Container: FC<IProps> = observer(({
	x,
	y,
	box,
}) => {
	return (
		<g>
			<ContainerSelection
				x={x} y={y}
				box={box} />

			<Cell
				x={x + 2}
				y={y + 4}
				cell={box.children['+1/2']}
			/>
			<Cell
				x={x + CELL_WIDTH - 2}
				y={y - 4}
				cell={box.children['−1/2']}
			/>
		</g>
	);
});


export default Container;