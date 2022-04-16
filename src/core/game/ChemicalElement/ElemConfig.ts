import {
	CellIndex,
	calcCellState,
	EDiagramCellState as CellState,
} from './DiagramCell';
import type { SpinMark, SpinState } from './DiagramCell';

/**
 * **Электронная конфигурация химического элемента**
 * - - - - - - - - - - - - - - - - - - - - - - - - -
 * Конфигурация храниться в бинарном виде.
 * 118 состояний спинов разделены на 4 группы:
 * 3 группы по 32 спина и 1 на 22.
 */
class ElemConfig
{
	/** Конфигурация элемента в бинарном виде */
	config: Int32Array;

	private static readonly MAX_LENGTH: number = 4;

	constructor( buf?: Int32Array | number[] )
	{
		if( buf === undefined )
		{
			this.config = ElemConfig._createZeroArray();
			return;
		}
		
		if( buf.length === ElemConfig.MAX_LENGTH )
		{
			this.config = ElemConfig._createCopyOfArray( buf );
			return;
		}

		this.config = ElemConfig._createCopyOfCustomLengthArray( buf );
		
	}

	private static _createZeroArray(): Int32Array
	{
		return new Int32Array( [ 0, 0, 0, 0 ] );
	}

	private static _createCopyOfArray( inArray: Int32Array | number[] ): Int32Array
	{
		return new Int32Array( inArray );
	}

	private static _createCopyOfCustomLengthArray( inArray: Int32Array | number[] ): Int32Array
	{
		const newArray = ElemConfig._createZeroArray();
		const i = ElemConfig._copyCustomLengthArray( newArray, inArray );
		ElemConfig._zeroArrayAtIndex( i, newArray );
		return newArray;
	}

	private static _copyCustomLengthArray( destination: Int32Array, source: Int32Array | number[] ): number
	{
		let i = 0;
		for( ; i < source.length && i < ElemConfig.MAX_LENGTH; i++ )
			destination[ i ] = source[ i ];
		return i;
	}

	private static _zeroArrayAtIndex( startIndex: number, inArray: Int32Array ): void
	{
		let i = startIndex;
		for( ; i < ElemConfig.MAX_LENGTH; i++ )
			inArray[ i ] = 0;
	}

	/**
	 * Сравнивает два элемента и возвращает истину только в том случае,
	 * если они правильные и эквивалентные
	 * 
	 * @param elem Конфигурация второго элемента
	 */
	isEqual( elem: ElemConfig ): boolean
	{
		for( let i = 0; i < ElemConfig.MAX_LENGTH; i++ )
			if( this.config[ i ] !== (elem).config[ i ] )
				return false;

		return true;
	}

	private static readonly NUM__0_001: number = 1;
	private static readonly CHUNK_SIZE: number = 32;

	/**
	 * Отмечен ли в данной конфигурации спин
	 * 
	 * @param spin Индекс спина
	 */
	hasSpin( spin: CellIndex ): boolean
	{
		return this._isMarked( spin.value ) !== 0;
	}

	private _isMarked( spinIndex: number ): SpinState
	{
		const chunk = this._chunkIndexBySpinIndex( spinIndex );
		const index = this._indexInChunkBySpinIndex( spinIndex );
		return (( this.config[ chunk ] >> index ) & 1 ) as SpinState;
	}

	private _makeMaskForSingular( spinIndex: number ): number
	{
		let mask = ElemConfig.NUM__0_001;
		mask <<= this._indexInChunkBySpinIndex( spinIndex );
		return mask;
	}

	private _indexInChunkBySpinIndex( spinIndex: number ): number
	{
		return spinIndex % ElemConfig.CHUNK_SIZE;
	}

	private _chunkIndexBySpinIndex( spinIndex: number ): number
	{
		return ( spinIndex / ElemConfig.CHUNK_SIZE ) | 0;
	}

	/**
	 * Отметить спин в объекте конфигурации элемента
	 * 
	 * @param spin Индекс спина
	 * @param state Отмечен ли спин
	 */
	write( spin: CellIndex, state: SpinMark | SpinState ): ElemConfig
	{
		state ? this._mark( spin.value )
				:	this._remove( spin.value );
		return this;
	}

	/**
	 * Отметить спин
	 * 
	 * @param index Индекс спина
	 */
	private _mark( index: number ): void
	{
		const mask = this._makeMaskForSingular( index );
		this.config[ this._chunkIndexBySpinIndex( index ) ] |= mask;
	}

	/**
	 * Снять отметку со спина
	 * 
	 * @param index Индекс спина
	 */
	private _remove( index: number ): void
	{
		const mask = this._makeMaskForSingular( index );
		this.config[ this._chunkIndexBySpinIndex( index ) ] &= ~mask;
	}

