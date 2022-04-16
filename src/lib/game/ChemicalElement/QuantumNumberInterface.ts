export type QNStrType = 'n' | 'l' | 'm' | 's';

interface IQuantumNumber
{
	toString(): string;
	value: number;
	assign( value: IQuantumNumber ): IQuantumNumber;
	type: QNStrType;
}


export default IQuantumNumber;