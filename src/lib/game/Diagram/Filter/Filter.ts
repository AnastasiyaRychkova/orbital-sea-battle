import { makeObservable, observable, action, computed } from "mobx";
import {
	MainQN,
	OrbitalQN,
	MagneticQN,
	SpinQN,
	QuantumNumbers,
} from "../../ChemicalElement/QuantumNumbers";

import IFilter, { StoreKey, FilterEvent, FilterEventData, StringState } from "./FilterInterface.d";
import INote from "./NoteInterface";
import CheckboxNote from "./CheckboxNote";
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
	mode: ''|'block'|'box'|'cell';
	_disabled: boolean;


	constructor()
	{
		super();
		makeObservable( this, {
			store: observable,
			_disabled: observable,
			mode: observable,

			disabled: computed,
			state: computed,
			_stateAsString: computed,

			setValue: action,
			setDisable: action,
			setState: action,
			reset: action,
			_updateMode: action,
		});

		this.store = this._createDefaultStore();
		this.mode = '';
		this._disabled = false;
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

	_updateMode()
	{
		if( this.store.s.isSat() )
		{
			this.mode = 'cell';
			return;
		}
		if( this.store.m.isSat() )
		{
			this.mode = 'box';
			return;
		}
		if( this.store.l.isSat() || this.store.n.isSat() )
		{
			this.mode = 'block';
			return;
		}
		this.mode = '';
	}

	get isBoxMode(): boolean
	{
		return this.mode === 'box';
	}

	getValue = ( key: StoreKey ) =>
		this._get( key ).get()?.value;

	getValueAsString = (key: StoreKey) =>
		this._get( key ).get()?.toString() || '';

	setValue = ( key: StoreKey, value: string ) => {
		if( this._disabled )
			return;

		this._get( key ).set( this._makeQN( key, value ) );
		this._updateMode();

		this._emit(
			'change',
			{
				state: this._stateAsString,
			}
		);
		return this;
	};

	_get( key: StoreKey ): INote
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
		this._updateMode();
	};


	minValid( key: StoreKey ): number
	{
		switch( key )
		{
			case 'n':
				return Math.max(
					this._isSat( 'l' )
							? this._get( 'l' ).get()!.value + 1 : MainQN.MIN,
					this._isSat( 'm' )
							? Math.abs( this._get( 'm' ).get()!.value ) + 1 : MainQN.MIN,
				); // max( l+1, |m|+1 )
			
			case 'l':
				return this._isSat( 'm' )
							? Math.abs( this._get( 'm' ).get()!.value )
							: OrbitalQN.MIN;
			case 'm':
				return Math.max(
					this._isSat( 'n' )
							? Math.abs( this._get( 'n' ).get()!.value - 4.5 ) - 3.5
							: MagneticQN.MIN,
					this._isSat( 'l' )
							? this._get( 'l' ).get()!.value * -1
							: MagneticQN.MIN,
				);
			case 's':
				return SpinQN.MIN;
		}
	}

	maxValid( key: StoreKey ): number
	{
		switch( key )
		{
			case 'n':
				return Math.min(
					this._isSat( 'l' )
							? 8 - this._get( 'l' ).get()!.value : MainQN.MAX,
					this._isSat( 'm' )
							? 8 - Math.abs( this._get( 'm' ).get()!.value ) : MainQN.MAX,
				);
			case 'l':
				return this._isSat( 'n' )
							? -1 * Math.abs( this._get( 'n' ).get()!.value - 4.5 ) + 3.5
							: OrbitalQN.MAX;
			case 'm':
				return Math.min(
					this._isSat( 'n' )
							? -1 * Math.abs( this._get( 'n' ).get()!.value - 4.5 ) + 3.5
							: MagneticQN.MAX,
					this._isSat( 'l' )
							? this._get( 'l' ).get()!.value
							: MagneticQN.MAX,
				);
			case 's':
				return SpinQN.MAX;
		}
	}

	private _isSat( key: StoreKey ): boolean
	{
		return this._get( key ).isSat();
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

	setState( qn: QuantumNumbers ): void
	{
		this.store.n.set( qn.n );
		this.store.l.set( qn.l );
		this.store.m.set( qn.m );
		this.store.s.set( qn.s );

		this._updateMode();
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