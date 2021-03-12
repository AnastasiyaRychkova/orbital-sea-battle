import React from 'react';
import CellSymbol from './CellSymbol';
import DiagramField from './DiagramField';
import type DiagramStateType from '../../lib/game/Diagram/DiagramInterface';
import panzoom from 'panzoom';
import type {PanZoom} from 'panzoom';

interface IProps {
	diagram: DiagramStateType,
	zooming: boolean,
	className: string,
}

class Diagram extends React.Component<IProps>
{
	field: React.RefObject<SVGGElement>;
	zoomHandle: PanZoom|null;
	isZooming: boolean;

	constructor( props: IProps )
	{
		super( props );
		this.field = React.createRef();
		this.zoomHandle = null;
		this.isZooming = this.props.zooming;
	}

	componentDidMount() {
		if( this.isZooming )
			this.zoomHandle = this.field.current && panzoom( this.field.current, {
				bounds: true,
				boundsPadding: 0.3,
				maxZoom: 3,
				minZoom: 0.5,
			} );
	}

	componentWillUnmount() {
		this.zoomHandle?.dispose();
	}

	render() {
		return(
			<svg className={(this.props as IProps).className} viewBox="-30 -2 1520 602" fill="none" preserveAspectRatio="xMidYMid meet">
				<defs>
					<CellSymbol />
				</defs>
				<g ref={this.field}>
					<DiagramField diagram={(this.props as IProps).diagram} />
				</g>
			</svg>
		)
	}

}

export default Diagram;