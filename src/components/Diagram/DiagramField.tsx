import React, {FC} from 'react';
import { observer } from 'mobx-react';
import Ship from './Ship';
import IDiagram from '../../core/game/Diagram/DiagramInterface';


interface IProps {
	diagram: IDiagram,
}


const DiagramField: FC<IProps> = observer(({
	diagram,
}) => {
	const state = diagram.observableState;
	return (
		<g>
			<Ship block={state.getBlock( '1', 's' )!}
			/>
			<Ship block={state.getBlock( '2', 's' )!}
			/>
			<Ship block={state.getBlock( '2', 'p' )!}
			/>
			<Ship block={state.getBlock( '3', 's' )!}
			/>
			<Ship block={state.getBlock( '3', 'p' )!}
			/>
			<Ship block={state.getBlock( '3', 'd' )!}
			/>
			<Ship block={state.getBlock( '4', 's' )!}
			/>
			<Ship block={state.getBlock( '4', 'p' )!}
			/>
			<Ship block={state.getBlock( '4', 'd' )!}
			/>
			<Ship block={state.getBlock( '4', 'f' )!}
			/>
			<Ship block={state.getBlock( '5', 's' )!}
			/>
			<Ship block={state.getBlock( '5', 'p' )!}
			/>
			<Ship block={state.getBlock( '5', 'd' )!}
			/>
			<Ship block={state.getBlock( '5', 'f' )!}
			/>
			<Ship block={state.getBlock( '6', 's' )!}
			/>
			<Ship block={state.getBlock( '6', 'p' )!}
			/>
			<Ship block={state.getBlock( '6', 'd' )!}
			/>
			<Ship block={state.getBlock( '7', 's' )!}
			/>
			<Ship block={state.getBlock( '7', 'p' )!}
			/>
		</g>
	);
});

export default DiagramField;