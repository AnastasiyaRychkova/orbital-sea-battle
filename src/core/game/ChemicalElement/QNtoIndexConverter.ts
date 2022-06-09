import QN from "./qnModule";
import { CellIndex } from "./DiagramCell";
import { CellQN } from "./QuantumNumbers";


type ColumnKeyType = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type BlockKeyType = 's' | 'p' | 'd' | 'f';

type BlockType = { [key in string]: CellIndex[] };
type ColumnType = { [key in BlockKeyType]?: BlockType };
type ToIndexSchemeType = { [key in ColumnKeyType]: ColumnType };

function index( number: number )
{
	return new CellIndex( number );
};

function cell( scheme: {n: number, l: string, m: number, s: -1|1} )
{
	return {
		n: QN.n( scheme.n ),
		l: QN.l( scheme.l ),
		m: QN.m( scheme.m ),
		s: QN.s( scheme.s ),
	};
}

export const toIndexScheme: ToIndexSchemeType = {
	1: {
		's': {
			'0': [ index( 0 ), index( 1 ) ]
		}
	},

	2: {
		's': {
			'0': [ index( 2 ), index( 3 ) ]
		},

		'p': {
			'+1': [ index( 4 ), index( 5 ) ],
			'0': [ index( 6 ), index( 7 ) ],
			'-1': [ index( 8 ), index( 9 ) ],
		}
	},

	3: {
		's': {
			'0': [ index( 10 ), index( 11 ) ]
		},

		'p': {
			'+1': [ index( 12 ), index( 13 ) ],
			'0': [ index( 14 ), index( 15 ) ],
			'-1': [ index( 16 ), index( 17 ) ],
		},

		'd': {
			'+2': [ index( 20 ), index( 21 ) ],
			'+1': [ index( 22 ), index( 23 ) ],
			'0': [ index( 24 ), index( 25 ) ],
			'-1': [ index( 26 ), index( 27 ) ],
			'-2': [ index( 28 ), index( 29 ) ],
		}
	},

	4: {
		's': {
			'0': [ index( 18 ), index( 19 ) ]
		},

		'p': {
			'+1': [ index( 30 ), index( 31 ) ],
			'0': [ index( 32 ), index( 33 ) ],
			'-1': [ index( 34 ), index( 35 ) ],
		},

		'd': {
			'+2': [ index( 38 ), index( 39 ) ],
			'+1': [ index( 40 ), index( 41 ) ],
			'0': [ index( 42 ), index( 43 ) ],
			'-1': [ index( 44 ), index( 45 ) ],
			'-2': [ index( 46 ), index( 47 ) ],
		},

		'f': {
			'+3': [ index( 56 ), index( 57 ) ],
			'+2': [ index( 58 ), index( 59 ) ],
			'+1': [ index( 60 ), index( 61 ) ],
			'0': [ index( 62 ), index( 63 ) ],
			'-1': [ index( 64 ), index( 65 ) ],
			'-2': [ index( 66 ), index( 67 ) ],
			'-3': [ index( 68 ), index( 69 ) ],
		}
	},

	5: {
		's': {
			'0': [ index( 36 ), index( 37 ) ]
		},

		'p': {
			'+1': [ index( 48 ), index( 49 ) ],
			'0': [ index( 50 ), index( 51 ) ],
			'-1': [ index( 52 ), index( 53 ) ],
		},

		'd': {
			'+2': [ index( 70 ), index( 71 ) ],
			'+1': [ index( 72 ), index( 73 ) ],
			'0': [ index( 74 ), index( 75 ) ],
			'-1': [ index( 76 ), index( 77 ) ],
			'-2': [ index( 78 ), index( 79 ) ],
		},

		'f': {
			'+3': [ index( 88 ), index( 89 ) ],
			'+2': [ index( 90 ), index( 91 ) ],
			'+1': [ index( 92 ), index( 93 ) ],
			'0': [ index( 94 ), index( 95 ) ],
			'-1': [ index( 96 ), index( 97 ) ],
			'-2': [ index( 98 ), index( 99 ) ],
			'-3': [ index( 100 ), index( 101 ) ],
		}
	},
	
	6: {
		's': {
			'0': [ index( 54 ), index( 55 ) ]
		},

		'p': {
			'+1': [ index( 80 ), index( 81 ) ],
			'0': [ index( 82 ), index( 83 ) ],
			'-1': [ index( 84 ), index( 85 ) ],
		},

		'd': {
			'+2': [ index( 102 ), index( 103 ) ],
			'+1': [ index( 104 ), index( 105 ) ],
			'0': [ index( 106 ), index( 107 ) ],
			'-1': [ index( 108 ), index( 109 ) ],
			'-2': [ index( 110 ), index( 111 ) ],
		}
	},

	7: {
		's': {
			'0': [ index( 86 ), index( 87 ) ]
		},

		'p': {
			'+1': [ index( 112 ), index( 113 ) ],
			'0': [ index( 114 ), index( 115 ) ],
			'-1': [ index( 116 ), index( 117 ) ],
		}
	}
};


const toQNScheme: CellQN[] = makeReverseScheme( toIndexScheme );



/*=============================================
=                  CONVERTER                  =
=============================================*/

export default {
	toIndex( qn: CellQN ): CellIndex | undefined
	{
		const column = toIndexScheme[ qn.n.value as ColumnKeyType ];
		if( column )
		{
			const block = column[ qn.l.toString() as BlockKeyType ];
			if( block )
			{
				const box = block[ qn.m.toString() ];
				return qn.s.value > 0 ? box[0] : box[1];
			}
		}

		return undefined;
	},

	toQN( index: number ): CellQN | undefined
	{
		return ( index < 0 || index >= toQNScheme.length )
					? undefined
					: toQNScheme[ index ];
	},
}

function makeReverseScheme( scheme: ToIndexSchemeType ): CellQN[]
{
	const reverseScheme: CellQN[] = [];

	for( const [n, column] of Object.entries( scheme ) ) {
		for( const [l, block] of Object.entries( column ) ) {
			for( const [m, box] of Object.entries( block ) ) {

				reverseScheme[ box[0].value ] = cell( {
					n: Number(n),
					l: l,
					m: Number(m),
					s: 1
				} );
				reverseScheme[ box[1].value ] = cell( {
					n: Number(n),
					l: l,
					m: Number(m),
					s: -1
				} );
			}
		}
	}

	return reverseScheme;
}
