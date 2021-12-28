import scheme from './scheme.json';

export type PageTypeStr = "window" | "task" | "start";

export type PageType = {
	type: PageTypeStr,
	url: string,
}


export type SubElementType = 'paragraph' | 'image' | 'progress' | 'results';

export type MWSubElementScheme = {
	type: SubElementType,
	value?: string,
	url?: string,
	style?: string,
}

export type MWButton = {
	value: string,
	action?: () => void,
	to?: string,
}

export type MWindow = {
	header: string,
	subheader?: string,
	content: MWSubElementScheme[],
	actions: MWButton[],
	align?: 'center'|'left',
};

export type MWindowScheme = {
	header: string,
	subheader?: string,
	content: MWSubElementScheme[],
	actions: MWButton[],
	style: 'instruction'|'modal',
};



export type ExpFilterTask = {
	prop: string,
	value: string,
}

export type ExpDiagramTask = [string, string, string, string] | 'generate'

export type ExpTask = {
	target: 'filter'|'diagram',
	event: string,
	expected: ExpFilterTask|ExpDiagramTask,
	infallibility: boolean,
}

export type SubState = ExpTask| MWindow;

export type StateScheme = SubState[];


/* ------------------------------------------------------------------ */


/*=============================================
=                JSON Scheme                =
=============================================*/


export type URL = keyof typeof scheme;

export type ContentScheme = {
	type: SubElementType,
	value?: string,
	url?: string,
	style?: string,
}

export type ActionScheme = {
	value: string,
	to: URL,
}

export type WindowScheme = {
	type: 'window' | 'start',
	style: 'instruction'|'modal'|'start',
	header: string,
	subheader?: string,
	content: ContentScheme[],
	actions: ActionScheme[],
}

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
}



/*=============================================
=                 Class Types                 =
=============================================*/

export type InfoProvider = {
	valueAsString: string,
}

export type TaskType = {
	message: string,
	comment: string,
	completeTasks: InfoProvider,
	rightTasks?: InfoProvider,
	timer?: InfoProvider,
}

