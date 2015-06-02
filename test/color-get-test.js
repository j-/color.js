QUnit.module('Color.getRed()');

QUnit.test('can get red channel', function (assert) {
	assert.equal(Color.getRed(0x000000), 0x00, '#000000');
	assert.equal(Color.getRed(0x888888), 0x88, '#888888');
	assert.equal(Color.getRed(0x123456), 0x12, '#123456');
	assert.equal(Color.getRed(0xc0ffee), 0xc0, '#c0ffee');
	assert.equal(Color.getRed('#fff'), 0xff, '#fff');
	assert.equal(Color.getRed('#bada55'), 0xba, '#bada55');
	assert.equal(Color.getRed('rgb(10, 20, 30)'), 10, 'rgb(10, 20, 30)');
	assert.equal(Color.getRed('rgb(20%, 40%, 60%)'), 0x33, 'rgb(20%, 40%, 60%)');
});

QUnit.module('Color.getGreen()');

QUnit.test('can get green channel', function (assert) {
	assert.equal(Color.getGreen(0x000000), 0x00, '#000000');
	assert.equal(Color.getGreen(0x888888), 0x88, '#888888');
	assert.equal(Color.getGreen(0x123456), 0x34, '#123456');
	assert.equal(Color.getGreen(0xc0ffee), 0xff, '#c0ffee');
	assert.equal(Color.getGreen('#fff'), 0xff, '#fff');
	assert.equal(Color.getGreen('#bada55'), 0xda, '#bada55');
	assert.equal(Color.getGreen('rgb(10, 20, 30)'), 20, 'rgb(10, 20, 30)');
	assert.equal(Color.getGreen('rgb(20%, 40%, 60%)'), 0x66, 'rgb(20%, 40%, 60%)');
});

QUnit.module('Color.getBlue()');

QUnit.test('can get blue channel', function (assert) {
	assert.equal(Color.getBlue(0x000000), 0x00, '#000000');
	assert.equal(Color.getBlue(0x888888), 0x88, '#888888');
	assert.equal(Color.getBlue(0x123456), 0x56, '#123456');
	assert.equal(Color.getBlue(0xc0ffee), 0xee, '#c0ffee');
	assert.equal(Color.getBlue('#fff'), 0xff, '#fff');
	assert.equal(Color.getBlue('#bada55'), 0x55, '#bada55');
	assert.equal(Color.getBlue('rgb(10, 20, 30)'), 30, 'rgb(10, 20, 30)');
	assert.equal(Color.getBlue('rgb(20%, 40%, 60%)'), 0x99, 'rgb(20%, 40%, 60%)');
});

QUnit.module('Color.getContrastingColor()');

QUnit.test('can get correct color', function (assert) {
	// See http://24ways.org/2010/calculating-color-contrast
	// Values from http://media.24ways.org/2010/suda/chips-yiq.gif
	assert.equal(Color.getContrastingColor(0xef4444), Color.MAX);
	assert.equal(Color.getContrastingColor(0xfaa31b), Color.MIN);
	assert.equal(Color.getContrastingColor(0xfff000), Color.MIN);
	assert.equal(Color.getContrastingColor(0x82c341), Color.MIN);
	assert.equal(Color.getContrastingColor(0x009f75), Color.MAX);
	assert.equal(Color.getContrastingColor(0x88c6ed), Color.MIN);
	assert.equal(Color.getContrastingColor(0x394ba0), Color.MAX);
	assert.equal(Color.getContrastingColor(0xd54799), Color.MAX);
	// Values from http://media.24ways.org/2010/suda/chips-common.gif
	assert.equal(Color.getContrastingColor(0xcccccc), Color.MIN);
	assert.equal(Color.getContrastingColor(0x999999), Color.MIN);
	assert.equal(Color.getContrastingColor(0x666666), Color.MAX);
	assert.equal(Color.getContrastingColor(0x333333), Color.MAX);
	assert.equal(Color.getContrastingColor(0xff0000), Color.MAX);
	assert.equal(Color.getContrastingColor(0x00ff00), Color.MIN);
	assert.equal(Color.getContrastingColor(0x0000ff), Color.MAX);
	assert.equal(Color.getContrastingColor(0xffff00), Color.MIN);
	assert.equal(Color.getContrastingColor(0xff00ff), Color.MAX);
	assert.equal(Color.getContrastingColor(0x00ffff), Color.MIN);
	// Values from http://media.24ways.org/2010/suda/chips-uncommon.gif
	assert.equal(Color.getContrastingColor(0xffcc00), Color.MIN);
	assert.equal(Color.getContrastingColor(0xccff00), Color.MIN);
	assert.equal(Color.getContrastingColor(0x00ccff), Color.MIN);
	assert.equal(Color.getContrastingColor(0xff6600), Color.MIN);
	assert.equal(Color.getContrastingColor(0xff0066), Color.MAX);
	assert.equal(Color.getContrastingColor(0x006666), Color.MAX);
	assert.equal(Color.getContrastingColor(0x0099cc), Color.MAX);
	assert.equal(Color.getContrastingColor(0x666600), Color.MAX);
	assert.equal(Color.getContrastingColor(0xcc00cc), Color.MAX);
	assert.equal(Color.getContrastingColor(0xcc6666), Color.MIN);
});
