import React from 'react';

import Ship from './Ship';


function DiagramField( props:any ) {
	return (
		<g>
			<Ship
				column={0} row={0} vertLine={0}
				diagram={props.diagram}
				name="1s"
			/>
			<Ship
				column={1} row={1} vertLine={2}
				diagram={props.diagram}
				name="2s"
			/>
			<Ship
				column={1} row={2} vertLine={1}
				diagram={props.diagram}
				name="2p"
			/>
			<Ship
				column={2} row={2} vertLine={6}
				diagram={props.diagram}
				name="3s"
			/>
			<Ship
				column={2} row={3} vertLine={5}
				diagram={props.diagram}
				name="3p"
			/>
			<Ship
				column={2} row={4} vertLine={4}
				diagram={props.diagram}
				name="3d"
			/>
			<Ship
				column={3} row={3} vertLine={12}
				diagram={props.diagram}
				name="4s"
			/>
			<Ship
				column={3} row={4} vertLine={11}
				diagram={props.diagram}
				name="4p"
			/>
			<Ship
				column={3} row={5} vertLine={10}
				diagram={props.diagram}
				name="4d"
			/>
			<Ship
				column={3} row={6} vertLine={9}
				diagram={props.diagram}
				name="4f"
			/>
			<Ship
				column={4} row={4} vertLine={19}
				diagram={props.diagram}
				name="5s"
			/>
			<Ship
				column={4} row={5} vertLine={18}
				diagram={props.diagram}
				name="5p"
			/>
			<Ship
				column={4} row={6} vertLine={17}
				diagram={props.diagram}
				name="5d"
			/>
			<Ship
				column={4} row={7} vertLine={16}
				diagram={props.diagram}
				name="5f"
			/>
			<Ship
				column={5} row={5} vertLine={25}
				diagram={props.diagram}
				name="6s"
			/>
			<Ship
				column={5} row={6} vertLine={24}
				diagram={props.diagram}
				name="6p"
			/>
			<Ship
				column={5} row={7} vertLine={23}
				diagram={props.diagram}
				name="6d"
			/>
			<Ship
				column={6} row={6} vertLine={29}
				diagram={props.diagram}
				name="7s"
			/>
			<Ship
				column={6} row={7} vertLine={28}
				diagram={props.diagram}
				name="7p"
			/>
		</g>
	);
}

export default DiagramField;