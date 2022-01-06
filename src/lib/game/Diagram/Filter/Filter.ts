import { makeObservable, observable, action, computed } from "mobx";
import {
	MainQN,
	OrbitalQN,
	MagneticQN,
	SpinQN,
	QuantumNumbers,
	CellQN,
} from "../../ChemicalElement/QuantumNumbers";

import IFilter, { StoreKey, FilterEvent, FilterEventData, StringState } from "./FilterInterface.d";
import INote from "./NoteInterface";
import CheckboxNote from "./CheckboxNote";
import IQNScheme from "../../ChemicalElement/QNSchemeInterface";
import EventProvider from "../../../util/EventEmitter/EventProvider";



type StoreType = {
	[key in StoreKey]: INote;
};


/**
 * **Фильтр элементов диаграммы**
 * 
 * Вычисляет, какие элементы диаграммы соответствуют заданным квантовым числам
 */
class Filter extends EventProvider<FilterEvent, FilterEventData> implements IFilter
{
	store: StoreType;
	_disabled: boolean;
	private _converter: IQNScheme;

	private readonly _stateScheme = {
		n: 0,
		l: 1,
		m: 2,
		s: 3,
	};


	constructor( qnConverter: IQNScheme )
	{
		super();
		makeObservable( this, {
			store: observable,
			_disabled: observable,

			disabled: computed,
			state: computed,
			doesSpecifyCell: computed,
			_stateAsString: computed,

			setValue: action,
			setDisable: action,
			reset: action,
		});

		this.store = this._createDefaultStore();
		this._disabled = true;
		this._converter = qnConverter;
	}

	
	get disabled(): boolean
	{
		return this._disabled;
	}

	set disabled( isDisabled : boolean )
	{
		this._disabled = isDisabled;
	}


	private _createDefaultStore(): StoreType
	{
		return {
			n: new CheckboxNote(),
			l: new CheckboxNote(),
			m: new CheckboxNote(),
			s: new CheckboxNote(),
		};
	}

	getValue = ( key: StoreKey ) =>
		this._get( key ).getAsString();

	setValue = ( key: StoreKey, value: string ) => {
		if( this._disabled )
			return;

		const note = this._get( key );
		note.set( this._makeQN( key, value ) );

		this._emit(
			'changed',
			{
				state: this._stateAsString,
				scheme: this._stateScheme,
			}
		);
		return this;
	};

	private _get( key: StoreKey ): INote
	{
		return this.store[ key ];
	}

	private _makeQN( key: StoreKey, value: string )
	{
		switch( key )
		{
			case 'n':
				return new MainQN( parseInt( value ) );
			case 'l':
				return new OrbitalQN( value );
			case 'm':
				return new MagneticQN( parseInt( value ) );
		
			default:
				return new SpinQN( value === '+1/2' ? 1 : -1 );
		}
	}


	isDisable = ( key: StoreKey ) => {
		return this._disabled || this._get( key ).isDisabled();
	}

	setDisable = ( key: StoreKey, value: boolean ) => {
		this._get( key ).setDisabled( value );
	};

	

	isShipSelected( qn: QuantumNumbers ): boolean
	{
		return !this._isFilterSetted( 's' )
			&& !this._isFilterSetted( 'm' )
			&& this._checkFilters( qn, ['n', 'l'], true );
	}

	isContainerSelected( qn: QuantumNumbers ): boolean
	{
		return !this._isFilterSetted( 's' )
			&& this._isEqualQN( qn, 'm' )
			&& this._checkFilters( qn, ['n', 'l'] );
	}

	isCellSelected( qn: QuantumNumbers ): boolean
	{
		return this._isEqualQN( qn, 's' )
			&& this._checkFilters( qn, ['n', 'l', 'm'] );
	}

	/**
	 * Проверить, проходит ли проверку образец по фильтру.
	 * 
	 * Фильтр может содержать деактивированные или неустановленные значения. Они не мешают поверке.
	 * @param qn Образец
	 * @param keys Проверяемые квантовые числа
	 * @returns Соответствует ли образец фильтру
	 */
	private _checkFilters( qn: QuantumNumbers, keys: StoreKey[], strict: boolean = false ): boolean
	{
		let equalFilters = 0;

		for( const key of keys ) {
			const note = this._get( key )!;

			if( note.isSat() )
			{
				if( note.isEqual( qn[ key ] ) )
					equalFilters++;
				else
					return false;
			}
		}
		return strict ? equalFilters > 0 : true;
	}

	/**
	 * Проверка на эквивалентность с учетом статуса активации фильтра
	 * @param qn Образец
	 * @param keys Проверяемые квантовые числа
	 * @returns Есть ли точное совпадение
	 */
	private _isEqualQN( qn: QuantumNumbers, key: StoreKey ): boolean
	{
		const note = this._get( key )!;
		return !note.isDisabled() && note.isEqual( qn[ key ] );;
	}

	private _isFilterSetted( key: StoreKey ): boolean
	{
		return this._get( key ).isSat();
	}

	get doesSpecifyCell(): boolean
	{
		if( this._disabled )
			return false;

		for( const qNumber of Object.values(this.store) ) {
			if( !qNumber.isSat() ) {
				return false;
			}
		}
		const state = this.state;
		return this._converter.getCellIndex( state as CellQN ) !== undefined;
	}

	get state(): QuantumNumbers
	{
		return {
			n: this._get( 'n' ).get() as MainQN | undefined,
			l: this._get( 'l' ).get() as OrbitalQN | undefined,
			m: this._get( 'm' ).get() as MagneticQN | undefined,
			s: this._get( 's' ).get() as SpinQN | undefined,
		}
	}

	get _stateAsString(): StringState
	{
		return Object.values(this.store)
					 .map((value) => value.getAsString()) as StringState;
	}

	reset(): void
	{
		this.store = this._createDefaultStore();
	}
}

export default Filter;