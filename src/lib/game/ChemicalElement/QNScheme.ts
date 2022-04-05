import { SpinIndex } from "./DiagramCell";
import QNSchemeInterface from "./QNSchemeInterface";
import { CellQN, ShipQN } from "./QuantumNumbers";
import SpinQN from "./SpinQN";


type BoxType = [SpinIndex, SpinIndex];
type BlockType = { [key: string]: BoxType };
type ColumnType = { [key: string]: BlockType };

type ChartType = { [key: string]: ColumnType };

type SchemeElem = BoxType | BlockType | ColumnType;



class QNScheme implements QNSchemeInterface
{
	private correspondenceTable: ChartType;


	constructor()
	{
		this.correspondenceTable = {
			1: {
				's': {
					'0': [ new SpinIndex( 0 ), new SpinIndex( 1 ) ]
				}
			},
	
			2: {
				's': {
					'0': [ new SpinIndex( 2 ), new SpinIndex( 3 ) ]
				},
	
				'p': {
					'-1': [ new SpinIndex( 4 ), new SpinIndex( 5 ) ],
					'0': [ new SpinIndex( 6 ), new SpinIndex( 7 ) ],
					'+1': [ new SpinIndex( 8 ), new SpinIndex( 9 ) ],
				}
			},
	
			3: {
				's': {
					'0': [ new SpinIndex( 10 ), new SpinIndex( 11 ) ]
				},
	
				'p': {
					'-1': [ new SpinIndex( 12 ), new SpinIndex( 13 ) ],
					'0': [ new SpinIndex( 14 ), new SpinIndex( 15 ) ],
					'+1': [ new SpinIndex( 16 ), new SpinIndex( 17 ) ],
				},
	
				'd': {
					'-2': [ new SpinIndex( 20 ), new SpinIndex( 21 ) ],
					'-1': [ new SpinIndex( 22 ), new SpinIndex( 23 ) ],
					'0': [ new SpinIndex( 24 ), new SpinIndex( 25 ) ],
					'+1': [ new SpinIndex( 26 ), new SpinIndex( 27 ) ],
					'+2': [ new SpinIndex( 28 ), new SpinIndex( 29 ) ],
				}
			},
	
			4: {
				's': {
					'0': [ new SpinIndex( 18 ), new SpinIndex( 19 ) ]
				},
	
				'p': {
					'-1': [ new SpinIndex( 30 ), new SpinIndex( 31 ) ],
					'0': [ new SpinIndex( 32 ), new SpinIndex( 33 ) ],
					'+1': [ new SpinIndex( 34 ), new SpinIndex( 35 ) ],
				},
	
				'd': {
					'-2': [ new SpinIndex( 38 ), new SpinIndex( 39 ) ],
					'-1': [ new SpinIndex( 40 ), new SpinIndex( 41 ) ],
					'0': [ new SpinIndex( 42 ), new SpinIndex( 43 ) ],
					'+1': [ new SpinIndex( 44 ), new SpinIndex( 45 ) ],
					'+2': [ new SpinIndex( 46 ), new SpinIndex( 47 ) ],
				},
	
				'f': {
					'-3': [ new SpinIndex( 56 ), new SpinIndex( 57 ) ],
					'-2': [ new SpinIndex( 58 ), new SpinIndex( 59 ) ],
					'-1': [ new SpinIndex( 60 ), new SpinIndex( 61 ) ],
					'0': [ new SpinIndex( 62 ), new SpinIndex( 63 ) ],
					'+1': [ new SpinIndex( 64 ), new SpinIndex( 65 ) ],
					'+2': [ new SpinIndex( 66 ), new SpinIndex( 67 ) ],
					'+3': [ new SpinIndex( 68 ), new SpinIndex( 69 ) ],
				}
			},
	
			5: {
				's': {
					'0': [ new SpinIndex( 36 ), new SpinIndex( 37 ) ]
				},
	
				'p': {
					'-1': [ new SpinIndex( 48 ), new SpinIndex( 49 ) ],
					'0': [ new SpinIndex( 50 ), new SpinIndex( 51 ) ],
					'+1': [ new SpinIndex( 52 ), new SpinIndex( 53 ) ],
				},
	
				'd': {
					'-2': [ new SpinIndex( 70 ), new SpinIndex( 71 ) ],
					'-1': [ new SpinIndex( 72 ), new SpinIndex( 73 ) ],
					'0': [ new SpinIndex( 74 ), new SpinIndex( 75 ) ],
					'+1': [ new SpinIndex( 76 ), new SpinIndex( 77 ) ],
					'+2': [ new SpinIndex( 78 ), new SpinIndex( 79 ) ],
				},
	
				'f': {
					'-3': [ new SpinIndex( 88 ), new SpinIndex( 89 ) ],
					'-2': [ new SpinIndex( 90 ), new SpinIndex( 91 ) ],
					'-1': [ new SpinIndex( 92 ), new SpinIndex( 93 ) ],
					'0': [ new SpinIndex( 94 ), new SpinIndex( 95 ) ],
					'+1': [ new SpinIndex( 96 ), new SpinIndex( 97 ) ],
					'+2': [ new SpinIndex( 98 ), new SpinIndex( 99 ) ],
					'+3': [ new SpinIndex( 100 ), new SpinIndex( 101 ) ],
				}
			},
			
			6: {
				's': {
					'0': [ new SpinIndex( 54 ), new SpinIndex( 55 ) ]
				},
	
				'p': {
					'-1': [ new SpinIndex( 80 ), new SpinIndex( 81 ) ],
					'0': [ new SpinIndex( 82 ), new SpinIndex( 83 ) ],
					'+1': [ new SpinIndex( 84 ), new SpinIndex( 85 ) ],
				},
	
				'd': {
					'-2': [ new SpinIndex( 102 ), new SpinIndex( 103 ) ],
					'-1': [ new SpinIndex( 104 ), new SpinIndex( 105 ) ],
					'0': [ new SpinIndex( 106 ), new SpinIndex( 107 ) ],
					'+1': [ new SpinIndex( 108 ), new SpinIndex( 109 ) ],
					'+2': [ new SpinIndex( 110 ), new SpinIndex( 111 ) ],
				}
			},
	
			7: {
				's': {
					'0': [ new SpinIndex( 86 ), new SpinIndex( 87 ) ]
				},
	
				'p': {
					'-1': [ new SpinIndex( 112 ), new SpinIndex( 113 ) ],
					'0': [ new SpinIndex( 114 ), new SpinIndex( 115 ) ],
					'+1': [ new SpinIndex( 116 ), new SpinIndex( 117 ) ],
				}
			}
		}
	}

