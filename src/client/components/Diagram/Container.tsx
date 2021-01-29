import React from 'react';
import {
	CONTAINER_HEIGHT,
	CONTAINER_WIDTH,
	makeContainerClass
} from './properties';
import { ContainerProps } from './types';

function Container( props: ContainerProps ) {
	return (
		<g>
			<rect className={makeContainerClass( props.schema )} x={props.x} y={props.y} width={CONTAINER_WIDTH} height={CONTAINER_HEIGHT} stroke="#51CF15" stroke-width="1" fill="none" />
			{ props.children }
		</g>
	);
}

/* <UpCell schema={props.schema.upCell} x={props.x} y={props.y} />
<DownCell schema={props.schema.upCell} x={props.x + CELL_WIDTH} y={props.y} /> */

export default Container;