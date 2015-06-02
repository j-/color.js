(function (root) {

/* jshint esnext:true */

'use strict';

// Utility function.
// Define read-only properties on an object.
var def = function (obj, properties, value) {
	if (typeof properties === 'string') {
		properties = [properties];
	}
	properties.forEach(function (prop) {
		Object.defineProperty(obj, prop, {
			value: value,
			writable: false
		});
	});
	return value;
};

var min = Math.min, max = Math.max;
var ceil = Math.ceil, floor = Math.floor, round = Math.round;
var random = Math.random, pow = Math.pow;

/**
 * Module for processing and manipulating colors. Accepts numeric and string
 *   values. Any valid CSS color will be parsed. Can be constructed without the
 *   "new" keyword.
 * @param {Number|String|Color} input Color value, parsed by Color.parse.
 * @module Color
 * @class
 */
var Color = root.Color = function (input) {
	if (!(this instanceof Color)) {
		return new Color(input);
	}
	this.value = Color.parse(input);
};

/**
 * Minimum color value. Represents the color black.
 * @memberOf Color
 * @const
 */
const MIN = def(Color, 'MIN', 0x000000);

/**
 * Maximum color value. Represents the color white.
 * @memberOf Color
 * @const
 */
const MAX = def(Color, 'MAX', 0xffffff);

/**
 * Minimum channel value.
 * @memberOf Color
 * @const
 */
const CHANNEL_MIN = def(Color, 'CHANNEL_MIN', 0x00);

/**
 * Maximum channel value.
 * @memberOf Color
 * @const
 */
const CHANNEL_MAX = def(Color, 'CHANNEL_MAX', 0xff);

/**
 * Red channel position in RGB arrays.
 * @memberOf Color
 * @const
 */
const R = def(Color, ['R', 'RED'], 0);

/**
 * Green channel position in RGB arrays.
 * @memberOf Color
 * @const
 */
const G = def(Color, ['G', 'GREEN'], 1);

/**
 * Blue channel position in RGB arrays.
 * @memberOf Color
 * @const
 */
const B = def(Color, ['B', 'BLUE'], 2);

/**
 * Hue channel position in HSL arrays.
 * @memberOf Color
 * @const
 */
const H = def(Color, ['H', 'HUE'], 0);

/**
 * Saturation channel position in HSL arrays.
 * @memberOf Color
 * @const
 */
const S = def(Color, ['S', 'SATURATION'], 1);

/**
 * Lightness channel position in HSL arrays.
 * @memberOf Color
 * @const
 */
const L = def(Color, ['L', 'LIGHTNESS'], 2);

/**
 * Regular expression. Matches hexadecimal strings.
 * @memberOf Color
 * @const
 */
Color.EXP_HEX = /^\s*#([0-9a-f]{6}|[0-9a-f]{3})\s*$/i;

/**
 * Regular expression. Matches RGB strings.
 * @memberOf Color
 * @const
 */
Color.EXP_RGB = /^\s*rgb\(\s*(-?\d+%|-?\d+)\s*,\s*(-?\d+%|-?\d+)\s*,\s*(-?\d+%|-?\d+)\s*\)\s*$/i;

/**
 * Regular expression. Matches RGBA strings.
 * @memberOf Color
 * @const
 */
Color.EXP_RGBA = /^\s*rgba\(\s*(-?\d+%|-?\d+)\s*,\s*(-?\d+%|-?\d+)\s*,\s*(-?\d+%|-?\d+)\s*,\s*(-?(?:\d*\.)?\d+)\s*\)\s*$/i;

/**
 * Regular expression. Matches HSL strings.
 * @memberOf Color
 * @const
 */
Color.EXP_HSL = /^\s*hsl\(\s*(-?\d+)\s*,\s*(-?\d+%)\s*,\s*(-?\d+%)\s*\)\s*$/i;

/**
 * Regular expression. Matches HSLA strings.
 * @memberOf Color
 * @const
 */
Color.EXP_HSLA = /^\s*hsla\(\s*(-?\d+)\s*,\s*(-?\d+%)\s*,\s*(-?\d+%)\s*,\s*(-?(?:\d*\.)?\d+)\s*\)\s*$/i;

/**
 * Map of color name keywords and their values.
 * @memberOf Color
 * @const
 */
Color.KEYWORDS = {
	// basic
	AQUA:                   0x00ffff,
	BLACK:                  0x000000,
	BLUE:                   0x0000ff,
	FUCHSIA:                0xff00ff,
	GRAY:                   0x808080,
	GREEN:                  0x008000,
	LIME:                   0x00ff00,
	MAROON:                 0x800000,
	NAVY:                   0x000080,
	OLIVE:                  0x808000,
	PURPLE:                 0x800080,
	RED:                    0xff0000,
	SILVER:                 0xc0c0c0,
	TEAL:                   0x008080,
	WHITE:                  0xffffff,
	YELLOW:                 0xffff00,
	// extended
	ALICEBLUE:              0xf0f8ff,
	ANTIQUEWHITE:           0xfaebd7,
	AQUAMARINE:             0x7fffd4,
	AZURE:                  0xf0ffff,
	BEIGE:                  0xf5f5dc,
	BISQUE:                 0xffe4c4,
	BLANCHEDALMOND:         0xffebcd,
	BLUEVIOLET:             0x8a2be2,
	BROWN:                  0xa52a2a,
	BURLYWOOD:              0xdeb887,
	CADETBLUE:              0x5f9ea0,
	CHARTREUSE:             0x7fff00,
	CHOCOLATE:              0xd2691e,
	CORAL:                  0xff7f50,
	CORNFLOWERBLUE:         0x6495ed,
	CORNSILK:               0xfff8dc,
	CRIMSON:                0xdc143c,
	CYAN:                   0x00ffff,
	DARKBLUE:               0x00008b,
	DARKCYAN:               0x008b8b,
	DARKGOLDENROD:          0xb8860b,
	DARKGRAY:               0xa9a9a9,
	DARKGREEN:              0x006400,
	DARKGREY:               0xa9a9a9,
	DARKKHAKI:              0xbdb76b,
	DARKMAGENTA:            0x8b008b,
	DARKOLIVEGREEN:         0x556b2f,
	DARKORANGE:             0xff8c00,
	DARKORCHID:             0x9932cc,
	DARKRED:                0x8b0000,
	DARKSALMON:             0xe9967a,
	DARKSEAGREEN:           0x8fbc8f,
	DARKSLATEBLUE:          0x483d8b,
	DARKSLATEGRAY:          0x2f4f4f,
	DARKSLATEGREY:          0x2f4f4f,
	DARKTURQUOISE:          0x00ced1,
	DARKVIOLET:             0x9400d3,
	DEEPPINK:               0xff1493,
	DEEPSKYBLUE:            0x00bfff,
	DIMGRAY:                0x696969,
	DIMGREY:                0x696969,
	DODGERBLUE:             0x1e90ff,
	FIREBRICK:              0xb22222,
	FLORALWHITE:            0xfffaf0,
	FORESTGREEN:            0x228b22,
	GAINSBORO:              0xdcdcdc,
	GHOSTWHITE:             0xf8f8ff,
	GOLD:                   0xffd700,
	GOLDENROD:              0xdaa520,
	GREENYELLOW:            0xadff2f,
	GREY:                   0x808080,
	HONEYDEW:               0xf0fff0,
	HOTPINK:                0xff69b4,
	INDIANRED:              0xcd5c5c,
	INDIGO:                 0x4b0082,
	IVORY:                  0xfffff0,
	KHAKI:                  0xf0e68c,
	LAVENDER:               0xe6e6fa,
	LAVENDERBLUSH:          0xfff0f5,
	LAWNGREEN:              0x7cfc00,
	LEMONCHIFFON:           0xfffacd,
	LIGHTBLUE:              0xadd8e6,
	LIGHTCORAL:             0xf08080,
	LIGHTCYAN:              0xe0ffff,
	LIGHTGOLDENRODYELLOW:   0xfafad2,
	LIGHTGRAY:              0xd3d3d3,
	LIGHTGREEN:             0x90ee90,
	LIGHTGREY:              0xd3d3d3,
	LIGHTPINK:              0xffb6c1,
	LIGHTSALMON:            0xffa07a,
	LIGHTSEAGREEN:          0x20b2aa,
	LIGHTSKYBLUE:           0x87cefa,
	LIGHTSLATEGRAY:         0x778899,
	LIGHTSLATEGREY:         0x778899,
	LIGHTSTEELBLUE:         0xb0c4de,
	LIGHTYELLOW:            0xffffe0,
	LIMEGREEN:              0x32cd32,
	LINEN:                  0xfaf0e6,
	MAGENTA:                0xff00ff,
	MEDIUMAQUAMARINE:       0x66cdaa,
	MEDIUMBLUE:             0x0000cd,
	MEDIUMORCHID:           0xba55d3,
	MEDIUMPURPLE:           0x9370db,
	MEDIUMSEAGREEN:         0x3cb371,
	MEDIUMSLATEBLUE:        0x7b68ee,
	MEDIUMSPRINGGREEN:      0x00fa9a,
	MEDIUMTURQUOISE:        0x48d1cc,
	MEDIUMVIOLETRED:        0xc71585,
	MIDNIGHTBLUE:           0x191970,
	MINTCREAM:              0xf5fffa,
	MISTYROSE:              0xffe4e1,
	MOCCASIN:               0xffe4b5,
	NAVAJOWHITE:            0xffdead,
	OLDLACE:                0xfdf5e6,
	OLIVEDRAB:              0x6b8e23,
	ORANGE:                 0xffa500,
	ORANGERED:              0xff4500,
	ORCHID:                 0xda70d6,
	PALEGOLDENROD:          0xeee8aa,
	PALEGREEN:              0x98fb98,
	PALETURQUOISE:          0xafeeee,
	PALEVIOLETRED:          0xdb7093,
	PAPAYAWHIP:             0xffefd5,
	PEACHPUFF:              0xffdab9,
	PERU:                   0xcd853f,
	PINK:                   0xffc0cb,
	PLUM:                   0xdda0dd,
	POWDERBLUE:             0xb0e0e6,
	REBECCAPURPLE:          0x993366,
	ROSYBROWN:              0xbc8f8f,
	ROYALBLUE:              0x4169e1,
	SADDLEBROWN:            0x8b4513,
	SALMON:                 0xfa8072,
	SANDYBROWN:             0xf4a460,
	SEAGREEN:               0x2e8b57,
	SEASHELL:               0xfff5ee,
	SIENNA:                 0xa0522d,
	SKYBLUE:                0x87ceeb,
	SLATEBLUE:              0x6a5acd,
	SLATEGRAY:              0x708090,
	SLATEGREY:              0x708090,
	SNOW:                   0xfffafa,
	SPRINGGREEN:            0x00ff7f,
	STEELBLUE:              0x4682b4,
	TAN:                    0xd2b48c,
	THISTLE:                0xd8bfd8,
	TOMATO:                 0xff6347,
	TURQUOISE:              0x40e0d0,
	VIOLET:                 0xee82ee,
	WHEAT:                  0xf5deb3,
	WHITESMOKE:             0xf5f5f5,
	YELLOWGREEN:            0x9acd32,
	// special
	TRANSPARENT:            0x000000
};

/**
 * Parse any color input value. Can be a number or hex, RGB or HSL string.
 * @memberOf Color
 * @param {Number|String|Color} input Input value
 * @return {?Number} Numeric value between 0 and 0xffffff. Null if invalid.
 */
Color.parse = function (input) {
	if (!isNaN(input)) {
		return Color.clamp(input);
	}
	var value;
	input = String(input);
	value = Color.parseKeyword(input);
	if (value !== null) { return value; }
	value = Color.parseHexString(input);
	if (value !== null) { return value; }
	value = Color.parseRGBString(input);
	if (value !== null) { return value; }
	value = Color.parseRGBAString(input);
	if (value !== null) { return value; }
	value = Color.parseHSLString(input);
	if (value !== null) { return value; }
	value = Color.parseHSLAString(input);
	if (value !== null) { return value; }
	return null;
};

/**
 * Determine if an input color is valid. The input can be a number or string.
 * @memberOf Color
 * @param {Number|String|Color} input Color to test
 * @return {Boolean} True if valid, false otherwise
 */
Color.isValid = function (input) {
	var value = Color.parse(input);
	var isValid = value === null;
	return isValid;
};

/**
 * Parse RGB string channel. Can be an integer between 0 and 255 or a percent
 *   value between 0% and 100%. Values outside this range will be clamped.
 * @memberOf Color
 * @param {Number|String} input Input value
 * @return {Number} Parsed value between 0 and 255
 */
Color.parseRGBChannel = function (input) {
	input = String(input);
	var value = input;
	var percentIndex = input.indexOf('%');
	if (percentIndex !== -1) {
		value = value.substring(0, percentIndex);
		value *= 0x100;
		value /= 100;
	}
	value = Color.clampChannel(value);
	return value;
};

/**
 * Parse HSL string hue. Can be any integer value.
 * @memberOf Color
 * @param {Number|String} input Input value
 * @return {Number} Parsed value
 */
Color.parseHueChannel = function (input) {
	input = Number(input);
	return input;
};

/**
 * Parse HSL string saturation or lightness. Can be any percentage value between
 *   0 and 100%. Values outside this range will be clamped.
 * @memberOf Color
 * @param {Number|String} input Input value
 * @return {?Number} Parsed value
 */
Color.parsePercentChannel = function (input) {
	input = String(input);
	var value = input;
	var percentIndex = input.indexOf('%');
	if (percentIndex === -1) {
		return null;
	}
	value = value.substring(0, percentIndex);
	value /= 100;
	value = Color.clampPercent(value);
	return value;
};

/**
 * Parse the channels of a RGB string. Each channel can be an integer or a
 *   percent value.
 * @memberOf Color
 * @param {Array.<Number|String>} arr Input value array
 * @return {Number} Parsed value between 0 and 0xffffff
 */
Color.parseRGBStringArray = function (arr) {
	var result = Color.parseRGBArray([
		Color.parseRGBChannel(arr[R]),
		Color.parseRGBChannel(arr[G]),
		Color.parseRGBChannel(arr[B])
	]);
	return result;
};

/**
 * Combine the values of the red, green and blue channels of a color. Each
 *   channel value is clamped to the range 0 and 255.
 * @memberOf Color
 * @param {Number[]} arr RGB value array
 * @return {Number} Parsed value between 0 and 0xffffff
 */
Color.parseRGBArray = function (arr) {
	var result = (
		Color.clampChannel(arr[R]) * 0x10000 +
		Color.clampChannel(arr[G]) * 0x100 +
		Color.clampChannel(arr[B])
	);
	return result;
};

/**
 * Parse the channels of a HSL string. The hue value is an integer between 0 and
 *   360. The saturation and lightness values are percentages.
 * @memberOf Color
 * @param {Array.<Number|String>} arr Input value array
 * @return {Number} Parsed value between 0 and 0xffffff
 */
Color.parseHSLStringArray = function (arr) {
	var result = Color.parseHSLArray([
		Color.parseHueChannel(arr[H]),
		Color.parsePercentChannel(arr[S]),
		Color.parsePercentChannel(arr[L])
	]);
	return result;
};

/**
 * Calculate a color using a hue in the range 0 and 360, and saturation and
 *   lightness values between 0 and 1.
 * @memberOf Color
 * @param {Number[]} arr HSL value array
 * @return {Number} Parsed value between 0 and 0xffffff
 */
Color.parseHSLArray = function (arr) {
	var h = arr[H], s = arr[S], l = arr[L];
	h /= 360;
	var m2 = (l <= 0.5) ?
		l * (s + 1) :
		l + s - l * s;
	var m1 = l * 2 - m2;
	var result = Color.parseRGBArray([
		Color.parseHue(m1, m2, h + 1 / 3) * 0x100,
		Color.parseHue(m1, m2, h)         * 0x100,
		Color.parseHue(m1, m2, h - 1 / 3) * 0x100
	]);
	return result;
};

/**
 * Helper for calculating red, green or blue values from a given hue.
 * @memberOf Color
 * @param {Number} m1
 * @param {Number} m2
 * @param {Number} hue
 * @return {Number} Hue value between 0 and 360
 */
Color.parseHue = function (m1, m2, hue) {
	if (hue < 0) {
		hue++;
	}
	if (hue > 1) {
		hue--;
	}
	if (hue < 1 / 6) {
		return m1 + (m2 - m1) * hue * 6;
	}
	if (hue < 1 / 2) {
		return m2;
	}
	if (hue < 2 / 3) {
		return m1 + (m2 - m1) * (2 / 3 - hue) * 6;
	}
	return m1;
};

/**
 * Parse hexadecimal color string.
 * @memberOf Color
 * @param {String} input Hex string
 * @return {?Number} Numeric value between 0 and 0xffffff. Null if invalid.
 */
Color.parseHexString = function (input) {
	input = String(input);
	var match = input.match(Color.EXP_HEX);
	if (!match) {
		return null;
	}
	var hex = match[1];
	var length = hex.length;
	var isShort = (length === 3);
	var isLong = (length === 6);
	var value = 0;
	if (!isShort && !isLong) {
		return null;
	}
	value = parseInt(hex, 0x10);
	if (isShort) {
		value = Color.shortHexToLong(value);
	}
	return value;
};

/**
 * Parse RGB color string.
 * @memberOf Color
 * @param {String} input RGB string
 * @return {?Number} Numeric value between 0 and 0xffffff. Null if invalid.
 */
Color.parseRGBString = function (input) {
	input = String(input);
	var match = input.match(Color.EXP_RGB);
	if (!match) {
		return null;
	}
	var value = Color.parseRGBStringArray([
		match[R + 1],
		match[G + 1],
		match[B + 1]
	]);
	return value;
};

/**
 * Parse RGBA color string.
 * @memberOf Color
 * @param {String} input RGBA string
 * @return {?Number} Numeric value between 0 and 0xffffff. Null if invalid.
 */
Color.parseRGBAString = function (input) {
	input = String(input);
	var match = input.match(Color.EXP_RGBA);
	if (!match) {
		return null;
	}
	var value = Color.parseRGBStringArray([
		match[R + 1],
		match[G + 1],
		match[B + 1]
	]);
	return value;
};

/**
 * Parse HSL color string.
 * @memberOf Color
 * @param {String} input HSL string
 * @return {?Number} Numeric value between 0 and 0xffffff. Null if invalid.
 */
Color.parseHSLString = function (input) {
	input = String(input);
	var match = input.match(Color.EXP_HSL);
	if (!match) {
		return null;
	}
	var value = Color.parseHSLStringArray([
		match[H + 1],
		match[S + 1],
		match[L + 1]
	]);
	return value;
};

/**
 * Parse HSLA color string.
 * @memberOf Color
 * @param {String} input HSLA string
 * @return {?Number} Numeric value between 0 and 0xffffff. Null if invalid.
 */
Color.parseHSLAString = function (input) {
	input = String(input);
	var match = input.match(Color.EXP_HSLA);
	if (!match) {
		return null;
	}
	var value = Color.parseHSLStringArray([
		match[H + 1],
		match[S + 1],
		match[L + 1]
	]);
	return value;
};

/**
 * Parse keyword color string.
 * @memberOf Color
 * @param {String} input Keyword string
 * @return {?Number} Numeric value between 0 and 0xffffff. Null if invalid.
 */
Color.parseKeyword = function (input) {
	input = String(input).toUpperCase();
	if (input in Color.KEYWORDS) {
		return Color.KEYWORDS[input];
	}
	return null;
};

/**
 * Convert number in the form 0x123 to 0x112233.
 * @memberOf Color
 * @param {Number} input Short hex value
 * @return {Number} Numeric value between 0 and 0xffffff
 */
Color.shortHexToLong = function (input) {
	input = Number(input);
	var nibbleR = floor(input / 0x100);
	var nibbleG = floor(input / 0x10) % 0x10;
	var nibbleB = input % 0x10;
	return (
		nibbleR * 0x110000 +
		nibbleG * 0x1100 +
		nibbleB * 0x11
	);
};

/**
 * Clamp a color between 0 and 0xffffff.
 * @memberOf Color
 * @param {Number|Color} input Input value
 * @return {Number} Numeric value between 0 and 0xffffff
 */
Color.clamp = function (input) {
	input = Number(input);
	input = max(input, MIN);
	input = min(input, MAX);
	input = floor(input);
	return input;
};

/**
 * Clamp a RGB channel between 0 and 0xff.
 * @memberOf Color
 * @param {Number} input Input value
 * @return {Number} Numeric value between 0 and 0xff
 */
Color.clampChannel = function (input) {
	input = Number(input);
	input = max(input, CHANNEL_MIN);
	input = min(input, CHANNEL_MAX);
	input = floor(input);
	return input;
};

/**
 * Clamp a percentage value between 0 and 1.
 * @memberOf Color
 * @param {Number} input Input value
 * @return {Number} Numeric value between 0 and 1
 */
Color.clampPercent = function (input) {
	input = Number(input);
	input = max(input, 0);
	input = min(input, 1);
	return input;
};

/**
 * Get a random color value.
 * @memberOf Color
 * @return {Number} Random color between 0 and 0xffffff
 */
Color.random = function () {
	return floor(random() * MAX);
};

/**
 * Get the value of the red channel of a color.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {Number} Channel value between 0 and 0xff
 */
Color.getRed = function (input) {
	input = Color.parse(input);
	var red = floor(input / 0x10000);
	return red;
};

/**
 * Get the value of the green channel of a color.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {Number} Channel value between 0 and 0xff
 */
Color.getGreen = function (input) {
	input = Color.parse(input);
	var green = floor((input / 0x100) % 0x100);
	return green;
};

/**
 * Get the value of the blue channel of a color.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {Number} Channel value between 0 and 0xff
 */
Color.getBlue = function (input) {
	input = Color.parse(input);
	var blue = input % 0x100;
	return blue;
};

/**
 * Get the red, green and blue channel values of a color in an array. Each
 *   channel will be in the range 0 to 0xff.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {Number[]} RGB color array
 */
Color.getRGBArray = function (input) {
	input = Color.parse(input);
	return [
		floor(input / 0x10000),
		floor((input / 0x100) % 0x100),
		input % 0x100
	];
};

/**
 * Get the hue, saturation and lightness values of a color in an array. The hue
 *   value will be in the range 0 to 360. Both the saturation and lightness
 *   values will be between 0 and 1.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {Number[]} HSL color array
 */
Color.getHSLArray = function (input) {
	return null;
};

/**
 * Get the value of the hue channel of a color.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {Number} Hue value between 0 and 360
 */
Color.getHue = function (input) {
	var arr = Color.getRGBArray(input);
	var r = arr[R] / CHANNEL_MAX;
	var g = arr[G] / CHANNEL_MAX;
	var b = arr[B] / CHANNEL_MAX;
	var min = min(r, g, b);
	var max = max(r, g, b);
	var diff, hue;
	if (max === min) {
		return 0;
	}
	diff = max - min;
	switch (max) {
		case r:
			hue = (g - b) / diff;
			break;
		case g:
			hue = 2 + (b - r) / diff;
			break;
		case b:
			hue = 4 + (r - g) / diff;
			break;
	}
	hue *= 60;
	if (hue < 0) {
		hue += 360;
	}
	return hue;
};

/**
 * Get the value of the saturation channel of a color.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {Number} Saturation value between 0 and 1
 */
Color.getSaturation = function (input) {
	var arr = Color.getRGBArray(input);
	var r = arr[R], g = arr[G], b = arr[B];
	var min = min(r, g, b);
	var max = max(r, g, b);
	var diff = max - min;
	if (diff === 0) {
		return 0;
	}
	var total = max + min;
	var lightness = total / 2;
	if (lightness > 127.5) {
		return diff / (510 - max - min);
	}
	else {
		return diff / total;
	}
};

/**
 * Get the value of the lightness channel of a color.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {Number} Lightness value between 0 and 360
 */
Color.getLightness = function (input) {
	var arr = Color.getRGBArray(input);
	var r = arr[R], g = arr[G], b = arr[B];
	var min = min(r, g, b);
	var max = max(r, g, b);
	var lightness = (max + min) / 2 / CHANNEL_MAX;
	return lightness;
};

/**
 * The relative brightness of any point, normalized to 0 for darkest black and 1
 *   for lightest white.
 * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 * @param {Number|String|Color} input Input color
 * @return {Number} Luminance value between 0 and 1;
 */
Color.getLuminance = function (input) {
	var arr = Color.getRGBArray(input);
	var r = arr[R], g = arr[G], b = arr[B];
	r = (r <= 0.03928) ? (r / 12.92) : pow(r + 0.055 / 1.055, 2.4);
	g = (g <= 0.03928) ? (g / 12.92) : pow(g + 0.055 / 1.055, 2.4);
	b = (b <= 0.03928) ? (b / 12.92) : pow(b + 0.055 / 1.055, 2.4);
	var result = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	return result;
};

/**
 * Format a channel value as a hexadecimal string, zero padded.
 * @memberOf Color
 * @param {Number|String} input Input value
 * @return {String} Hexadecimal string
 */
Color.formatHexByte = function (input) {
	input = Number(input);
	var result = input.toString(16);
	if (input < 0x10) {
		result = '0' + result;
	}
	return result;
};

/**
 * Format a color as a hexadecimal string, zero padded, with a leading '#'.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {String} Hexadecimal string
 */
Color.formatHexString = function (input) {
	var arr = Color.getRGBArray(input);
	var r = Color.formatHexByte(arr[R]);
	var g = Color.formatHexByte(arr[G]);
	var b = Color.formatHexByte(arr[B]);
	var result = '#' + r + g + b;
	return result;
};

/**
 * Format a channel value as a hexadecimal string in short format.
 * @memberOf Color
 * @param {Number|String} input Input value
 * @return {String} Hexadecimal string
 */
Color.formatShortHexByte = function (input) {
	input = floor(input / 0x10);
	var result = input.toString(16);
	return result;
};

/**
 * Format a color as a hexadecimal string, zero padded, with a leading '#'.
 *   The result will be a short hex string (e.g. '#f00').
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {String} Hexadecimal string
 */
Color.formatShortHexString = function (input) {
	var arr = Color.getRGBArray(input);
	var r = Color.formatShortHexByte(arr[R]);
	var g = Color.formatShortHexByte(arr[G]);
	var b = Color.formatShortHexByte(arr[B]);
	var result = '#' + r + g + b;
	return result;
};

/**
 * Format a color as a RGB string.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {String} RGB string
 */
Color.formatRGBString = function (input) {
	var arr = Color.getRGBArray(input);
	var result = 'rgb(' +
		arr[R] + ', ' +
		arr[G] + ', ' +
		arr[B] +
	')';
	return result;
};

/**
 * Format a color as a RGBA string.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @param {Number|String} [alpha=1] Alpha value
 * @return {String} RGBA string
 */
Color.formatRGBAString = function (input, a) {
	a = (a === undefined) ? 1 : a;
	var arr = Color.getRGBArray(input);
	var result = 'rgba(' +
		arr[R] + ', ' +
		arr[G] + ', ' +
		arr[B] + ', ' +
		a +
	')';
	return result;
};

/**
 * Format a color as a RGB string using percentage values.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {String} RGB percent string
 */
Color.formatRGBPercentString = function (input) {
	var arr = Color.getRGBArray(input);
	var r = round(arr[R] / CHANNEL_MAX * 100) + '%';
	var g = round(arr[G] / CHANNEL_MAX * 100) + '%';
	var b = round(arr[B] / CHANNEL_MAX * 100) + '%';
	var result = 'rgb(' +
		r + ', ' +
		g + ', ' +
		b +
	')';
	return result;
};

/**
 * Format a color as a RGBA string using percentage values.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @param {Number|String} [alpha=1] Alpha value
 * @return {String} RGBA percent string
 */
Color.formatRGBAPercentString = function (input, a) {
	a = (a === undefined) ? 1 : a;
	var arr = Color.getRGBArray(input);
	var r = round(arr[R] / CHANNEL_MAX * 100) + '%';
	var g = round(arr[G] / CHANNEL_MAX * 100) + '%';
	var b = round(arr[B] / CHANNEL_MAX * 100) + '%';
	var result = 'rgba(' +
		r + ', ' +
		g + ', ' +
		b + ', ' +
		a +
	')';
	return result;
};

/**
 * Format a color as a HSL string.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @return {String} HSL string
 */
Color.formatHSLString = function (input) {
	input = Color.parse(input);
	var h = Color.getHue(input);
	var s = Color.getSaturation(input);
	var l = Color.getLightness(input);
	h = round(h);
	s = round(s * 100) + '%';
	l = round(l * 100) + '%';
	var result = 'hsl(' +
		h + ', ' +
		s + ', ' +
		l +
	')';
	return result;
};

/**
 * Format a color as a HSLA string.
 * @memberOf Color
 * @param {Number|String|Color} input Input color
 * @param {Number|String} [alpha=1] Alpha value
 * @return {String} HSLA string
 */
Color.formatHSLAString = function (input, a) {
	a = (a === undefined) ? 1 : a;
	input = Color.parse(input);
	var h = Color.getHue(input);
	var s = Color.getSaturation(input);
	var l = Color.getLightness(input);
	h = round(h);
	s = round(s * 100) + '%';
	l = round(l * 100) + '%';
	var result = 'hsl(' +
		h + ', ' +
		s + ', ' +
		l + ', ' +
		a +
	')';
	return result;
};

/**
 * Get a color with all its channels inverted. For example, #f00 becomes #0ff.
 * @param {Number|String|Color} input Input color
 * @return {Number} The inverted color value
 */
Color.invert = function (input) {
	input = Color.parse(input);
	var result = MAX - input;
	return result;
};

/**
 * Return a full channel name from an input channel name or fragment thereof.
 * @param {String} input Input string e.g. 'S', 'sat', 'Saturation' etc.
 * @return {?String} Full channel name e.g. 'red', 'hue', etc. or null.
 */
Color.normalizeChannel = function (input) {
	input = String(input);
	var ch = input.charAt(0).toLowerCase();
	switch (ch) {
		case 'r': return 'red';
		case 'g': return 'green';
		case 'b': return 'blue';
		case 'h': return 'hue';
		case 's': return 'saturation';
		case 'l': return 'lightness';
	}
	return null;
};

/**
 * Get the numeric value of this color.
 * @memberOf Color
 * @return {Number} Numeric value
 */
Color.prototype.valueOf = function () {
	return Number(this.value);
};

/**
 * Get the string representation of this color.
 * @memberOf Color
 * @return {Number} RGBA string
 */
Color.prototype.toString = function () {
	return Color.formatRGBAString(this);
};

/**
 * Return a new instance of this color.
 * @memberOf Color
 * @return {Color} Clone
 */
Color.prototype.clone = function () {
	return new Color(this);
};

})(this);
