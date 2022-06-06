import React, {FC} from 'react';
import { observer } from 'mobx-react';
import Ship from './Ship';
import IDiagram from '../../core/game/Diagram/DiagramInterface';
import Chemistry from '../../core/game/Services/Chemistry';

const block = Chemistry.block;

interface IProps {
	diagram: IDiagram,
}


const DiagramField: FC<IProps> = observer(({
	diagram,
}) => {
	const state = diagram.observableState;
	return (
		<g>
			<Ship block={state.getBlock( block({ n: 1, l: 's' }) )!} />
			<Ship block={state.getBlock( block({ n: 2, l: 's' }) )!} />
			<Ship block={state.getBlock( block({ n: 2, l: 'p' }) )!} />
			<Ship block={state.getBlock( block({ n: 3, l: 's' }) )!} />
			<Ship block={state.getBlock( block({ n: 3, l: 'p' }) )!} />
			<Ship block={state.getBlock( block({ n: 3, l: 'd' }) )!} />
			<Ship block={state.getBlock( block({ n: 4, l: 's' }) )!} />
			<Ship block={state.getBlock( block({ n: 4, l: 'p' }) )!} />
			<Ship block={state.getBlock( block({ n: 4, l: 'd' }) )!} />
			<Ship block={state.getBlock( block({ n: 4, l: 'f' }) )!} />
			<Ship block={state.getBlock( block({ n: 5, l: 's' }) )!} />
			<Ship block={state.getBlock( block({ n: 5, l: 'p' }) )!} />
			<Ship block={state.getBlock( block({ n: 5, l: 'd' }) )!} />
			<Ship block={state.getBlock( block({ n: 5, l: 'f' }) )!} />
			<Ship block={state.getBlock( block({ n: 6, l: 's' }) )!} />
			<Ship block={state.getBlock( block({ n: 6, l: 'p' }) )!} />
			<Ship block={state.getBlock( block({ n: 6, l: 'd' }) )!} />
			<Ship block={state.getBlock( block({ n: 7, l: 's' }) )!} />
			<Ship block={state.getBlock( block({ n: 7, l: 'p' }) )!} />
		</g>
	);
});

export default DiagramField;