	/**
	 * Получить числовой массив из битовой модели
	 */
	toArray(): SpinState[]
	{
		const result: SpinState[] = [];

		for( let spinIndex = 0; spinIndex <= CellIndex.MAX; spinIndex++ )
			result.push( this._isMarked( spinIndex ) );

		return result;
	}

	/**
	 * Преобразовать в числовой массив.
	 * Небезопасен!
	 */
	toNumArray(): number[]
	{
		return [
			this.config[0],
			this.config[1],
			this.config[2],
			this.config[3],
		];
	}

	/** Создать копию объекта */
	clone(): ElemConfig
	{
		return new ElemConfig( this.config );
	}

	asIndexes(): number[]
	{
		const indexes: number[] = [];

		for( let index = 0; index <= CellIndex.MAX; index++ )
			if( this._isMarked( index ) )
				indexes.push( index );

		return indexes;
	}

	static OR( config1: ElemConfig, config2: ElemConfig ): ElemConfig
	{
		const result: ElemConfig = new ElemConfig();
		result.config[0] = config1.config[0] | config2.config[0];
		result.config[1] = config1.config[1] | config2.config[1];
		result.config[2] = config1.config[2] | config2.config[2];
		result.config[3] = config1.config[3] | config2.config[3];

		return result;
	}

	static AND( config1: ElemConfig, config2: ElemConfig ): ElemConfig
	{
		const result: ElemConfig = new ElemConfig();
		result.config[0] = Number(config1.config[0]) & Number(config2.config[0]);
		result.config[1] = config1.config[1] & config2.config[1];
		result.config[2] = config1.config[2] & config2.config[2];
		result.config[3] = config1.config[3] & config2.config[3];

		return result;
	}

	static XOR( config1: ElemConfig, config2: ElemConfig ): ElemConfig
	{
		const result: ElemConfig = new ElemConfig();
		result.config[0] = config1.config[0] ^ config2.config[0];
		result.config[1] = config1.config[1] ^ config2.config[1];
		result.config[2] = config1.config[2] ^ config2.config[2];
		result.config[3] = config1.config[3] ^ config2.config[3];

		return result;
	}

	static NOT( config: ElemConfig ): ElemConfig
	{
		const result: ElemConfig = new ElemConfig();
		result.config[0] = ~config.config[0];
		result.config[1] = ~config.config[1];
		result.config[2] = ~config.config[2];
		result.config[3] = ~config.config[3];

		return result;
	}

	/**
	 * Вычислить состояние (enum) спина по указанному индексу 
	 * @param spinIndex Индекс спина, у которого запрашивается состояние
	 * @param element Схема элемента
	 * @param shots Схема выстрелов
	 * @returns Перечислительный тип состояния спина элемента
	 */
	static getCellState( spinIndex: CellIndex,
						 element: ElemConfig,
						 shots: ElemConfig
						): CellState
	{
		return calcCellState( element.hasSpin( spinIndex ), shots.hasSpin( spinIndex ) );
	}

	/**
	 * Получить массив, отражающий полное состояние диаграммы:
	 * отметки, попадания, промахи.
	 * 
	 * @param diagram Диаграмма
	 * @param shots Выстрелы по переданной диаграмме
	 */
	static getDiagramFullState( diagram: ElemConfig, shots: ElemConfig ): CellState[]
	{
		const result: CellState[] = [];

		for( let i = 0; i <= CellIndex.MAX; i++ )
			result.push( calcCellState( diagram._isMarked( i ), shots._isMarked( i ) ) );
		
		return result;
	}

	/**
	 * Получить массив, содержащий результаты выстрелов (shots) по диаграмме (diagram)
	 * 
	 * @param diagram Диаграмма
	 * @param shots Выстрелы по переданной диаграмме
	 */
	static getShotResults( diagram: ElemConfig, shots: ElemConfig ): CellState[]
	{
		const result: CellState[] = [];

		for( let i = 0; i <= CellIndex.MAX; i++ )
		{
			const state: CellState = calcCellState( diagram._isMarked( i ), shots._isMarked( i ) );
			result.push( state === CellState.on ? CellState.off : state );
		}

		return result;
	}

	static createFromSpinArray( spinArray: SpinState[] ): ElemConfig
	{
		const result: ElemConfig = new ElemConfig();
		result._writeSpinArrayInConfig( spinArray );
		return result;
	}

	private _writeSpinArrayInConfig( spinArray: SpinState[] ): void
	{
		const iterator = CellIndex.iterator();
		for (const spin of iterator)
		{
			const spinState = spinArray[ spin.value ] || 0;
			this.write( spin, spinState );
		}
	}
} // ---------------------------------------------

export default ElemConfig;
