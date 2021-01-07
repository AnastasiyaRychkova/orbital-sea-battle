import { DiagramCell } from '../ChemicalElement/DiagramCell';
//import OrbitalQN from "../ChemicalElement/OrbitalQN";

/** Корабль */
type Ship = {
    /** Имя */
    name: string;

    /** Первая ячейка корабля */
    firstCell: DiagramCell;

    /** Последняя ячейка*/
    lastCell: DiagramCell;

    //level: mainQN;
    //orbital: OrbitalQN;
};

/**
 * Порядок кораблей в диаграмме
 */
const shipOrder: Array<Ship> = [
	{
        name: '1s',
        firstCell: new DiagramCell( 0 ),
        lastCell: new DiagramCell( 1 )
	},
	{
        name: '2s',
        firstCell: new DiagramCell( 2 ),
        lastCell: new DiagramCell( 3 )
    },
    {
        name: '2p',
        firstCell: new DiagramCell( 4 ),
        lastCell: new DiagramCell( 9 )
    },
    {
        name: '3s',
        firstCell: new DiagramCell( 10 ),
        lastCell: new DiagramCell( 11 )
    },
    {
        name: '3p',
        firstCell: new DiagramCell( 12 ),
        lastCell: new DiagramCell( 17 )
    },
    {
        name: '4s',
        firstCell: new DiagramCell( 18 ),
        lastCell: new DiagramCell( 19 )
    },
    {
        name: '3d',
        firstCell: new DiagramCell( 20 ),
        lastCell: new DiagramCell( 29 )
    },
    {
        name: '4p',
        firstCell: new DiagramCell( 30 ),
        lastCell: new DiagramCell( 35 )
    },
    {
        name: '5s',
        firstCell: new DiagramCell( 36 ),
        lastCell: new DiagramCell( 37 )
    },
    {
        name: '4d',
        firstCell: new DiagramCell( 38 ),
        lastCell: new DiagramCell( 47 )
    },
    {
        name: '5p',
        firstCell: new DiagramCell( 48 ),
        lastCell: new DiagramCell( 53 )
    },
    {
        name: '6s',
        firstCell: new DiagramCell( 54 ),
        lastCell: new DiagramCell( 55 )
    },
    {
        name: '4f',
        firstCell: new DiagramCell( 56 ),
        lastCell: new DiagramCell( 69 )
    },
    {
        name: '5d',
        firstCell: new DiagramCell( 70 ),
        lastCell: new DiagramCell( 79 )
    },
    {
        name: '6p',
        firstCell: new DiagramCell( 80 ),
        lastCell: new DiagramCell( 85 )
    },
    {
        name: '7s',
        firstCell: new DiagramCell( 86 ),
        lastCell: new DiagramCell( 87 )
    },
    {
        name: '5f',
        firstCell: new DiagramCell( 88 ),
        lastCell: new DiagramCell( 101 )
    },
    {
        name: '6d',
        firstCell: new DiagramCell( 102 ),
        lastCell: new DiagramCell( 111 )
    },
    {
        name: '7p',
        firstCell: new DiagramCell( 112 ),
        lastCell: new DiagramCell( 117 )
    }
];

export default shipOrder;

export type { Ship };