	getCellIndex( qn: CellQN ): SpinIndex | undefined
	{
		return this._getCell( qn );
	}

	private _getCell( qn: CellQN ): SpinIndex | undefined
	{
		const n = this.correspondenceTable[qn.n.value];
		const l = n && n[qn.l.toString()];
		const m = l && l[qn.m.toString()];
		return m && m[ Number( qn.s.value > 0 ) ];
	}

	/**
	 * Получить индексы ячеек в блоке
	 * 
	 * **!!! Возвращает массив ссылок на объекты. Объекты НЕ менять!**
	 * @param qn 2 квантовых числа (n, l)
	 * @returns Массив индексов ячеек блока
	 */
	getBlockIndexes( qn: ShipQN ): SpinIndex[] | undefined
	{
		const indexes: SpinIndex[] = [];
		const block = this._getBlock( qn );
		if( !block )
			return undefined;

		for (const box of Object.values( block ) )
			indexes.push( ...box );
		
		return indexes;
	}

	private _getBlock( qn: ShipQN ): BlockType | undefined
	{
		return this.correspondenceTable[ qn.n.value ][ qn.l.toString() ];
	}
	
	getRandomCellQN(): [string, string, string, string]
	{
		const res: string[] = [];

		this._randomQN( Object.entries( this.correspondenceTable ), res );
		if( res.length !== 4 )
			throw new Error("The generated array has a length not equal to 4");

		return res as [string, string, string, string];
	}

	private _randomQN( elements: [string, SchemeElem][], res: string[]): void
	{
		let random = Math.ceil( Math.random() * elements.length );
		random = random ? random - 1 : 0;
		const [qn, value] = elements[ random ];

		res.push( qn );

		if( value instanceof Array )
			res.push(Math.random() > 0.5 ? '+1/2' : '−1/2' );
		else
			this._randomQN( Object.entries( value ), res );
	}
}

 
const qnScheme = new QNScheme();


export default qnScheme;