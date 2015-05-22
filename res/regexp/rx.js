(function (root) {

'use strict';

root.rx = {};

var Flags = rx.Flags = function (input) {
	if (!(this instanceof Flags)) {
		return new Flags(input);
	}
	this.set(input);
};

Flags.prototype.set = function (input) {
	this.global     = input.global;
	this.ignoreCase = input.ignoreCase;
	this.multiline  = input.multiline;
	this.sticky     = input.sticky;
};

Flags.prototype.add = function (input) {
	if (input.global)     this.global     = true;
	if (input.ignoreCase) this.ignoreCase = true;
	if (input.multiline)  this.multiline  = true;
	if (input.sticky)     this.sticky     = true;
};

Flags.prototype.toString = Flags.prototype.valueOf = function () {
	var flags = '';
	if (this.global)     flags += 'g';
	if (this.ignoreCase) flags += 'i';
	if (this.multiline)  flags += 'm';
	if (this.sticky)     flags += 'y';
	return flags;
};

var getSource = rx.getSource = function (input) {
	return input.source;
};

var getFlags = rx.getFlags = function (input) {
	var flags = Flags(input);
	return flags.toString();
};

var replace = rx.replace = function (input, sub, value) {
	var flags = Flags(input);
	flags.add(value);
	value = getSource(value);
	input = getSource(input);
	var output = input.replace(sub, value);
	return new RegExp(output, flags);
};

})(this);
