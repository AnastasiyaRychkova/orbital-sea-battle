import { makeObservable, observable, action } from "mobx"

import {
	EDiagramCellState as CellState,
	DiagramCell,
} from '../ChemicalElement/DiagramCell';
import ElemConfig from '../ChemicalElement/ElemConfig';
import PeriodicTable from '../PeriodicTable';
import DiagramStateType from './DiagramInterface';
import DiagramStructure from './DiagramStructure';


/** Статическая диаграмма, которой можно задать отображаемый элемент */
export default class DiagramStatic implements DiagramStateType
{
	element: ElemConfig;

	constructor( elemNumber: number = 0 )
	{
		makeObservable( this, {
			
			element: observable,
			
			setElementByNumber: action,
		});
		this.element = PeriodicTable.getByNumber( elemNumber ).config;
	}

	getShipPropsByName( name: string ): {
		firstCellIndex: number,
		length: number,
	}
	{
		const shipProps = DiagramStructure.get( name );
		return shipProps ? {
				firstCellIndex: shipProps.firstCellIndex,
				length: shipProps.length,
			}
			: {
				firstCellIndex: 1,
				length: 1,
			}
	}
	
	getCellState( index: number ): CellState
	{
		return this.element.hasSpin( new DiagramCell( index ) )
					? CellState.on
					: CellState.off;
	}

	isLastShot(): boolean
	{
		return false;
	}

	isCellSelected(): boolean
	{
		return false;
	}

	isContainerSelected(): boolean
	{
		return false;
	}

	isShipSelected(): boolean
	{
		return false;
	}


	setElementByNumber( elemNumber: number ): void
	{
		this.element = PeriodicTable.getByNumber( elemNumber ).config;
	}
}
