import OB_IShotsAnalyzer from "../interfaces/OB_ShotsAnalyzerInterface";
import { randomIndex } from "../../../util";
import Chemistry, {
	ElemConfig,
	periodicTable,
	SpinIndex,
} from "../../Chemistry";
import type { ChemicalElement, CellQN, } from '../../Chemistry/types';


/**
 * Класс, анализирующий выстрелы по диаграмме и вычисляющий,
 * какие элементы периодической таблицы подходят под результаты выстрелов.
 */
class ShotsAnalyzer implements OB_IShotsAnalyzer
{
	/** Элементы, которые могут подходить под заданную карту выстрелов */
	#candidates: ChemicalElement[];

	/** Индексы элемента, которые точно не определены по карте выстрелов */
	#indefiniteIndexes: number[];

	#shotsCounter: number;



	constructor()
	{
		this.#candidates = periodicTable.asArray();
		this.#indefiniteIndexes = this._initIndefiniteIndexes();
		this.#shotsCounter = 0;
	}

	private _initIndefiniteIndexes(): number[]
	{
		const indexes: number[] = [];
		for (let index = 0; index < periodicTable.MAX_NUMBER; index++)
			indexes.push( index );
		return indexes;
	}

	markShot( qn: CellQN, result: boolean ): void
	{
		const index = this._getIndex( qn );
		if( !index )
			return;
		this._update( index, result );
		this.#shotsCounter++;
	}

	private _getIndex( qn: CellQN ): SpinIndex | undefined
	{
		return periodicTable.converter.toIndex( qn );
	}

	private _getQN( index: number ): CellQN | undefined
	{
		return periodicTable.converter.toQN( index );
	}

	private _update( index: SpinIndex, result: boolean ): void
	{
		const newCandidates: ChemicalElement[] = [];
		let probablyHas: ElemConfig = Chemistry.config();
		let definitelyHas: ElemConfig = Chemistry.config( [-1, -1, -1, -1] );

		for( const element of this.#candidates ) {
			if( element.config.hasSpin( index ) === result )
			{
				newCandidates.push( element );
				probablyHas = ElemConfig.OR( probablyHas, element.config );
				definitelyHas = ElemConfig.AND( definitelyHas, element.config );
			}
		}

		this.#candidates = newCandidates;

		if( newCandidates.length === 0 )
		{
			this.#indefiniteIndexes = [];
		}
		else
		{
			const indefinite = ElemConfig.XOR( probablyHas, definitelyHas);
			this.#indefiniteIndexes = indefinite.asIndexes();
		}
	}

	/** Количество элементов, которые могут подойти */
	get candidates(): number
	{
		return this.#candidates.length;
	}

	/** Количество ячеек, состояние которых не определено */
	get undefinedCells(): number
	{
		return this.#indefiniteIndexes.length;
	}

	/** Вероятность отгадать элемент */
	get certainty(): number
	{
		return 1 / this.#candidates.length;
	}

	/** Количество учтенных выстрелов */
	get shots(): number
	{
		return this.#shotsCounter;
	}

	/**
	 * Выбрать ячейку из тех, что неопределенны.
	 * Если таковых нет, то возвращается `undefined`.
	 * Если это первый ход, т.е. таковых 118, то ячейка выбирается случайным образом.
	 * В противном случае выбирается средняя ячейка.
	 * @returns Квантовые числа ячейки диаграммы
	 */
	pickOutCell(): CellQN | undefined
	{
		if( this.#indefiniteIndexes.length === 0 )
			return undefined;

		if( this.#indefiniteIndexes.length === (SpinIndex.MAX + 1) )
		{
			return this._getQN( this.#indefiniteIndexes[ randomIndex( this.#indefiniteIndexes.length - 1 ) ] ); // TOTHINK: добавить немного случайности?
		}

		return this._getQN( this.#indefiniteIndexes[ Math.round((this.#indefiniteIndexes.length - 1) / 2) ] );
	}

	/**
	 * Случайный химический элемент из тех, что подходят
	 * @returns Химический элемент из периодической таблицы
	 */
	pickOutElement(): ChemicalElement | undefined
	{
		if( this.#candidates.length === 0 )
			return undefined;

		return this.#candidates[ randomIndex( this.#candidates.length - 1 ) ];
	}

}



export default ShotsAnalyzer;