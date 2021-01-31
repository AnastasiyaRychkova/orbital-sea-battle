type ShipProps = {
	firstCellIndex: number,
	length: number,
}

type DiagramStructure = Map<string, ShipProps>;

const diagramStructure: DiagramStructure = new Map([
	[ '1s', {
		firstCellIndex: 0,
		length: 1,
	} ],
	[ '2s', {
		firstCellIndex: 2,
		length: 1,
	} ],
	[ '2p', {
		firstCellIndex: 4,
		length: 3,
	} ],
	[ '3s', {
		firstCellIndex: 10,
		length: 1,
	} ],
	[ '3p', {
		firstCellIndex: 12,
		length: 3,
	} ],
	[ '4s', {
		firstCellIndex: 18,
		length: 1,
	} ],
	[ '3d', {
		firstCellIndex: 20,
		length: 5,
	} ],
	[ '4p', {
		firstCellIndex: 30,
		length: 3,
	} ],
	[ '5s', {
		firstCellIndex: 36,
		length: 1,
	} ],
	[ '4d', {
		firstCellIndex: 38,
		length: 5,
	} ],
	[ '5p', {
		firstCellIndex: 48,
		length: 3,
	} ],
	[ '6s', {
		firstCellIndex: 54,
		length: 1,
	} ],
	[ '4f', {
		firstCellIndex: 56,
		length: 7,
	} ],
	[ '5d', {
		firstCellIndex: 70,
		length: 5,
	} ],
	[ '6p', {
		firstCellIndex: 80,
		length: 3,
	} ],
	[ '7s', {
		firstCellIndex: 86,
		length: 1,
	} ],
	[ '5f', {
		firstCellIndex: 88,
		length: 7,
	} ],
	[ '6d', {
		firstCellIndex: 102,
		length: 5,
	} ],
	[ '7p', {
		firstCellIndex: 112,
		length: 3,
	} ],
]);

export default diagramStructure;