(function (root) {

var valuePercent = /-?\d+%/;
var valueInt = /-?\d+/;
var valueAlpha = /-?(?:\d*\.)?\d+/;

var space = /\s*/;

var hex = /^ #([0-9a-f]{6}|[0-9a-f]{3}) $/i;
hex = rx.replace(hex, / /g, space);

var rgb = /^ rgb\( ($percent|$int) , ($percent|$int) , ($percent|$int) \) $/i;
rgb = rx.replace(rgb, / /g, space);
rgb = rx.replace(rgb, /\$percent/g, valuePercent);
rgb = rx.replace(rgb, /\$int/g, valueInt);

var rgba = /^ rgba\( ($percent|$int) , ($percent|$int) , ($percent|$int) , ($alpha) \) $/i;
rgba = rx.replace(rgba, / /g, space);
rgba = rx.replace(rgba, /\$percent/g, valuePercent);
rgba = rx.replace(rgba, /\$int/g, valueInt);
rgba = rx.replace(rgba, /\$alpha/, valueAlpha);

var hsl = /^ hsl\( ($int) , ($percent) , ($percent) \) $/i;
hsl = rx.replace(hsl, / /g, space);
hsl = rx.replace(hsl, /\$int/g, valueInt);
hsl = rx.replace(hsl, /\$percent/g, valuePercent);

var hsla = /^ hsla\( ($int) , ($percent) , ($percent) , ($alpha) \) $/i;
hsla = rx.replace(hsla, / /g, space);
hsla = rx.replace(hsla, /\$int/, valueInt);
hsla = rx.replace(hsla, /\$percent/g, valuePercent);
hsla = rx.replace(hsla, /\$alpha/, valueAlpha);

var expressions = root.expressions = {};
expressions.hex = hex;
expressions.rgb = rgb;
expressions.rgba = rgba;
expressions.hsl = hsl;
expressions.hsla = hsla;

console.table(expressions);

})(this);
