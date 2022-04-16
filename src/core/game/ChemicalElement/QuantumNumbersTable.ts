import { QuantumNumbers,
		MainQN,
		OrbitalQN,
		MagneticQN,
		SpinQN,
} from "./QuantumNumbers";

/** Квантовые числа, соответствующие ячейкам диаграммы */
class QuantumNumbersTable
{
	#table: Array<QuantumNumbers>;

	constructor()
	{
		this.#table = [
			{
				//0
				n: new MainQN(1),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//1
				n: new MainQN(1),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//2
				n: new MainQN(2),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//3
				n: new MainQN(2),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//4
				n: new MainQN(2),
				l: new OrbitalQN(1),
				m: new MagneticQN(-1),
				s: new SpinQN(1),
			},
			{
				//5
				n: new MainQN(2),
				l: new OrbitalQN(1),
				m: new MagneticQN(-1),
				s: new SpinQN(-1),
			},
			{
				//6
				n: new MainQN(2),
				l: new OrbitalQN(1),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//7
				n: new MainQN(2),
				l: new OrbitalQN(1),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//8
				n: new MainQN(2),
				l: new OrbitalQN(1),
				m: new MagneticQN(1),
				s: new SpinQN(1),
			},
			{
				//9
				n: new MainQN(2),
				l: new OrbitalQN(1),
				m: new MagneticQN(1),
				s: new SpinQN(-1),
			},
			{
				//10
				n: new MainQN(3),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//11
				n: new MainQN(3),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//12
				n: new MainQN(3),
				l: new OrbitalQN(1),
				m: new MagneticQN(-1),
				s: new SpinQN(1),
			},
			{
				//13
				n: new MainQN(3),
				l: new OrbitalQN(1),
				m: new MagneticQN(-1),
				s: new SpinQN(-1),
			},
			{
				//14
				n: new MainQN(3),
				l: new OrbitalQN(1),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//15
				n: new MainQN(3),
				l: new OrbitalQN(1),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//16
				n: new MainQN(3),
				l: new OrbitalQN(1),
				m: new MagneticQN(1),
				s: new SpinQN(1),
			},
			{
				//17
				n: new MainQN(3),
				l: new OrbitalQN(1),
				m: new MagneticQN(1),
				s: new SpinQN(-1),
			},
			{
				//18
				n: new MainQN(4),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//19
				n: new MainQN(4),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//20
				n: new MainQN(3),
				l: new OrbitalQN(2),
				m: new MagneticQN(-2),
				s: new SpinQN(1),
			},
			{
				//21
				n: new MainQN(3),
				l: new OrbitalQN(2),
				m: new MagneticQN(-2),
				s: new SpinQN(-1),
			},
			{
				//22
				n: new MainQN(3),
				l: new OrbitalQN(2),
				m: new MagneticQN(-1),
				s: new SpinQN(1),
			},
			{
				//23
				n: new MainQN(3),
				l: new OrbitalQN(2),
				m: new MagneticQN(-1),
				s: new SpinQN(-1),
			},
			{
				//24
				n: new MainQN(3),
				l: new OrbitalQN(2),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//25
				n: new MainQN(3),
				l: new OrbitalQN(2),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//26
				n: new MainQN(3),
				l: new OrbitalQN(2),
				m: new MagneticQN(1),
				s: new SpinQN(1),
			},
			{
				//27
				n: new MainQN(3),
				l: new OrbitalQN(2),
				m: new MagneticQN(1),
				s: new SpinQN(-1),
			},
			{
				//28
				n: new MainQN(3),
				l: new OrbitalQN(2),
				m: new MagneticQN(2),
				s: new SpinQN(1),
			},
			{
				//29
				n: new MainQN(3),
				l: new OrbitalQN(2),
				m: new MagneticQN(2),
				s: new SpinQN(-1),
			},
			{
				//30
				n: new MainQN(4),
				l: new OrbitalQN(1),
				m: new MagneticQN(-1),
				s: new SpinQN(1),
			},
			{
				//31
				n: new MainQN(4),
				l: new OrbitalQN(1),
				m: new MagneticQN(-1),
				s: new SpinQN(-1),
			},
			{
				//32
				n: new MainQN(4),
				l: new OrbitalQN(1),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//33
				n: new MainQN(4),
				l: new OrbitalQN(1),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//34
				n: new MainQN(4),
				l: new OrbitalQN(1),
				m: new MagneticQN(1),
				s: new SpinQN(1),
			},
			{
				//35
				n: new MainQN(4),
				l: new OrbitalQN(1),
				m: new MagneticQN(1),
				s: new SpinQN(-1),
			},
			{
				//36
				n: new MainQN(5),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//37
				n: new MainQN(5),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//38
				n: new MainQN(4),
				l: new OrbitalQN(2),
				m: new MagneticQN(-2),
				s: new SpinQN(1),
			},
			{
				//39
				n: new MainQN(4),
				l: new OrbitalQN(2),
				m: new MagneticQN(-2),
				s: new SpinQN(-1),
			},
			{
				//40
				n: new MainQN(4),
				l: new OrbitalQN(2),
				m: new MagneticQN(-1),
				s: new SpinQN(1),
			},
			{
				//41
				n: new MainQN(4),
				l: new OrbitalQN(2),
				m: new MagneticQN(-1),
				s: new SpinQN(-1),
			},
			{
				//42
				n: new MainQN(4),
				l: new OrbitalQN(2),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//43
				n: new MainQN(4),
				l: new OrbitalQN(2),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//44
				n: new MainQN(4),
				l: new OrbitalQN(2),
				m: new MagneticQN(1),
				s: new SpinQN(1),
			},
			{
				//45
				n: new MainQN(4),
				l: new OrbitalQN(2),
				m: new MagneticQN(1),
				s: new SpinQN(-1),
			},
			{
				//46
				n: new MainQN(4),
				l: new OrbitalQN(2),
				m: new MagneticQN(2),
				s: new SpinQN(1),
			},
			{
				//47
				n: new MainQN(4),
				l: new OrbitalQN(2),
				m: new MagneticQN(2),
				s: new SpinQN(-1),
			},
			{
				//48
				n: new MainQN(5),
				l: new OrbitalQN(1),
				m: new MagneticQN(-1),
				s: new SpinQN(1),
			},
			{
				//49
				n: new MainQN(5),
				l: new OrbitalQN(1),
				m: new MagneticQN(-1),
				s: new SpinQN(-1),
			},
			{
				//50
				n: new MainQN(5),
				l: new OrbitalQN(1),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//51
				n: new MainQN(5),
				l: new OrbitalQN(1),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//52
				n: new MainQN(5),
				l: new OrbitalQN(1),
				m: new MagneticQN(1),
				s: new SpinQN(1),
			},
			{
				//53
				n: new MainQN(5),
				l: new OrbitalQN(1),
				m: new MagneticQN(1),
				s: new SpinQN(-1),
			},
			{
				//54
				n: new MainQN(6),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//55
				n: new MainQN(6),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//56
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(-3),
				s: new SpinQN(1),
			},
			{
				//57
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(-3),
				s: new SpinQN(-1),
			},
			{
				//58
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(-2),
				s: new SpinQN(1),
			},
			{
				//59
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(-2),
				s: new SpinQN(-1),
			},
			{
				//60
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(-1),
				s: new SpinQN(1),
			},
			{
				//61
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(-1),
				s: new SpinQN(-1),
			},
			{
				//62
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//63
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//64
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(1),
				s: new SpinQN(1),
			},
			{
				//65
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(1),
				s: new SpinQN(-1),
			},
			{
				//66
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(2),
				s: new SpinQN(1),
			},
			{
				//67
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(2),
				s: new SpinQN(-1),
			},
			{
				//68
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(3),
				s: new SpinQN(1),
			},
			{
				//69
				n: new MainQN(4),
				l: new OrbitalQN(3),
				m: new MagneticQN(3),
				s: new SpinQN(-1),
			},
			{
				//70
				n: new MainQN(5),
				l: new OrbitalQN(2),
				m: new MagneticQN(-2),
				s: new SpinQN(1),
			},
			{
				//71
				n: new MainQN(5),
				l: new OrbitalQN(2),
				m: new MagneticQN(-2),
				s: new SpinQN(-1),
			},
			{
				//72
				n: new MainQN(5),
				l: new OrbitalQN(2),
				m: new MagneticQN(-1),
				s: new SpinQN(1),
			},
			{
				//73
				n: new MainQN(5),
				l: new OrbitalQN(2),
				m: new MagneticQN(-1),
				s: new SpinQN(-1),
			},
			{
				//74
				n: new MainQN(5),
				l: new OrbitalQN(2),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//75
				n: new MainQN(5),
				l: new OrbitalQN(2),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//76
				n: new MainQN(5),
				l: new OrbitalQN(2),
				m: new MagneticQN(1),
				s: new SpinQN(1),
			},
			{
				//77
				n: new MainQN(5),
				l: new OrbitalQN(2),
				m: new MagneticQN(1),
				s: new SpinQN(-1),
			},
			{
				//78
				n: new MainQN(5),
				l: new OrbitalQN(2),
				m: new MagneticQN(2),
				s: new SpinQN(1),
			},
			{
				//79
				n: new MainQN(5),
				l: new OrbitalQN(2),
				m: new MagneticQN(2),
				s: new SpinQN(-1),
			},
			{
				//80
				n: new MainQN(6),
				l: new OrbitalQN(1),
				m: new MagneticQN(-1),
				s: new SpinQN(1),
			},
			{
				//81
				n: new MainQN(6),
				l: new OrbitalQN(1),
				m: new MagneticQN(-1),
				s: new SpinQN(-1),
			},
			{
				//82
				n: new MainQN(6),
				l: new OrbitalQN(1),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//83
				n: new MainQN(6),
				l: new OrbitalQN(1),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//84
				n: new MainQN(6),
				l: new OrbitalQN(1),
				m: new MagneticQN(1),
				s: new SpinQN(1),
			},
			{
				//85
				n: new MainQN(6),
				l: new OrbitalQN(1),
				m: new MagneticQN(1),
				s: new SpinQN(-1),
			},
			{
				//86
				n: new MainQN(7),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//87
				n: new MainQN(7),
				l: new OrbitalQN(0),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//88
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(-3),
				s: new SpinQN(1),
			},
			{
				//89
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(-3),
				s: new SpinQN(-1),
			},
			{
				//90
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(-2),
				s: new SpinQN(1),
			},
			{
				//91
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(-2),
				s: new SpinQN(-1),
			},
			{
				//92
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(-1),
				s: new SpinQN(1),
			},
			{
				//93
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(-1),
				s: new SpinQN(-1),
			},
			{
				//94
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//95
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//96
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(1),
				s: new SpinQN(1),
			},
			{
				//97
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(1),
				s: new SpinQN(-1),
			},
			{
				//98
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(2),
				s: new SpinQN(1),
			},
			{
				//99
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(2),
				s: new SpinQN(-1),
			},
			{
				//100
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(3),
				s: new SpinQN(1),
			},
			{
				//101
				n: new MainQN(5),
				l: new OrbitalQN(3),
				m: new MagneticQN(3),
				s: new SpinQN(-1),
			},
			{
				//102
				n: new MainQN(6),
				l: new OrbitalQN(2),
				m: new MagneticQN(-2),
				s: new SpinQN(1),
			},
			{
				//103
				n: new MainQN(6),
				l: new OrbitalQN(2),
				m: new MagneticQN(-2),
				s: new SpinQN(-1),
			},
			{
				//104
				n: new MainQN(6),
				l: new OrbitalQN(2),
				m: new MagneticQN(-1),
				s: new SpinQN(1),
			},
			{
				//105
				n: new MainQN(6),
				l: new OrbitalQN(2),
				m: new MagneticQN(-1),
				s: new SpinQN(-1),
			},
			{
				//106
				n: new MainQN(6),
				l: new OrbitalQN(2),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//107
				n: new MainQN(6),
				l: new OrbitalQN(2),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//108
				n: new MainQN(6),
				l: new OrbitalQN(2),
				m: new MagneticQN(1),
				s: new SpinQN(1),
			},
			{
				//109
				n: new MainQN(6),
				l: new OrbitalQN(2),
				m: new MagneticQN(1),
				s: new SpinQN(-1),
			},
			{
				//110
				n: new MainQN(6),
				l: new OrbitalQN(2),
				m: new MagneticQN(2),
				s: new SpinQN(1),
			},
			{
				//111
				n: new MainQN(6),
				l: new OrbitalQN(2),
				m: new MagneticQN(2),
				s: new SpinQN(-1),
			},
			{
				//112
				n: new MainQN(7),
				l: new OrbitalQN(1),
				m: new MagneticQN(-1),
				s: new SpinQN(1),
			},
			{
				//113
				n: new MainQN(7),
				l: new OrbitalQN(1),
				m: new MagneticQN(-1),
				s: new SpinQN(-1),
			},
			{
				//114
				n: new MainQN(7),
				l: new OrbitalQN(1),
				m: new MagneticQN(0),
				s: new SpinQN(1),
			},
			{
				//115
				n: new MainQN(7),
				l: new OrbitalQN(1),
				m: new MagneticQN(0),
				s: new SpinQN(-1),
			},
			{
				//116
				n: new MainQN(7),
				l: new OrbitalQN(1),
				m: new MagneticQN(1),
				s: new SpinQN(1),
			},
			{
				//117
				n: new MainQN(7),
				l: new OrbitalQN(1),
				m: new MagneticQN(1),
				s: new SpinQN(-1),
			}
		]
		
	}



	/** Квантовые числа конкретной ячейки диаграммы */
	getCellQNByIndex( index: number ): QuantumNumbers
	{
		return this.#table[ index ];
	}

	/*getIndexByCellQN( index: number ): number | undefined
	{
		//
		return undefined;
	}*/
}

const quantumNumbersTableInstance = new QuantumNumbersTable();

export default quantumNumbersTableInstance;
