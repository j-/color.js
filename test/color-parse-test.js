(function () {

QUnit.module('Color.parse()');

var actual = Color.parse;

var expected = (function () {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	return function (str) {
		canvas.width = canvas.height = 1;
		ctx.fillStyle = str;
		ctx.fillRect(0, 0, 1, 1);
		var id = ctx.getImageData(0, 0, 1, 1);
		var data = id.data;
		var value = 0;
		for (var i = 0; i < 3; i++) {
			value *= 0x100;
			value += data[i];
		}
		return value;
	};
})();

var test = function (input) {
	return QUnit.assert.equal(
		actual(input),
		expected(input),
		input
	);
};

QUnit.test('can parse three character hex', function (assert) {
	test('#000');
	test('#111');
	test('#555');
	test('#888');
	test('#aaa');
	test('#AAA');
	test('#Af0');
	test('#fff');
	test('#FFF');
	test('#001');
	test('#012');
	test('#123');
	test(' #af5');
	test('#d1e ');
	test(' #701 ');
});

QUnit.test('can parse six character hex', function (assert) {
	test('#000000');
	test('#000001');
	test('#101010');
	test('#111111');
	test('#123456');
	test('#abcdef');
	test('#c0ffee');
	test(' #dead00');
	test('#CAFE00 ');
	test(' #BEEF00 ');
});

QUnit.test('can parse rgb string', function (assert) {
	test('rgb(0, 0, 0)');
	test('rgb(255, 255, 255)');
	test(' rgb(12, 34, 56) '); // space around
	test('rgb( 15 , 20 , 30 )'); // space between
	test('RGB(10, 20, 30)'); // upper case
	test('rgb(999, 200, 350)'); // values greater than 255
	test('rgb(-55, -65, -0)'); // values less than 0
	test('rgb(10%, 20%, 0%)'); // values with percentages
});

QUnit.test('can parse rgba string', function (assert) {
	test('rgba(0, 0, 0, 1)');
	test('rgba(255, 255, 255, 1.0)');
	test(' rgba(0, 0, 0, -1.5) '); // space around
	test('rgba( 15 , 20 , 30 , 1)'); // space between
	test('RGBA(10, 20, 30, .4)'); // upper case
	test('rgba(999, 200, 350, 2)'); // values greater than 255
	test('rgba(-55, -65, -0, -0)'); // values less than 0
	test('rgba(10%, 20%, 0%, 1)'); // values with percentages
});

QUnit.skip('can parse hsl string', function (assert) {
	test('hsl(0, 0%, 0%)');
	test('hsl(255, 25%, 25%)');
	test(' hsl(12, 34%, 56%) '); // space around
	test('hsl( 15 , 20% , 30% )'); // space between
	test('HSL(10, 20%, 30%)'); // upper case
	test('hsl(999, 200%, 350%)'); // values greater than max
	test('hsl(-55, -65%, -0%)'); // values less than 0
});

QUnit.skip('can parse hsla string', function (assert) {
	test('hsla(0, 0%, 0%, 1)');
	test('hsla(255, 25%, 25%, 1.0)');
	test(' hsla(12, 34%, 56%, 0.5) '); // space around
	test('hsla( 15 , 20% , 30% , 1)'); // space between
	test('HSLA(10, 20%, 30%, .4)'); // upper case
	test('hsla(999, 200%, 350%, 2)'); // values greater than max
	test('hsla(-55, -65%, -0%, -0)'); // values less than 0
});

QUnit.test('can parse keyword', function (assert) {
	test('aliceblue'); test('antiquewhite'); test('aqua'); test('aquamarine');
	test('azure'); test('beige'); test('bisque'); test('black');
	test('blanchedalmond'); test('blue'); test('blueviolet'); test('brown');
	test('burlywood'); test('cadetblue'); test('chartreuse'); test('chocolate');
	test('coral'); test('cornflowerblue'); test('cornsilk'); test('crimson');
	test('cyan'); test('darkblue'); test('darkcyan'); test('darkgoldenrod');
	test('darkgray'); test('darkgreen'); test('darkgrey'); test('darkkhaki');
	test('darkmagenta'); test('darkolivegreen'); test('darkorange');
	test('darkorchid'); test('darkred'); test('darksalmon');
	test('darkseagreen'); test('darkslateblue'); test('darkslategray');
	test('darkslategrey'); test('darkturquoise'); test('darkviolet');
	test('deeppink'); test('deepskyblue'); test('dimgray'); test('dimgrey');
	test('dodgerblue'); test('firebrick'); test('floralwhite');
	test('forestgreen'); test('fuchsia'); test('gainsboro'); test('ghostwhite');
	test('gold'); test('goldenrod'); test('gray'); test('green');
	test('greenyellow'); test('grey'); test('honeydew'); test('hotpink');
	test('indianred'); test('indigo'); test('ivory'); test('khaki');
	test('lavender'); test('lavenderblush'); test('lawngreen');
	test('lemonchiffon'); test('lightblue'); test('lightcoral');
	test('lightcyan'); test('lightgoldenrodyellow'); test('lightgray');
	test('lightgreen'); test('lightgrey'); test('lightpink');
	test('lightsalmon'); test('lightseagreen'); test('lightskyblue');
	test('lightslategray'); test('lightslategrey'); test('lightsteelblue');
	test('lightyellow'); test('lime'); test('limegreen'); test('linen');
	test('magenta'); test('maroon'); test('mediumaquamarine');
	test('mediumblue'); test('mediumorchid'); test('mediumpurple');
	test('mediumseagreen'); test('mediumslateblue'); test('mediumspringgreen');
	test('mediumturquoise'); test('mediumvioletred'); test('midnightblue');
	test('mintcream'); test('mistyrose'); test('moccasin'); test('navajowhite');
	test('navy'); test('oldlace'); test('olive'); test('olivedrab');
	test('orange'); test('orangered'); test('orchid'); test('palegoldenrod');
	test('palegreen'); test('paleturquoise'); test('palevioletred');
	test('papayawhip'); test('peachpuff'); test('peru'); test('pink');
	test('plum'); test('powderblue'); test('purple'); test('red');
	test('rosybrown'); test('royalblue'); test('saddlebrown'); test('salmon');
	test('sandybrown'); test('seagreen'); test('seashell'); test('sienna');
	test('silver'); test('skyblue'); test('slateblue'); test('slategray');
	test('slategrey'); test('snow'); test('springgreen'); test('steelblue');
	test('tan'); test('teal'); test('thistle'); test('tomato');
	test('transparent'); test('turquoise'); test('violet'); test('wheat');
	test('white'); test('whitesmoke'); test('yellow'); test('yellowgreen');
});

})();

QUnit.module('Color.parseCMYKArray()');

QUnit.test('can get correct values', function (assert) {
	// Values from http://www.rapidtables.com/convert/color/rgb-to-cmyk.htm
	assert.deepEqual(Color.parseCMYKArray([0x00, 0x00, 0x00, 0xff]), 0x000000);
	assert.deepEqual(Color.parseCMYKArray([0x00, 0x00, 0x00, 0x00]), 0xffffff);
	assert.deepEqual(Color.parseCMYKArray([0x00, 0xff, 0xff, 0x00]), 0xff0000);
	assert.deepEqual(Color.parseCMYKArray([0xff, 0x00, 0xff, 0x00]), 0x00ff00);
	assert.deepEqual(Color.parseCMYKArray([0xff, 0xff, 0x00, 0x00]), 0x0000ff);
	assert.deepEqual(Color.parseCMYKArray([0x00, 0x00, 0xff, 0x00]), 0xffff00);
	assert.deepEqual(Color.parseCMYKArray([0xff, 0x00, 0x00, 0x00]), 0x00ffff);
	assert.deepEqual(Color.parseCMYKArray([0x00, 0xff, 0x00, 0x00]), 0xff00ff);
});
