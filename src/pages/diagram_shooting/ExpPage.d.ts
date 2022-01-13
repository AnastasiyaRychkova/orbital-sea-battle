import scheme from './scheme.json';
import { MWContent, MWButton, MWContentType } from "../../components/ModalWindow/types";


/*=============================================
=                JSON Scheme                =
=============================================*/


export type URL = keyof typeof scheme;

export type ContentScheme = {
	type: MWContentType,
	value?: string,
	url?: string,
	style?: string,
};

export type ActionScheme = {
	value: string,
	to: URL,
};

export type WindowScheme = {
	type: 'window' | 'start',
	style: 'instruction'|'modal'|'start',
	header: string,
	subheader?: string,
	content: ContentScheme[],
	actions: ActionScheme[],
};

export type ExpectedTaskScheme = [string, string, string, string];

export type TaskScheme = {
	type: 'task',
	target: 'diagram'|'filter',
	event: string,
	expected: ExpectedTaskScheme[],
	infallibility: boolean,
	next: URL,
	message: string,
	comment: string,
	cost: number,
	bonusTime?: number,
	bonusCost?: number
};



/*=============================================
=                 Class Types                 =
=============================================*/

export type TaskExecutionProcess = {
	total: number,
	right: number,
	completed: number,
};


export type TaskType = {
	message: string,
	comment: string,
	process: TaskExecutionProcess,
	resultsLocation: URL,
};
