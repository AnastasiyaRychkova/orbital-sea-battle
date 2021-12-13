import React from "react";
import { Glyph } from "./type";

type GlyphStore = {
	[name in Glyph]: JSX.Element;
};


const glyphs: GlyphStore = {
	'cross': require( './cross' ).default,
	'info': require( './info' ).default,
	'shot': require( './shot' ).default,
};

function getGlyph( type: Glyph ) {
	return glyphs[ type ];
}

export default getGlyph;