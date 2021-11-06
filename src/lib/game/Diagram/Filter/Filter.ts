import { makeObservable, observable, action, computed } from "mobx";
import {
	MainQN,
	OrbitalQN,
	MagneticQN,
	SpinQN,
	QuantumNumbers,
	CellQN,
} from "../../ChemicalElement/QuantumNumbers";
import IFilter from "./FilterInterface";
import type { StoreKey, FilterType } from "./FilterInterface";
import INote from "./NoteInterface";
import CheckboxNote from "./CheckboxNote";
import RadioNote from "./RadioNote";
import IQNConverter from "../../ChemicalElement/QNConverterInterface";



type FilterOptions = {
	type: FilterType,
}

type StoreType = Map<StoreKey, INote>;


/**
 * **Фильтр элементов диаграммы**
 * 
 * Вычисляет, какие элементы диаграммы соответствуют заданным квантовым числам
 */
class Filter implements IFilter
{
	store: StoreType;
	type: FilterType;
	_disabled: boolean;
	private _converter: IQNConverter;

	constructor( qnConverter: IQNConverter, options?: FilterOptions )
	{
		makeObservable( this, {
			store: observable,
			type: observable,
			_disabled: observable,

			disabled: computed,
			setValue: action,
			setDisable: action,
			reset: action,
			setType: action,
		});

		this.type = options?.type || 'checkbox';
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
		switch( this.type )
		{
			case 'checkbox':
				return new Map<StoreKey, INote>([
					['n', new CheckboxNote() ],
					['l', new CheckboxNote() ],
					['m', new CheckboxNote() ],
					['s', new CheckboxNote() ],
				]);
		
			default:
				return new Map<StoreKey, INote>([
					['n', new RadioNote( new MainQN( 1 ) ) ],
					['l', new RadioNote( new OrbitalQN( 's' ) ) ],
					['m', new RadioNote( new MagneticQN( 0 ) ) ],
					['s', new RadioNote( new SpinQN( 1 ) ) ],
				]);
		}
		
	}

	getValue = ( key: StoreKey ) =>
		this.store.get( key )?.getValueAsString();

	setValue = ( key: StoreKey, value: string ) => {
		if( this._disabled )
			return;

		const note = this._get( key );
		note.set( this._makeQN( key, value ) );
		return this;
	};

	private _get( key: StoreKey ): INote
	{
		return this.store.get( key )!;
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
		return this._disabled || !this._get( key ).isSat();
	}

	setDisable = ( key: StoreKey, value: boolean ) => {
		if( this._disabled )
			return;

		if( value )
			this._get( key ).reset();
		else
			this._get( key ).activate();
	};

	

	isShipSelected( qn: QuantumNumbers ): boolean
	{
		/* const fsS = this._isFilterSetted( 's' );
		const fsM = this._isFilterSetted( 'm' );
		const cF = this._checkFilters( qn, ['n', 'l'], true );
		console.log( 'isSelected', qn, this.store );
		return !fsS && !fsM && cF; */
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

	
	private _checkFilters( checkedQN: QuantumNumbers,
							keys: StoreKey[],
							strict: boolean = false ): boolean
	{
		let equalFilters: number = 0;

		for( const key of keys ) {
			const note = this._get( key )!;
			if( note.isSat() ) {
				if( note.isEqual( checkedQN[ key ] ) )
					equalFilters++;
				else
					return false;
			}
		}
		return strict ? equalFilters > 0 : true;
	}


	private _isEqualQN( checkedQN: QuantumNumbers, key: StoreKey ): boolean
	{
		return this._get( key ).isEqual( checkedQN[ key ] );
	}

	private _isFilterSetted( key: StoreKey ): boolean
	{
		return this._get( key ).isSat();
	}

	doesSpecifyCell(): boolean
	{
		if( this._disabled )
			return false;

		for( const qNumber of this.store.values() ) {
			if( !qNumber.isSat() ) {
				return false;
			}
		}

		const state = this.getState();
		return this._converter.getCellIndex( state as CellQN ) !== undefined;
	}

	getState(): QuantumNumbers
	{
		return {
			n: this._get( 'n' )!.getValue() as MainQN | undefined,
			l: this._get( 'l' )!.getValue() as OrbitalQN | undefined,
			m: this._get( 'm' )!.getValue() as MagneticQN | undefined,
			s: this._get( 's' )!.getValue() as SpinQN | undefined,
		}
	}

	reset(): void
	{
		this.store = this._createDefaultStore();
	}

	setType( type: FilterType ): void
	{
		if( this.type === type )
			return;

		this.type = type;
		this.reset();
	}
}

export default Filter;