import React from 'react';
import CellSymbol from './CellSymbol';
import DiagramField from './DiagramField';
import panzoom from 'panzoom';
import type {PanZoom} from 'panzoom';
import IDiagram from '../../core/game/Diagram/DiagramInterface';
import ShipFrontSymbol from './ShipFrontSymbol';
import ShipBackSymbol from './ShipBackSymbol';

interface IProps {
	diagram: IDiagram,
	zooming: boolean,
	className: string,
	style?: 'normal'|'ships',
}

class Diagram extends React.Component<IProps>
{
	fieldRef: React.RefObject<SVGGElement>;
	zoomHandle: PanZoom|null;
	isZooming: boolean;

	constructor( props: IProps )
	{
		super( props );
		this.fieldRef = React.createRef();
		this.zoomHandle = null;
		this.isZooming = this.props.zooming;
	}

	componentDidMount()
	{
		if( this.fieldRef.current )
		{
			if( this.isZooming ) {
				this.zoomHandle = panzoom( this.fieldRef.current, {
					bounds: true,
					boundsPadding: 0.3,
					maxZoom: 3,
					minZoom: 0.1,
					onTouch: (e) => {
						return false;
					}
				} );
				//FIXME: шваберка 😉 подключенная библиотека добавляет атрибут style, блокирующий свою же функциональность
				this.__subscribeOnFix();
			}
				
			;
		}
	}

	componentWillUnmount()
	{
		if( this.zoomHandle ) {
			this.zoomHandle?.dispose();
			!this.#fixed && this.__unsubscribeOnFix();
		}
	}

	#fixed = false;

	__subscribeOnFix()
	{
		this.#fixed = false;

		this.zoomHandle!.on(
			'panstart',
			this.__fix
		);
		this.zoomHandle!.on(
			'zoom',
			this.__fix
		);
	}

	__unsubscribeOnFix = () => {
		this.zoomHandle!.off(
			'panstart',
			this.__fix
		);

		this.zoomHandle!.off(
			'zoom',
			this.__fix
		);
	}

	__fix = () => {
		if( this.zoomHandle && this.fieldRef.current && !this.#fixed ) {
			console.log( 'fix', this.fieldRef.current.style.transform );
			this.fieldRef.current.style.removeProperty( 'transform' );
			this.#fixed = true;
			this.__unsubscribeOnFix();
		}
	}


	render() {
		return(
			<svg className={(this.props as IProps).className}
				viewBox="-50 -2 1520 602"
				fill="none"
				preserveAspectRatio="xMidYMid meet"
				xmlns="http://www.w3.org/2000/svg"
				data-mode={this.props.diagram.mode}
				data-style={this.props.style || 'normal'}>

				<defs>
					<CellSymbol />
					{
						this.props.style === 'ships'
						?
							<>
							<ShipFrontSymbol />
							<ShipBackSymbol />
							</>
						: null
					}
				</defs>
				<g
					ref={this.fieldRef}
					id='diagram-field'>
					
					<DiagramField
						diagram={this.props.diagram}
						style={this.props.style || 'normal'} />
				</g>

			</svg>
		)
	}

}

export default Diagram;