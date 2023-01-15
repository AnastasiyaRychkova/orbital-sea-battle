import ability from './ability';
import accuracy from './accuracy';
import check from './check';
import chevron from './chevron';
import clock from './clock';
import cross from './cross';
import diagram from './diagram';
import flag from './flag';
import full_screen from './full_screen';
import edit from './edit';
import hit from './hit';
import info from './info';
import left from './left';
import lightning from './lightning';
import login from './login';
import menu from './menu';
import play from './play';
import reduce from './reduce';
import repeat from './repeat';
import scroll from './scroll';
import settings from './settings';
import shot from './shot';
import typing from './typing';
import user from './user';


export const glyphs = {
	ability,
	accuracy,
	check,
	chevron,
	clock,
	cross,
	diagram,
	flag,
	full_screen,
	edit,
	hit,
	info,
	left,
	lightning,
	login,
	menu,
	play,
	reduce,
	repeat,
	scroll,
	settings,
	shot,
	typing,
	user,
};

export type GlyphType = keyof typeof glyphs;