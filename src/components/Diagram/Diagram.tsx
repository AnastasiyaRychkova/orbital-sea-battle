import React from 'react';
import CellSymbol from './CellSymbol';
import DiagramField from './DiagramField';
import panzoom from 'panzoom';
import type {PanZoom} from 'panzoom';

interface IProps {
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

	componentDidMount()
	{
		if( this.field.current )
		{
			if( this.isZooming ) {
				this.zoomHandle = panzoom( this.field.current, {
					bounds: true,
					boundsPadding: 0.3,
					maxZoom: 3,
					minZoom: 0.1,
					onTouch: (e) => {
						console.log(e);
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
		if( this.zoomHandle && this.field.current && !this.#fixed ) {
			console.log( 'fix', this.field.current.style.transform );
			this.field.current.style.removeProperty( 'transform' );
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
				xmlns="http://www.w3.org/2000/svg">

				<defs>
					<CellSymbol />
				</defs>
				<g ref={this.field} id='diagram-field'>
						<DiagramField />
				</g>

			</svg>
		)
	}

}

export default Diagram;