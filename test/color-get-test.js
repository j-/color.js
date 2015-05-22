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
