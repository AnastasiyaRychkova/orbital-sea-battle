import PlayerTurn from "./PlayerTurn";

export type ReadinessStatusType = boolean;

export class ReadinessStatus
{
	#isReady: boolean

	constructor( isReady: boolean )
	{
		this.#isReady = isReady;
	}
}

export type ReadinessOrderType = boolean;

export class ReadinessOrder
{
	#isFirst: boolean;

	constructor( isFirst: boolean )
	{
		this.#isFirst = isFirst;
	}

	get isFirst(): boolean
	{
		return this.#isFirst;
	}
}


export type ReadinessCodeType = number;

export class ReadinessCode
{
	#code: ReadinessCodeType;

	constructor( code: ReadinessCodeType | ReadinessCode )
	{
		this.#code = code instanceof ReadinessCode ? code.#code : code;
	}

	static generate(): ReadinessCode
	{
		return new ReadinessCode( Math.random() );
	}

	calcPlayerTurnByReadinessOrder( opponentCode: ReadinessCode, order: ReadinessOrder )
	{
		const isPlayerTurn: boolean = Math.floor( ( this.#code + opponentCode.#code ) * 10 ) % 2 === Number( order.isFirst );

		return new PlayerTurn( isPlayerTurn );
	}

	
	asPrimitive(): ReadinessCodeType
	{
		return this.#code;
	}
	
}
