import IMetrics from "./MetricsInterface";

import type {
	MetricsData,
	Interval,
	Click,
} from "./MetricsInterface";

type TimeStamp = number;

type Status = boolean;


class Metrics implements IMetrics
{
	#data!: MetricsData;
	#isOn!: Status;
	#startUpTime!: TimeStamp;


	constructor()
	{
		this.reset();
		this.handleClick = this.handleClick.bind( this );
	}

	start(): void
	{
		if( this.#isOn )
			this.stop();

		this._addNewInterval();

		document.body.addEventListener(
			'click',
			this.handleClick,
		);

		this.#isOn = true;
	}

	private _createInterval(): Interval
	{
		return {
			start: Date.now(),
			end: 0,
			duration: 0,
			clicks: [],
		};
	}

	private _addNewInterval(): void
	{
		this.#data.push( this._createInterval() );
		this.#startUpTime = Date.now();
	}

	handleClick( event: MouseEvent ): void
	{
		if( !this.#isOn || event.target instanceof HTMLLabelElement )
			return;

		
		const lastInterval: Interval = this._getLastInterval();
		const click = this._createClickObj( event );
		lastInterval.clicks.push( click );
	}

	private _createClickObj( event: MouseEvent ): Click
	{
		return [
			event.pageX / document.documentElement.scrollWidth,
			event.pageY / document.documentElement.scrollHeight,
		];
	}

	private _getLastInterval(): Interval
	{
		return this.#data[ this.#data.length - 1 ];
	}

	private _updateLastInterval(): void
	{
		const now = Date.now();
		const lastInterval = this._getLastInterval();
		lastInterval.duration += now - this.#startUpTime;
		lastInterval.end = now;
	}

	stop(): void
	{
		if( !this.#isOn )
			return;
		
		this.#isOn = false;
		this._updateLastInterval();

		document.removeEventListener( 'click', this.handleClick );
	}

	addMark(): void
	{
		this._updateLastInterval();
		this._addNewInterval();
	}

	export(): MetricsData
	{
		return this.#data;
	}

	reset(): void
	{
		this.#data = [];
		this.#isOn = false;
		this.#startUpTime = Date.now();
	}
}




/* class Metrics implements IMetrics
{
	#data: MetricsData;
	#status: Status;
	#startUpTime: TimeStamp;


	constructor()
	{
		this.#data = [];
		this.#status = 'off';
		this.#startUpTime = Date.now();

		this.handleClick = this.handleClick.bind( this );
	}

	start(): void
	{
		if( this.#status !== 'off' )
			this.stop();

		this._addNewSession();
		this.#startUpTime = Date.now();

		document.addEventListener(
			'click',
			this.handleClick,
		);

		this.#status = 'on';
	}

	private _addNewSession() {
		this.#data.push( this._createSession() );
	}

	private _createSession(): Session
	{
		return [ this._createInterval() ];
	}

	private _createInterval(): Interval
	{
		return {
			start: Date.now(),
			end: 0,
			duration: 0,
			clicks: [],
		};
	}

	private _addNewInterval(): void
	{
		this._getLastSession().push( this._createInterval() );
	}

	handleClick( event: MouseEvent ): void
	{
		if( this.#status !== 'on' )
			return;

		const lastInterval: Interval = this._getLastInterval();
		lastInterval.clicks.push( this._createClickObj( event ) );
	}

	private _createClickObj( event: MouseEvent ): Click
	{
		return [
			event.pageX / document.documentElement.scrollWidth,
			event.pageY / document.documentElement.scrollHeight,
		];
	}

	private _getLastInterval(): Interval
	{
		const lastSession = this._getLastSession();
		return lastSession[ lastSession.length - 1 ];
	}

	private _getLastSession(): Session
	{
		return this.#data[ this.#data.length - 1 ];
	}

	pause(): void
	{
		if( this.#status !== 'on' )
			return;
		
		this.#status = 'paused';
		this._updateLastInterval();
	}

	private _updateLastInterval(): void
	{
		const now = Date.now();
		const lastInterval = this._getLastInterval();
		lastInterval.duration += now - this.#startUpTime;
		lastInterval.end = now;
	}

	continue(): void
	{
		if( this.#status !== 'paused' )
			return;

		this._addNewInterval();
		this.#startUpTime = Date.now();

		this.#status = 'on'; 
	}

	stop(): void
	{
		if( this.#status === 'off' )
			return;
		
		this.#status = 'off';
		this._updateLastInterval();

		document.removeEventListener( 'click', this.handleClick );
	}

	addMark(): void
	{
		if( this.#status === 'off' )
			return;

		this._updateLastInterval();
		this._addNewInterval();
		this.#startUpTime = Date.now();
	}

	export(): MetricsData
	{
		return this.#data;
	}
} */



export default Metrics;