import { makeObservable, observable, action } from "mobx"

import {
	EDiagramCellState as CellState,
	CellIndex,
} from '../ChemicalElement/DiagramCell';
import { CellQN, BlockQN } from "../ChemicalElement/QuantumNumbers";
import PeriodicTable from '../ChemicalElement/PeriodicTable';
// import DiagramStateType from './DiagramInterface';
import ElemConfig from "../ChemicalElement/ElemConfig";
// import DiagramStructure from './DiagramStructure';


/** Статическая диаграмма, которой можно задать отображаемый элемент */
export default class DiagramStatic
{
	element: ElemConfig;

	constructor( elemNumber: number = 0 )
	{
		makeObservable( this, {
			
			element: observable,
			
			setElementByNumber: action,
		});
		this.element = PeriodicTable.element( elemNumber ).config;
	}
	setCellState(quantumNumbers: CellQN, state: boolean): void {
		throw new Error("Method not implemented.");
	}
	get disabled(): boolean {
		throw new Error("Method not implemented.");
	}
	set disabled(disable: boolean) {
		throw new Error("Method not implemented.");
	}
	toggleCell(quantumNumbers: CellQN): void {
		throw new Error("Method not implemented.");
	}
	toggleShip(quantumNumbers: BlockQN): void {
		throw new Error("Method not implemented.");
	}
	aim(quantumNumbers: CellQN): void {
		throw new Error("Method not implemented.");
	}
	setState(): void {
		throw new Error("Method not implemented.");
	}
	reset(): void {
		throw new Error("Method not implemented.");
	}
	
	getCellState( quantumNumbers: CellQN ): CellState
	{
		const index = PeriodicTable.converterDeprecated.getCellIndex( quantumNumbers );

		return index 
				? this.element.hasSpin( index )
							? CellState.on
							: CellState.off
				: CellState.off;
	}

	isLastShot(): boolean
	{
		return false;
	}

	setElementByNumber( elemNumber: number ): void
	{
		this.element = PeriodicTable.element( elemNumber ).config;
	}
}
