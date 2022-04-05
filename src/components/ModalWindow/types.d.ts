import { Glyph } from "../Icon/glyph/type";

export type MWContentType = 'paragraph'
							| 'image'
							| 'progress'
							| 'results'
							| 'mark';

export type MWContent = {
	type: MWContentType,
	value?: string,
	url?: string,
	style?: string,
	variant?: number,
}

export type MWButton = {
	value: string,
	action?: () => void,
	to?: string,
}

export type MWScheme = {
	header: string,
	subheader?: string,
	content: MWContent[],
	actions: MWButton[],
	style?: string,
};

export type PerformanceIndicator = {
	name: string,
	value: string | number,
	icon: Glyph,
};

export type TaskResults = PerformanceIndicator[];

export type UserAssessment = {
	get: ( name: string ) => number,
	set: ( name: string, value: number ) => void,
}

export type ButtonAction = {
	onClick?: () => void,
	disabled?: boolean,
};

export type ButtonActions = {
	primary?: ButtonAction,
	secondary?: ButtonAction,
}