import React from 'react';
import { observer } from 'mobx-react';
import DownCell from './DownCell';
import {
	CELL_WIDTH,
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH,
	makeContainerClass
} from './properties';
import { ContainerProps } from './types';
import UpCell from './UpCell';

const Container = observer(( props: ContainerProps ) => {
	return (
		<g>
			<rect
				className={makeContainerClass( props.upCell, props.diagram )}
				x={props.x}
				y={props.y}
				width={CONTAINER_WIDTH}
				height={CONTAINER_HEIGHT}
				stroke="#51CF15"
				stroke-width="1"
				fill="none"
			/>
			<UpCell
				x={props.x}
				y={props.y}
				diagram={props.diagram}
				index={props.upCell}
			/>
			<DownCell
				x={props.x + CELL_WIDTH}
				y={props.y}
				diagram={props.diagram}
				index={props.downCell}
			/>
		</g>
	);
});


export default Container;