import ability from './ability';
import accuracy from './accuracy';
import clock from './clock';
import chevron from './chevron';
import cross from './cross';
import full_screen from './full_screen';
import hit from './hit';
import info from './info';
import play from './play';
import shot from './shot';
import left from './left';
import repeat from './repeat';
import flag from './flag';
import diagram from './diagram';

export const glyphs = {
	ability,
	accuracy,
	clock,
	chevron,
	cross,
	full_screen,
	hit,
	info,
	play,
	shot,
	left,
	repeat,
	flag,
	diagram,
};

export type GlyphType = keyof typeof glyphs;