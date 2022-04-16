import { CellIndex } from "./DiagramCell";
import QNSchemeInterface from "./QNSchemeInterface";
import { CellQN, BlockQN } from "./QuantumNumbers";


type BoxType = [CellIndex, CellIndex];
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
					'0': [ new CellIndex( 0 ), new CellIndex( 1 ) ]
				}
			},
	
			2: {
				's': {
					'0': [ new CellIndex( 2 ), new CellIndex( 3 ) ]
				},
	
				'p': {
					'-1': [ new CellIndex( 4 ), new CellIndex( 5 ) ],
					'0': [ new CellIndex( 6 ), new CellIndex( 7 ) ],
					'+1': [ new CellIndex( 8 ), new CellIndex( 9 ) ],
				}
			},
	
			3: {
				's': {
					'0': [ new CellIndex( 10 ), new CellIndex( 11 ) ]
				},
	
				'p': {
					'-1': [ new CellIndex( 12 ), new CellIndex( 13 ) ],
					'0': [ new CellIndex( 14 ), new CellIndex( 15 ) ],
					'+1': [ new CellIndex( 16 ), new CellIndex( 17 ) ],
				},
	
				'd': {
					'-2': [ new CellIndex( 20 ), new CellIndex( 21 ) ],
					'-1': [ new CellIndex( 22 ), new CellIndex( 23 ) ],
					'0': [ new CellIndex( 24 ), new CellIndex( 25 ) ],
					'+1': [ new CellIndex( 26 ), new CellIndex( 27 ) ],
					'+2': [ new CellIndex( 28 ), new CellIndex( 29 ) ],
				}
			},
	
			4: {
				's': {
					'0': [ new CellIndex( 18 ), new CellIndex( 19 ) ]
				},
	
				'p': {
					'-1': [ new CellIndex( 30 ), new CellIndex( 31 ) ],
					'0': [ new CellIndex( 32 ), new CellIndex( 33 ) ],
					'+1': [ new CellIndex( 34 ), new CellIndex( 35 ) ],
				},
	
				'd': {
					'-2': [ new CellIndex( 38 ), new CellIndex( 39 ) ],
					'-1': [ new CellIndex( 40 ), new CellIndex( 41 ) ],
					'0': [ new CellIndex( 42 ), new CellIndex( 43 ) ],
					'+1': [ new CellIndex( 44 ), new CellIndex( 45 ) ],
					'+2': [ new CellIndex( 46 ), new CellIndex( 47 ) ],
				},
	
				'f': {
					'-3': [ new CellIndex( 56 ), new CellIndex( 57 ) ],
					'-2': [ new CellIndex( 58 ), new CellIndex( 59 ) ],
					'-1': [ new CellIndex( 60 ), new CellIndex( 61 ) ],
					'0': [ new CellIndex( 62 ), new CellIndex( 63 ) ],
					'+1': [ new CellIndex( 64 ), new CellIndex( 65 ) ],
					'+2': [ new CellIndex( 66 ), new CellIndex( 67 ) ],
					'+3': [ new CellIndex( 68 ), new CellIndex( 69 ) ],
				}
			},
	
			5: {
				's': {
					'0': [ new CellIndex( 36 ), new CellIndex( 37 ) ]
				},
	
				'p': {
					'-1': [ new CellIndex( 48 ), new CellIndex( 49 ) ],
					'0': [ new CellIndex( 50 ), new CellIndex( 51 ) ],
					'+1': [ new CellIndex( 52 ), new CellIndex( 53 ) ],
				},
	
				'd': {
					'-2': [ new CellIndex( 70 ), new CellIndex( 71 ) ],
					'-1': [ new CellIndex( 72 ), new CellIndex( 73 ) ],
					'0': [ new CellIndex( 74 ), new CellIndex( 75 ) ],
					'+1': [ new CellIndex( 76 ), new CellIndex( 77 ) ],
					'+2': [ new CellIndex( 78 ), new CellIndex( 79 ) ],
				},
	
				'f': {
					'-3': [ new CellIndex( 88 ), new CellIndex( 89 ) ],
					'-2': [ new CellIndex( 90 ), new CellIndex( 91 ) ],
					'-1': [ new CellIndex( 92 ), new CellIndex( 93 ) ],
					'0': [ new CellIndex( 94 ), new CellIndex( 95 ) ],
					'+1': [ new CellIndex( 96 ), new CellIndex( 97 ) ],
					'+2': [ new CellIndex( 98 ), new CellIndex( 99 ) ],
					'+3': [ new CellIndex( 100 ), new CellIndex( 101 ) ],
				}
			},
			
			6: {
				's': {
					'0': [ new CellIndex( 54 ), new CellIndex( 55 ) ]
				},
	
				'p': {
					'-1': [ new CellIndex( 80 ), new CellIndex( 81 ) ],
					'0': [ new CellIndex( 82 ), new CellIndex( 83 ) ],
					'+1': [ new CellIndex( 84 ), new CellIndex( 85 ) ],
				},
	
				'd': {
					'-2': [ new CellIndex( 102 ), new CellIndex( 103 ) ],
					'-1': [ new CellIndex( 104 ), new CellIndex( 105 ) ],
					'0': [ new CellIndex( 106 ), new CellIndex( 107 ) ],
					'+1': [ new CellIndex( 108 ), new CellIndex( 109 ) ],
					'+2': [ new CellIndex( 110 ), new CellIndex( 111 ) ],
				}
			},
	
			7: {
				's': {
					'0': [ new CellIndex( 86 ), new CellIndex( 87 ) ]
				},
	
				'p': {
					'-1': [ new CellIndex( 112 ), new CellIndex( 113 ) ],
					'0': [ new CellIndex( 114 ), new CellIndex( 115 ) ],
					'+1': [ new CellIndex( 116 ), new CellIndex( 117 ) ],
				}
			}
		}
	}

	getCellIndex( qn: CellQN ): CellIndex | undefined
	{
		return this._getCell( qn );
	}

	private _getCell( qn: CellQN ): CellIndex | undefined
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
	getBlockIndexes( qn: BlockQN ): CellIndex[] | undefined
	{
		const indexes: CellIndex[] = [];
		const block = this._getBlock( qn );
		if( !block )
			return undefined;

		for (const box of Object.values( block ) )
			indexes.push( ...box );
		
		return indexes;
	}

	private _getBlock( qn: BlockQN ): BlockType | undefined
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