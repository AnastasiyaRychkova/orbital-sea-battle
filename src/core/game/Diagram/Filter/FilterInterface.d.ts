import IEventProvider from "../../../util/EventEmitter/EventProviderInterface";
import type {
	IQuantumNumber,
	QuantumNumbers,
	QNStrType,
} from '../../Services/Chemistry';
import INote from "./NoteInterface";

export type StoreKey = QNStrType;

export type StringState = [string, string, string, string];

export type FilterEvent = 'change';
export type FilterEventData = {
	state: StringState,
}


export default interface IFilter extends IEventProvider<FilterEvent>
{
	getValue( key: StoreKey ): number | undefined;
	getValueAsString( key: StoreKey ): string;
	setValue( key: StoreKey, value?: string ): void;

	minValid( key: StoreKey ): number;
	maxValid( key: StoreKey ): number;
	
	isDisable( key: StoreKey ): boolean; // TOTHINK: Может переименовать на isOn() и switch()?
	setDisable( key: StoreKey, newState: boolean ): void;

	state: QuantumNumbers;
	setState( qn: QuantumNumbers ): void;
	reset(): void;

	disabled: boolean;
	mode: ''|'block'|'box'|'cell';
	isBoxMode: boolean;

	_get( key: StoreKey ): INote;
}
