(function (root) {

'use strict';

var Color = root.Color = function (input) {
	this.value = Color.parse(input);
};

Color.MIN = 0x000000;
Color.MAX = 0xffffff;

Color.CHANNEL_MIN = 0x00;
Color.CHANNEL_MAX = 0xff;

const R = Color.R = Color.RED   = 0;
const G = Color.G = Color.GREEN = 1;
const B = Color.B = Color.BLUE  = 2;

const H = Color.H = Color.HUE        = 0;
const S = Color.S = Color.SATURATION = 1;
const L = Color.L = Color.LIGHTNESS  = 2;

Color.EXP_HEX = /^\s*#([0-9a-f]{6}|[0-9a-f]{3})\s*$/i;
Color.EXP_RGB = /^\s*rgb\(\s*(-?\d+%|-?\d+)\s*,\s*(-?\d+%|-?\d+)\s*,\s*(-?\d+%|-?\d+)\s*\)\s*$/i;
Color.EXP_RGBA = /^\s*rgba\(\s*(-?\d+%|-?\d+)\s*,\s*(-?\d+%|-?\d+)\s*,\s*(-?\d+%|-?\d+)\s*,\s*(-?(?:\d*\.)?\d+)\s*\)\s*$/i;
Color.EXP_HSL = /^\s*hsl\(\s*(-?\d+)\s*,\s*(-?\d+%)\s*,\s*(-?\d+%)\s*\)\s*$/i;
Color.EXP_HSLA = /^\s*hsla\(\s*(-?\d+)\s*,\s*(-?\d+%)\s*,\s*(-?\d+%)\s*,\s*(-?(?:\d*\.)?\d+)\s*\)\s*$/i;

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

Color.parse = function (input) {
	if (typeof input === 'number') {
		return Color.clamp(input);
	}
	var value;
	input = String(input);
	value = Color.parseKeyword(input);
	if (value !== null) { return value };
	value = Color.parseHexString(input);
	if (value !== null) { return value };
	value = Color.parseRGBString(input);
	if (value !== null) { return value };
	value = Color.parseRGBAString(input);
	if (value !== null) { return value };
	value = Color.parseHSLString(input);
	if (value !== null) { return value };
	value = Color.parseHSLAString(input);
	if (value !== null) { return value };
	return null;
};

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

Color.parseHueChannel = function (input) {
	input = Number(input);
	return input;
};

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

Color.parseRGBStringArray = function (arr) {
	var result = Color.parseRGBArray([
		Color.parseRGBChannel(arr[R]),
		Color.parseRGBChannel(arr[G]),
		Color.parseRGBChannel(arr[B])
	]);
	return result;
};

Color.parseRGBArray = function (arr) {
	var result = (
		Color.clampChannel(arr[R]) * 0x10000 +
		Color.clampChannel(arr[G]) * 0x100 +
		Color.clampChannel(arr[B])
	);
	return result;
};

Color.parseHSLStringArray = function (arr) {
	var result = Color.parseHSLArray([
		Color.parseHueChannel(arr[H]),
		Color.parsePercentChannel(arr[S]),
		Color.parsePercentChannel(arr[L])
	]);
	return result;
};

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

Color.parseKeyword = function (input) {
	input = String(input).toUpperCase();
	if (input in Color.KEYWORDS) {
		return Color.KEYWORDS[input];
	}
	return null;
};

Color.shortHexToLong = function (input) {
	input = Number(input);
	var nibbleR = Math.floor(input / 0x100);
	var nibbleG = Math.floor(input / 0x10) % 0x10;
	var nibbleB = input % 0x10;
	return (
		nibbleR * 0x110000 +
		nibbleG * 0x1100 +
		nibbleB * 0x11
	);
};

Color.clamp = function (input) {
	input = Number(input);
	input = Math.max(input, Color.MIN);
	input = Math.min(input, Color.MAX);
	input = Math.floor(input);
	return input;
};

Color.clampChannel = function (input) {
	input = Number(input);
	input = Math.max(input, Color.CHANNEL_MIN);
	input = Math.min(input, Color.CHANNEL_MAX);
	input = Math.floor(input);
	return input;
};

Color.clampPercent = function (input) {
	input = Number(input);
	input = Math.max(input, 0);
	input = Math.min(input, 1);
	return input;
};

Color.random = function () {
	return Math.floor(Math.random() * Color.MAX);
};

Color.getRed = function (input) {
	input = Color.parse(input);
	var red = Math.floor(input / 0x10000);
	return red;
};

Color.getGreen = function (input) {
	input = Color.parse(input);
	var green = Math.floor((input / 0x100) % 0x100);
	return green;
};

Color.getBlue = function (input) {
	input = Color.parse(input);
	var blue = input % 0x100;
	return blue;
};

Color.getRGBArray = function (input) {
	input = Color.parse(input);
	return [
		Math.floor(input / 0x10000),
		Math.floor((input / 0x100) % 0x100),
		input % 0x100
	];
};

Color.getHSLArray = function (input) {
	input = Color.parse(input);
	return [h, s, l];
};

Color.getHue = function (input) {
	var arr = Color.getRGBArray(input);
	var r = arr[R] / 0xff;
	var g = arr[G] / 0xff;
	var b = arr[B] / 0xff;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
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

Color.getSaturation = function (input) {
	var arr = Color.getRGBArray(input);
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
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

Color.getLightness = function (input) {
	var arr = Color.getRGBArray(input);
	var r = arr[R], g = arr[G], b = arr[B];
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var lightness = (max + min) / 2 / 0xff;
	return lightness;
};

Color.formatHexByte = function (input) {
	input = Number(input);
	var result = input.toString(16);
	if (input < 0x10) {
		result = '0' + result;
	}
	return result;
};

Color.formatHexString = function (input) {
	var arr = Color.getRGBArray(input);
	var r = Color.formatHexByte(arr[R]);
	var g = Color.formatHexByte(arr[G]);
	var b = Color.formatHexByte(arr[B]);
	var result = '#' + r + g + b;
	return result;
};

Color.formatShortHexByte = function (input) {
	input = Math.floor(input / 0x10);
	var result = input.toString(16);
	return result;
};

Color.formatShortHexString = function (input) {
	var arr = Color.getRGBArray(input);
	var r = Color.formatShortHexByte(arr[R]);
	var g = Color.formatShortHexByte(arr[G]);
	var b = Color.formatShortHexByte(arr[B]);
	var result = '#' + r + g + b;
	return result;
};

Color.formatRGBString = function (input) {
	var arr = Color.getRGBArray(input);
	var result = 'rgb(' +
		arr[R] + ', ' +
		arr[G] + ', ' +
		arr[B] +
	')';
	return result;
};

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

Color.formatHSLString = function (input) {
	input = Color.parse(input);
	var h = Color.getHue(input);
	var s = Color.getSaturation(input);
	var l = Color.getLightness(input);
	s = (s * 100) + '%';
	l = (l * 100) + '%';
	var result = 'hsl(' +
		h + ', ' +
		s + ', ' +
		l +
	')';
	return result;
};

Color.formatHSLAString = function (input, a) {
	a = (a === undefined) ? 1 : a;
	input = Color.parse(input);
	var h = Color.getHue(input);
	var s = Color.getSaturation(input);
	var l = Color.getLightness(input);
	s = (s * 100) + '%';
	l = (l * 100) + '%';
	var result = 'hsl(' +
		h + ', ' +
		s + ', ' +
		l + ', ' +
		a +
	')';
	return result;
};

if (Object.freeze) {
	Object.freeze(Color.KEYWORDS);
	Object.freeze(Color);
}

})(this);
